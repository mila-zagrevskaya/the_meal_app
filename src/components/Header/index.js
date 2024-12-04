import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from 'config/firebaseConfig';

import logo from 'assets/images/logo1.png';
import {
  LOG_IN, HOME, POPULAR_INGREDIENTS, BROWSE_COUNTRY,
} from 'constants/pathnames';
import { Button } from 'components/common/Button';

import './style.scss';

const navItems = [
  {
    path: HOME,
    id: 1,
    text: 'Home',
  },
  {
    path: POPULAR_INGREDIENTS,
    id: 2,
    text: 'Popular ingredients',
  },
  {
    path: BROWSE_COUNTRY,
    id: 3,
    text: 'Browse Country',
  },
];

const activeStyle = { color: '#94aa42', textDecoration: 'underline' };

export const Header = () => {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('userIsAuthorized');
      navigate(LOG_IN);
    } catch (error) {
      console.error('Error during sign out:', error);
    }
  };

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
                  exact={el.exact}
                  activestyle={activeStyle}
                  activeclassname='active'>
                  {el.text}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <Button onClick={logout} className='logout-button' text='Logout' />
      </div>
    </header>
  );
};
