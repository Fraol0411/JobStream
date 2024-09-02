import React from 'react'
import Featureddiv from './Featureddiv/Featureddiv'
import "./Featuredcard.scss"
export default function Featuredcard() {
  return (
    <div className='Featuredcard' >
        <h1>Featured jobs</h1>
        <div className="cardholder">
            <Featureddiv/>
            <Featureddiv/>
            <Featureddiv/>
            <Featureddiv/>
            <Featureddiv/>
            <Featureddiv/>
        </div>

        
    </div>
  )
}
