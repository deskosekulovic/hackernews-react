import React from 'react';
import PropTypes from 'prop-types';
import Item from './Item.jsx';

const ListItems = ({ page, data }) => (
    <ol start={(page - 1)*30+1}>
        {data.map((item) => {
            return (
                item.id && item!==null && <Item key={item.id} item={item} />
            );
        })}
    </ol>
);

ListItems.propTypes = {
    page: PropTypes.number.isRequired,
    data: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired
};

export default ListItems;
