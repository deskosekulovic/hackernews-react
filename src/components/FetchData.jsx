import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fetchItem, setTitle } from '../utilities/helper';
import makeComponentTrashable from 'trashable-react';

class FetchData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null
        };
    }

    componentDidMount(){
        const { match, title, name } = this.props;
        const page = match.params.ids;
        setTitle(match.url, title);
        window.scrollTo(0, 0);
        this.props.registerPromise(fetchItem(name, page))
            .then(item => {
                this.setState({data: item, loading: false});
            });
    }

    render(){
        return <div>{this.props.children(this.state)}</div>;
    }
}

FetchData.propTypes = {
    children: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    title: PropTypes.string,
    match: PropTypes.object.isRequired,
    registerPromise: PropTypes.func.isRequired
};

export default makeComponentTrashable(FetchData);
