import React from 'react';
import styles from './Loading.module.scss'; // Assuming you will use CSS modules for styling

const Loading = () => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.spinner}></div>
      <p>Loading...</p>
    </div>
  );
};

export default Loading;
