import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ListItems from './ListItems.jsx';
import Paginator from './Paginator.jsx';
import Spinner from './Spinner.jsx';
import {  setTitle } from '../utilities/helper';
import {  store } from '../utilities/store';
import { fetchItemsFromTypes, watchList, fetchItems } from '../api';
import Delay from './DelayComponent.jsx';
import makeComponentTrashable from 'trashable-react';


class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            data: [],
            numberOfItems: null,
            itemsPerPage: 30
        };
        this.fetchData = this.fetchData.bind(this);
    }

    componentDidMount(){
        const page = parseInt(this.props.match.params.ids, 10) || 1;
        const { match:{ url }, basePath, name, registerPromise } = this.props;
        const { itemsPerPage } = this.state;
        setTitle(url, basePath);

        registerPromise(fetchItemsFromTypes(name, page, itemsPerPage))
            .then(items => this.fetchData(items));

        this.unwatch = watchList(name, ids =>
            fetchItems(ids.slice(itemsPerPage*(page-1), itemsPerPage*page))
                .then(items => this.fetchData(items)));
    }

    componentWillReceiveProps(nextProps){
        const { match, name, registerPromise } = this.props;
        const page = parseInt(match.params.ids, 10) || 1;
        const nextPage = parseInt(nextProps.match.params.ids, 10) || 1;
        const { itemsPerPage } = this.state;

        if(page !== nextPage) {
            this.unwatch();

            registerPromise(fetchItemsFromTypes(name, nextPage, itemsPerPage))
                .then(items => this.fetchData(items));

            this.unwatch = watchList(name, ids =>
                fetchItems(ids.slice(itemsPerPage*(nextPage-1), itemsPerPage*nextPage))
                    .then(items => this.fetchData(items)));
        }
    }

    componentDidUpdate(){
        const { match:{ params }, name } = this.props;
        const page = parseInt(params.ids, 10) || 1;
        const { itemsPerPage } = this.state;
        // cache data for next and previous page if needed
        fetchItemsFromTypes(name, page+1, itemsPerPage).then(items => store.saveItems(items));
        page!==1 && fetchItemsFromTypes(name, page-1)
            .then(items => store.saveItems(items));
    }

    componentWillUnmount(){
        this.unwatch();
    }

    fetchData(items) {
        store.saveItems(items);
        this.setState({
            data: items,
            loading: false,
            numberOfItems: JSON
                .parse(sessionStorage.getItem('cacheIds'))[this.props.name]
                .length
        });
    }

    render(){
        const { data, loading, numberOfItems, itemsPerPage } = this.state;
        const { match:{ params }, basePath, name } = this.props;
        const page = parseInt(params.ids,10) || 1;
        return(
            <main>
                {loading ? <Delay wait={300}><Spinner /></Delay> :
                    <React.Fragment>
                        <ListItems
                            page={page}
                            data={data}
                            itemsPerPage={itemsPerPage}
                        />
                        <Paginator
                            page={page}
                            name={name}
                            basePath={basePath}
                            numberOfItems={numberOfItems}
                            itemsPerPage={itemsPerPage}
                        />
                    </React.Fragment>
                }
            </main>
        );
    }

}

Main.propTypes = {
    name: PropTypes.string.isRequired,
    title: PropTypes.string,
    match: PropTypes.object.isRequired,
    basePath: PropTypes.string.isRequired,
    registerPromise: PropTypes.func.isRequired
};

export default makeComponentTrashable(Main);
