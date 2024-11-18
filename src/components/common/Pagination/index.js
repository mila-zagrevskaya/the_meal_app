import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';

import { DISH } from 'constants/pathnames';

import './style.scss';

export const ListWithPagination = ({
  meals,
  currentPage,
  amountItemsOnPage,
  changeSelectedPage,
}) => {
  const [currentDisplayedItems, setCurrentDisplayedItems] = useState([]);
  const [countPages, setCountPages] = useState(1);

  useEffect(() => {
    const startItemIndex = (currentPage - 1) * amountItemsOnPage;
    const endItemIndex = currentPage * amountItemsOnPage;
    setCurrentDisplayedItems(meals.slice(startItemIndex, endItemIndex));
    setCountPages(Math.ceil(meals.length / amountItemsOnPage));
  }, [meals, currentPage, amountItemsOnPage]);

  const handlePageClick = async ({ selected }) => {
    const selectedPage = selected + 1;
    await changeSelectedPage(selectedPage);
  };

  return (
    <>
      <div className='meal-cards'>
        {currentDisplayedItems.map((item) => (
          <NavLink to={`${DISH}${item.idMeal}`} className='meal-link' key={item.idMeal}>
            <div>
              <img
                className='dish-photography'
                src={item.strMealThumb}
                alt={item.strMeal}
              />
              <h4>{item.strMeal}</h4>
            </div>
          </NavLink>
        ))}
      </div>
      <ReactPaginate
        previousLabel={'<'}
        nextLabel={'>'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        initialPage={currentPage - 1}
        pageCount={countPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        subContainerClassName={'pages pagination'}
        activeClassName={'active'}
      />
    </>
  );
};

ListWithPagination.propTypes = {
  meals: PropTypes.array.isRequired,
  currentPage: PropTypes.number.isRequired,
  amountItemsOnPage: PropTypes.number.isRequired,
  changeSelectedPage: PropTypes.func.isRequired,
};
