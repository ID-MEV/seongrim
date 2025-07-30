import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './SideNav.module.css';

const SideNav = ({ title, links }) => {
  return (
    <aside className={styles.sidenav}>
      <h2>{title}</h2>
      <ul>
        {links.map((link) => (
          <li key={link.path}>
            <NavLink
              to={link.path}
              className={({ isActive }) => (isActive ? styles.active : '')}
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default SideNav;
