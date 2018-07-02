import React from 'react';
import { NavLink } from 'react-router-dom';
import Header from '../styles/Navigation.jsx';

const Navigation = () => (
    <Header>
        <b><NavLink activeClassName='selected' to='/news' >Hacker News</NavLink></b>{' '}
        <NavLink activeClassName='selected' to='/newest' >new</NavLink>{' | '}
        <NavLink activeClassName='selected' to='/show' >show</NavLink>{' | '}
        <NavLink activeClassName='selected' to='/ask' >ask</NavLink>{' | '}
        <NavLink activeClassName='selected' to='/jobs' >jobs</NavLink>
    </Header>
);

export default Navigation;
