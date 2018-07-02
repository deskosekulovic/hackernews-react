import React from 'react';
import PropTypes from 'prop-types';
import CommentItem from './CommentItem.jsx';
import CommentMeta from './CommentMeta.jsx';
import AnotherMain from './AnotherMain.jsx';
import StyledComments from '../styles/Comments.jsx';

const Comments = props => {
    return(
        <AnotherMain {...props} name={'item'}>
            {comment=> {
                if(comment.data===null) return null;
                return (
                    <StyledComments key={comment.data.id}>
                        <CommentMeta data={comment.data} />
                        <CommentItem page={comment.data.id} kids={comment.data.kids} />
                    </StyledComments>
                );
            }
            }
        </AnotherMain>
    );
};

Comments.propTypes = {
    match: PropTypes.object.isRequired
};

export default Comments;
