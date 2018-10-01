import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import StyledPaginator from '../styles/Paginator.jsx';

const Paginator = ({ page, basePath, numberOfItems, itemsPerPage }) => {
  const totalPages = Math.ceil(numberOfItems / itemsPerPage);
  if (numberOfItems <= itemsPerPage || page > totalPages) return null;
  return (
    <StyledPaginator>
      {page !== 1 && (
        <span>
          <Link
            to={`/${basePath}/${page - 1}`}
          >
            <b>Prev</b>
          </Link>
        </span>
      )}
      {` (${page}/${totalPages}) `}
      {page !== totalPages && (
        <span>
          <Link
            to={`/${basePath}/${page + 1}`}
          >
            <b>More</b>
          </Link>
        </span>
      )}
    </StyledPaginator>
  );
};

Paginator.propTypes = {
  numberOfItems: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  basePath: PropTypes.string.isRequired,
  itemsPerPage: PropTypes.number.isRequired
};

export default Paginator;
