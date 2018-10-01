import React from 'react';
import PropTypes from 'prop-types';
import Item from './Item.jsx';

const ListItems = ({ page, data, itemsPerPage }) => (
  <ol start={(page - 1) * itemsPerPage + 1}>
    {data.map(
      item => item.id && item !== null && <Item key={item.id} item={item} />
    )}
  </ol>
);

ListItems.propTypes = {
  page: PropTypes.number.isRequired,
  data: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  itemsPerPage: PropTypes.number.isRequired
};

export default ListItems;
