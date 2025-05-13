import React from 'react';
import './AppHeader.scss';
import Logo from '../../assets/Logo.svg';

const AppHeader: React.FC = () => {
  return (
    <header className="header">
      <img src={Logo} alt="Aviasales Logo" />
    </header>
  );
};

export default AppHeader;
