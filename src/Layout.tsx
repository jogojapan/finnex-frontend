// Layout.tsx
import React from 'react';
import './Layout.css';
import useTheme from './useTheme';
import Menu from './Menu';
import { Outlet } from 'react-router-dom';

interface LayoutProps {
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ onLogout }) => {
  const version = '0.0.1';
  const { toggleTheme } = useTheme();

  return (
    <div className="layout">
      <div className="title-bar">
        <div className="logo-container">
          <img src="/finnex-logo-1344x1344.png" alt="Logo" />
        </div>
        <div className="title-text">
          <div className="title-main-text">finnex</div>
          <div className="title-version-text">v{version}</div>
        </div>
        <div className="theme-switcher-container">
          <button className="theme-switcher-button" onClick={toggleTheme}>
            <img src="/light-dark-switcher-250x250.png" alt="Theme Switcher" />
          </button>
        </div>
      </div>
      <div className="main-area">
        <div className="menu-bar">
          <Menu onLogout={onLogout}/>
        </div>
        <div className="main-content">
          <Outlet />
        </div>
      </div>
      <div className="input-bar">Input</div>
    </div>
  );
};

export default Layout;
