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
import {_nav_admin } from '../_nav';

const TheSidebar = () => {
    const dispatch = useDispatch()
    const show = useSelector(state => state.sidebarShow)
    const role_admin = localStorage.getItem("admin_together_role");
  
    return (
      <CSidebar
        show={show}
        onShowChange={(val) => dispatch({type: 'set', sidebarShow: val })}
      >
        <CSidebarBrand className="d-md-down-none" to="/">
        </CSidebarBrand>
        <CSidebarNav>
  
          <CCreateElement
            items={_nav_admin}
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