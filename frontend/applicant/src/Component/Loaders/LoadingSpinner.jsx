import React from 'react';
import { ClipLoader } from 'react-spinners'; // You can choose different spinners from react-spinners

export default function LoadingSpinner() {
  return (
    <div style={styles.loader}>
      <ClipLoader color={"#007bff"} size={50} />
    </div>
  );
}

const styles = {
  loader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  }
};
