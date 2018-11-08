import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TimeAgo from 'react-timeago';
import { get_host } from '../utilities/helper';
import ComponentAnimation from '../styles/ComponentAnimation.jsx';
import { Data } from '../styles/Item.jsx';

const CommentMeta = ({ data }) => (
  <ComponentAnimation key={data.id}>
    {data.url ? (
      <Data title="title">
        <a href={data.url} target="_blank" rel="noopener noreferrer">
          <b>{data.title}</b>
        </a>
        <span> ({get_host(data.url)}) </span>
      </Data>
    ) : (
      <Data title="title">
        <Link to={`/item/${data.id}`}>{data.title}</Link>
      </Data>
    )}
    {
      <Data>
        <span>{data.score} points </span>
        <span>
          by
          <Link to={`/user/${data.by}`}>
            <b> {data.by} </b>
          </Link>
        </span>
        <span>
          <TimeAgo date={new Date(data.time * 1000)} />
        </span>
        {' | '}
        <span>
          <Link to={`/item/${data.id}`}>{data.descendants} comments</Link>
        </span>
        {data.text && <p dangerouslySetInnerHTML={{ __html: data.text }} />}
      </Data>
    }
  </ComponentAnimation>
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
