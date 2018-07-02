import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ListItems from './ListItems.jsx';
import Paginator from './Paginator.jsx';
import Spinner from './Spinner.jsx';
import {  setTitle, fetchItemsFromTypes, saveItems } from '../utilities/helper.jsx';

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
        setTitle(this.props.match.params.ids, this.props.basePath);

        this.fetchData(page);

        this.timer=setInterval(()=>{
            this.fetchData(page);
        }, 60000);
    }

    componentWillReceiveProps(nextProps){
        const page = parseInt(this.props.match.params.ids,10) || 1;
        const nextPage = parseInt(nextProps.match.params.ids,10);

        if(page !== nextPage) {
            clearInterval(this.timer);

            this.fetchData(nextPage);

            this.timer=setInterval(()=>{
                this.fetchData(nextPage);
            }, 60000);
        }
    }

    componentDidUpdate(){
        const page = parseInt(this.props.match.params.ids,10) || 1;

        fetchItemsFromTypes(this.props.name, page+1).then(items => saveItems(items));
        page!==1 && fetchItemsFromTypes(this.props.name, page-1).then(items => saveItems(items));
    }

    componentWillUnmount(){
        clearInterval(this.timer);
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
        const page = parseInt(this.props.match.params.ids,10) || 1;
        return(
            <main>
                {loading ? <Delay wait={300}><Spinner /></Delay> :
                    <div>
                        <ListItems page={page} data={data} />
                        <Paginator page={page} name={this.props.name} basePath={this.props.basePath} />
                    </div>
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
