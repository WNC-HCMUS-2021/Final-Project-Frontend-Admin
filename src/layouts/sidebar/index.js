import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from '@coreui/react'

// sidebar nav config
import {_nav_admin, _nav_teacher } from '../_nav';

const TheSidebar = () => {
    const dispatch = useDispatch()
    const show = useSelector(state => state.sidebarShow)
    const role_admin = localStorage.getItem("role_admin_academy");
  
    return (
      <CSidebar
        show={show}
        onShowChange={(val) => dispatch({type: 'set', sidebarShow: val })}
      >
        <CSidebarBrand className="d-md-down-none" to="/">
        </CSidebarBrand>
        <CSidebarNav>
  
          <CCreateElement
            items={role_admin === "admin" ? _nav_admin : _nav_teacher}
            components={{
              CSidebarNavDivider,
              CSidebarNavDropdown,
              CSidebarNavItem,
              CSidebarNavTitle
            }}
          />
        </CSidebarNav>
        <CSidebarMinimizer className="c-d-md-down-none"/>
      </CSidebar>
    )
  }
  
  export default React.memo(TheSidebar)