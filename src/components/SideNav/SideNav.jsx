import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './SideNav.module.css';

const SideNav = ({ title, links }) => {
  return (
    <aside className={styles.sidenav}>
      <h2>{title}</h2>
      <div className={styles.menuContainer}>
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
      </div>
    </aside>
  );
};

export default SideNav;
