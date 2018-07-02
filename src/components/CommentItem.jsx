import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TimeAgo from 'react-timeago';
import { fetchItems, arrayToObject } from '../utilities/helper.jsx';
import StyledComment, { TextToggle, ToggleMeta } from '../styles/CommentItem.jsx';

import makeComponentTrashable from 'trashable-react';

class CommentItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {}
        };
        this.toggleVisible = this.toggleVisible.bind(this);
    }

    componentDidMount(){
        const kids = this.props.kids;

        kids && this.props.registerPromise(fetchItems(kids))
            .then(items =>{
                let newData=arrayToObject(items, 'id');
                this.setState({
                    data: Object.assign({},newData)
                });
            });
        this.timer=setInterval(()=>{
            kids && this.props.registerPromise(fetchItems(kids))
                .then(items =>{
                    let newData=arrayToObject(items, 'id');
                    this.setState({
                        data: Object.assign({},newData)
                    });
                });
        }, 60000);
    }

    componentWillUnmount(){
        clearInterval(this.timer);
    }

    toggleVisible(id){
        let el = this.state.data[id];
        this.setState({
            data: {
                ...this.state.data,
                [id]: {...el, visible: !el.visible}}
        });
    }

    render(){
        const { data } = this.state;
        if(this.props.kids===undefined){
            return <div style={{'paddingLeft': '30px',
                'paddingBottom': '30px'}}>No comments!</div>;
        }
        return(
            <div>
                {this.props.kids.map(kid=>{
                    if(data[kid]===undefined) return null;
                    if(data[kid].deleted) return null;
                    if(data[kid].dead) return null;
                    if(!data[kid].id) return null;
                    const { by, time, text, id, kids, visible } = data[kid];
                    return(
                        <StyledComment key={id}>
                            <div>
                                <ToggleMeta onClick={()=>this.toggleVisible(id)} >{visible ? '[-]' : '[+]'} </ToggleMeta><Link to={`/user/${by}`} ><b>{by}</b></Link>{'  '}
                                <span><TimeAgo date={new Date(time*1000)} /></span>
                            </div>
                            <TextToggle visible={visible}>
                                <div className='text' dangerouslySetInnerHTML={{ __html: text }} />
                                <p>reply</p>
                                {
                                    kids && <CommentItem registerPromise={this.props.registerPromise} kids={kids} />
                                }
                            </TextToggle>
                        </StyledComment>
                    );
                })}
            </div>
        );
    }
}

CommentItem.propTypes = {
    kids: PropTypes.arrayOf(PropTypes.number),
    registerPromise: PropTypes.func
};

export default makeComponentTrashable(CommentItem);
