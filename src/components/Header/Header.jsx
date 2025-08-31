import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import { FaBars, FaTimes, FaUser, FaSitemap, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import LoginMemoModal from '../LoginMemoModal/LoginMemoModal';
import navLinksData from '../../data/navLinks'; // Import navLinks data

const LOGO_URL = 'https://api.seongrim.o-r.kr/wp-content/uploads/2025/08/logo.png';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null); // State to manage open submenus in mobile

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleSubmenu = (title) => {
    setOpenSubmenu(openSubmenu === title ? null : title);
  };

  const handleLoginClick = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  return (
    <>
      <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
        <div className={styles.headerContainer}>
          <div className={styles.topBar}>
            <div className={styles.utilityMenu}>
              <a href="#" onClick={handleLoginClick} aria-label="로그인"><FaUser /><span>로그인</span></a>
              <Link to="/sitemap" aria-label="사이트맵"><FaSitemap /><span>사이트맵</span></Link>
            </div>
          </div>
          <div className={styles.headerContent}>
            <h1 className={styles.logo}>
              <Link to="/">
                <img src={LOGO_URL} alt="성림교회 로고" />
              </Link>
            </h1>
            <nav className={`${styles.nav} ${menuOpen ? styles.active : ''}`}>
              <ul className={styles.mainMenu}>
                {navLinksData.map((link) => (
                  <li key={link.title} className={styles.menuItem}>
                    <a
                      href="#"
                      onClick={(e) => {
                        if (window.innerWidth <= 768) {
                          e.preventDefault();
                          toggleSubmenu(link.title);
                        }
                      }}
                    >
                      {link.title}
                      {link.sublinks && link.sublinks.length > 0 && window.innerWidth <= 768 && (
                        <span className={styles.mobileSubmenuToggle}>
                          {openSubmenu === link.title ? <FaChevronUp /> : <FaChevronDown />}
                        </span>
                      )}
                    </a>
                    {link.sublinks && link.sublinks.length > 0 && (
                      <ul className={`${styles.submenu} ${openSubmenu === link.title ? styles.submenuOpen : ''}`}>
                        {link.sublinks.map((sub) => (
                          <li key={sub.title}>
                            <Link to={sub.path} onClick={() => setMenuOpen(false)}>{sub.title}</Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
            <button className={styles.menuToggle} onClick={() => setMenuOpen(!menuOpen)} aria-label="메뉴 토글">
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </header>
      <LoginMemoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Header;
