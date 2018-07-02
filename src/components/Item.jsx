import React from 'react';
import { Link } from 'react-router-dom';
import TimeAgo from 'react-timeago';
import { get_host } from '../utilities/helper.jsx';
import StyledItem, { Title, Data } from '../styles/Item.jsx';
import PropTypes from 'prop-types';

const Item = ({ item }) => (
    <StyledItem>
        {
            item.url ? <Title>
                <Link to={item.url} target='_blank' rel='noopener'>{item.title}</Link> <span>({get_host(item.url)})</span>
            </Title> :
                <Title>
                    <Link to={`/item/${item.id}`} >{item.title}</Link>
                </Title>
        }
        <Data>
            {
                item.type === 'job' ? <span><TimeAgo date={new Date(item.time*1000)} /></span>
                    : <div>
                        <span>{item.score} points</span>{'  '}
                        <span>by <Link to={`/user/${item.by}`} ><b>{item.by}</b></Link></span>{'  '}
                        <span><TimeAgo date={new Date(item.time*1000)} /></span>{' | '}
                        <span><Link to={`/item/${item.id}`} >
                            {item.descendants > 0 ? `${item.descendants} comments` : 'discuss'}
                        </Link></span>
                    </div>
            }
        </Data>
    </StyledItem>
);

Item.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.number.isRequired,
        url: PropTypes.string,
        title: PropTypes.string.isRequired,
        by: PropTypes.string.isRequired,
        time: PropTypes.number.isRequired,
        descendants: PropTypes.number,
        text: PropTypes.string
    }).isRequired
};

export default Item;
