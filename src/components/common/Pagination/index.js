import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';

import { DISH } from 'constants/pathnames';

import './style.scss';

export class ListWithPagination extends Component {
  state = {
    currentPage: this.props.currentPage,
    currentDisplayedItems: [],
    countPages: 1,
  };

  static propTypes = {
    meals: PropTypes.array,
    currentDisplayedItems: PropTypes.array,
    currentPage: PropTypes.number,
    countPages: PropTypes.number,
    handlePageClick: PropTypes.func,
    selected: PropTypes.number,
  };

  static getDerivedStateFromProps(props) {
    const { meals, currentPage, amountItemsOnPage } = props;
    const startItemIndex = (currentPage - 1) * amountItemsOnPage;
    const endItemIndex = currentPage * amountItemsOnPage;
    const currentDisplayedItems = meals.slice(startItemIndex, endItemIndex);
    const countPages = Math.ceil(meals.length / amountItemsOnPage);
    return { currentDisplayedItems, currentPage: currentPage - 1, countPages };
  }

  handlePageClick = async ({ selected }) => {
    const { changeSelectedPage } = this.props;
    const selectedPage = selected + 1;
    await changeSelectedPage(selectedPage);
  };

  render() {
    const { currentDisplayedItems, currentPage, countPages } = this.state;
    return (
      <>
        <div className='meal-cards'>
          {currentDisplayedItems.map((item) => (
            <Link to={`${DISH}${item.idMeal}`} className='meal-link' key={item.idMeal}>
              <div>
                <img className='dish-photography' src={item.strMealThumb} alt={item.strMeal} />
                <h4>{item.strMeal}</h4>
              </div>
            </Link>
          ))}
        </div>
        <ReactPaginate
          previousLabel={'<'}
          nextLabel={'>'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          initialPage={currentPage}
          pageCount={countPages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={this.handlePageClick}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />
      </>
    );
  }
}
