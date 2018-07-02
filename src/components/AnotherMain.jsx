import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fetchItem, setTitle, saveItems } from '../utilities/helper.jsx';

import makeComponentTrashable from 'trashable-react';

class AnotherMain extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null
        };
    }

    componentDidMount(){
        const page = this.props.match.params.ids;
        setTitle(page, this.props.title);
        window.scrollTo(0, 0);
        this.props.registerPromise(fetchItem(this.props.name, page))
            .then(item => {
                this.setState({data: item, loading: false});
                // saveItems([item]);
            });
    }

    render(){
        return <div>{this.props.children(this.state)}</div>;
    }
}

AnotherMain.propTypes = {
    children: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    title: PropTypes.string,
    match: PropTypes.object.isRequired,
    registerPromise: PropTypes.func.isRequired
};

export default makeComponentTrashable(AnotherMain);
