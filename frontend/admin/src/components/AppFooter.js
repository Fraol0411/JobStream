import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter className="px-4">
      <div>
        <a href="https://awashinsurance.com" target="_blank" rel="noopener noreferrer">
          AwashInsurance
        </a>
        <span className="ms-1">&copy; 2024 AwashInsurance-MIS.</span>
      </div>

    </CFooter>
  )
}

export default React.memo(AppFooter)
