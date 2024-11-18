import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { createHashHistory } from 'history';
import firebaseConfig, { auth } from 'config/firebaseConfig';

import logo from 'assets/images/logo1.png';
import {
  LOG_IN, HOME, POPULAR_INGREDIENTS, BROWSE_COUNTRY,
} from 'constants/pathnames';
import { Button } from 'components/common/Button';

import './style.scss';

const history = createHashHistory();

const navItems = [
  {
    path: HOME,
    id: 1,
    text: 'Home',
    // exact: true,
  },
  {
    path: POPULAR_INGREDIENTS,
    id: 2,
    text: 'Popular ingredients',
    // exact: false,
  },
  {
    path: BROWSE_COUNTRY,
    id: 3,
    text: 'Browse Country',
    // exact: false,
  },
];

const activeStyle = { color: '#daa520', textDecoration: 'underline' };

export class Header extends Component {
  logout = () => {
    auth();
    firebaseConfig.signOut();
    localStorage.removeItem('userIsAuthorized');
    history.push(LOG_IN);
  };

  render() {
    return (
      <header className='header'>
        <div className='header-wrapper'>
          <div className='logo-box'>
            <Link to='/'>
              <img src={logo} className='logo' alt='logo' />
            </Link>
          </div>
          <nav className='nav'>
            <ul className='nav-list'>
              {navItems.map((el) => (
                <li className='nav-item' key={el.id}>
                  <NavLink
                    to={el.path}
                    // exact={el.exact}
                    activestyle={activeStyle}
                    activeclassname='active'>
                    {el.text}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <Button onClick={this.logout} className='logout-button' text='Logout' />
        </div>
      </header>
    );
  }
}
