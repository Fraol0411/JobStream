import React from 'react'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilBell,
  cilCreditCard,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilFile,
  cilLockLocked,
  cilSettings,
  cilTask,
  cilUser,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import avatar8 from './../../assets/images/avatars/8.jpg'
import { useNavigate } from 'react-router-dom'

const AppHeaderDropdown = () => {
  const navigate = useNavigate()

  const handlelogout = () => {
    navigate('/')
  }
  return (
    <CDropdown variant="nav-item" style={{ borderRadius: 50 }}>
      <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
        <CIcon
          icon={cilUser}
          className="me-4"
          style={{
            width: 25,
            height: 25,
            color: 'black',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-body-secondary fw-semibold mb-2">Account</CDropdownHeader>
        <CDropdownItem href="#">
          <CIcon onClick={handlelogout} icon={cilUser} className="me-2" />
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
