import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg
} from '@coreui/react'

const TheHeaderDropdown = () => {
  const history = useHistory();
  const avatar = localStorage.getItem("avatar_admin_academy");
  const first_name = localStorage.getItem("username_admin_academy");
  const role = localStorage.getItem("role_admin_academy");

  const onClickLogout = () => {
    localStorage.clear();
    history.push('/login');
  }

  return (
    <CDropdown
      inNav
      className="c-header-nav-items mx-2"
      direction="down"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <CImg
            src={avatar ? avatar : "https://yt3.ggpht.com/ytc/AAUvwnjyHPfxxlEjIsje7BF_6-Ns844XBXm7tTou9bdQ=s900-c-k-c0x00ffffff-no-rj"}
            className="c-avatar-img"
            alt="admin@gmail.com"
          />
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem
          header
          tag="div"
          color="light"
          className="text-left"
        >
          <strong>Account ({first_name})</strong>
        </CDropdownItem>

        {role === 'teacher'
          ?
          <div className="dropdown-item" onClick={() => {
            history.push('/change-password');
          }}>
            Change password
          </div>
          : null
        }

        {role === 'teacher'
          ?
          <div className="dropdown-item" onClick={() => {
            history.push('/profile')
          }}>
            Profile
          </div>
          : null
        }

        <div className="dropdown-item" onClick={onClickLogout}>
          Log out
        </div>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default TheHeaderDropdown
