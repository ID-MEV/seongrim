import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import './SitemapModal.css';
import navLinks from '../../data/navLinks';

const SitemapModal = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="sitemap-overlay" onClick={onClose}>
      <div className="sitemap-content" onClick={(e) => e.stopPropagation()}>
        <button className="sitemap-close-btn" onClick={onClose} aria-label="닫기">
          <FaTimes />
        </button>
        <h2 className="sitemap-title">사이트맵</h2>
        
        <div className="sitemap-tree">
          {navLinks.map((category) => (
            <div key={category.title} className="sitemap-category">
              <h3 className="category-title">{category.title}</h3>
              {category.sublinks && category.sublinks.length > 0 && (
                <ul className="category-sublinks">
                  {category.sublinks.map((sublink) => (
                    <li key={sublink.title}>
                      <Link 
                        to={sublink.path} 
                        onClick={onClose} 
                        className="sublink-item"
                      >
                        {sublink.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SitemapModal;
