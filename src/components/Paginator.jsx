import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import StyledPaginator from '../styles/Paginator.jsx';

const Paginator = ({ page, basePath, name }) => {
    const numberOfItems = JSON.parse(sessionStorage.getItem('cacheIds'))[name].length;
    const totalPages = Math.ceil(numberOfItems/30);
    if(numberOfItems <= 30 || page > totalPages) return null;
    return(
        <StyledPaginator>
            {page!==1 &&
              <span>
                  <Link
                      to={`/${basePath}/${page-1}`}
                      onClick={()=>{return window.scrollTo(0, 0);}}
                  >
                      <b>Prev</b>
                  </Link>
              </span>
            }
            {` (${page}/${totalPages}) `}
            {page!==totalPages &&
              <span>
                  <Link
                      to={`/${basePath}/${page+1}`}
                      onClick={()=>{return window.scrollTo(0, 0);}}
                  >
                      <b>More</b>
                  </Link>
              </span>
            }
        </StyledPaginator>
    );
};

Paginator.propTypes = {
    name: PropTypes.string.isRequired,
    page: PropTypes.number.isRequired,
    basePath: PropTypes.string.isRequired
};

export default Paginator;
