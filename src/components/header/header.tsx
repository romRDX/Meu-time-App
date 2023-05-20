import React from 'react';
import styles from "./header.module.scss";

const Header: React.FC = () => {

  return (
    <div className={styles.header}>
      <h1>Meu time</h1> 
    </div>
  );
}

export default Header;
