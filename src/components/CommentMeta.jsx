import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TimeAgo from 'react-timeago';
import { get_host } from '../utilities/helper.jsx';
import StyledCommentMeta, { Title } from '../styles/CommentMeta.jsx';

const CommentMeta = ({ data }) =>(
    <StyledCommentMeta key={data.id}>
        <div>
            {
                data.url ? <Title>
                    <Link to={data.url} target="_blank" rel="noopener"><b>{data.title}</b></Link> <span>({get_host(data.url)})</span>
                </Title> :
                    <Title>
                        <Link to={`/item/${data.id}`}>{data.title}</Link>
                    </Title>
            }
        </div>
        {
            <div>
                <span>{data.score} points</span>{'  '}
                <span>by <Link to={`/user/${data.by}`} ><b>{data.by}</b></Link></span>{'  '}
                <span><TimeAgo date={new Date(data.time*1000)} /></span>{' | '}
                <span><Link to={`/item/${data.id}`}>{data.descendants} comments</Link></span>
                {data.text && <p dangerouslySetInnerHTML={{ __html: data.text }} />}
            </div>
        }
    </StyledCommentMeta>
);

CommentMeta.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.number,
        url: PropTypes.string,
        title: PropTypes.string.isRequired,
        by: PropTypes.string.isRequired,
        time: PropTypes.number.isRequired,
        descendants: PropTypes.number.isRequired,
        text: PropTypes.string
    }).isRequired
};

export default CommentMeta;
