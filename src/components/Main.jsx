import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ListItems from './ListItems.jsx';
import Paginator from './Paginator.jsx';
import Spinner from './Spinner.jsx';
import {  setTitle, fetchItemsFromTypes, saveItems, watchList, fetchItems } from '../utilities/helper';
import Delay from './DelayComponent.jsx';
import makeComponentTrashable from 'trashable-react';


class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            data: []
        };
        this.fetchData = this.fetchData.bind(this);
    }

    componentDidMount(){
        const page = parseInt(this.props.match.params.ids,10) || 1;
        const { match:{ url }, basePath, name } = this.props;
        setTitle(url, basePath);
        this.fetchData(page);

        this.unwatch = watchList(name, ids=>fetchItems(ids.slice(30*(page-1),30*page)).then(items => {
            saveItems(items);
            this.setState({
                data: items,
                loading: false
            });
        }));
    }

    componentWillReceiveProps(nextProps){
        const page = parseInt(this.props.match.params.ids,10) || 1;
        const nextPage = parseInt(nextProps.match.params.ids,10) || 1;
        if(page !== nextPage) {
            this.unwatch();

            this.fetchData(nextPage);

            this.unwatch = watchList(this.props.name, ids=>fetchItems(ids.slice(30*(nextPage-1),30*nextPage)).then(items => {
                saveItems(items);
                this.setState({
                    data: items,
                    loading: false
                });
            }));
        }
    }

    componentDidUpdate(){
        const { match:{ params }, name } = this.props;
        const page = parseInt(params.ids,10) || 1;
        fetchItemsFromTypes(name, page+1).then(items => saveItems(items));
        page!==1 && fetchItemsFromTypes(name, page-1).then(items => saveItems(items));
    }

    componentWillUnmount(){
        this.unwatch();
    }

    fetchData(page) {
        this.props.registerPromise(fetchItemsFromTypes(this.props.name, page)).then(items => {
            saveItems(items);
            this.setState({
                data: items,
                loading: false
            });
        });
    }

    render(){
        const { data, loading } = this.state;
        const { match:{ params }, basePath, name } = this.props;
        const page = parseInt(params.ids,10) || 1;
        return(
            <main>
                {loading ? <Delay wait={300}><Spinner /></Delay> :
                    <React.Fragment>
                        <ListItems page={page} data={data} />
                        <Paginator page={page} name={name} basePath={basePath} />
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
