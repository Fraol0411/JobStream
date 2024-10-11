import React from 'react'
import Featureddiv from './Featureddiv/Featureddiv'
import styles from './Featuredcard.module.scss';
export default function Featuredcard() {
  return (
    <div className={styles.Featuredcard}>
      <h1 className={styles.title}>Featured Jobs</h1>
      <div className={styles.cardholder}>
        <Featureddiv />
        <Featureddiv />
        <Featureddiv />
        <Featureddiv />
        <Featureddiv />
        <Featureddiv />
      </div>
    </div>
  )
}
