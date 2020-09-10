import React from "react"
import { Nav, NavItem, Button, NavLink } from "reactstrap"
import { AUTH_TOKEN } from "../../utils/constants"
import { useSetRecoilState } from "recoil"
import { profileState, tokenState, isLoggedInState } from "../../store"
import classNames from "classnames"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faHome,
  faMonument,
  faLongArrowAltDown,
  faMoneyCheck,
  faPersonBooth,
  faNewspaper,
  faMoneyBill,
  faBuilding,
  faPeopleArrows,
  faFileContract,
} from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"

interface SideBarProps {
  isOpen: boolean
  toggle: () => void
}

const SideBar: React.FC<SideBarProps> = ({ isOpen, toggle }) => {
  const setProfile = useSetRecoilState(profileState)

  const setToken = useSetRecoilState(tokenState)
  const setIsLoggedIn = useSetRecoilState(isLoggedInState)

  const handleLogout = (e: any) => {
    e.preventDefault()
    localStorage.removeItem(AUTH_TOKEN)
    setProfile(undefined)
    setToken(undefined)
    setIsLoggedIn(false)
  }

  return (
    <div className={classNames("my-sidebar", { "is-open": isOpen })}>
      <div className="sidebar-header">
        <h5>Tenant App</h5>
        <span color="info" onClick={toggle} style={{ color: "#fff" }}>
          &times;
        </span>
      </div>
      <div className="side-menu">
        <Nav vertical>
          <NavItem>
            <NavLink tag={Link} to="/">
              <FontAwesomeIcon className="mr-2" icon={faHome} />
              Home
            </NavLink>
          </NavItem>
          <div
            style={{
              marginLeft: "16px",
            }}
          >
            <NavItem>
              <NavLink tag={Link} to="/unit">
                <FontAwesomeIcon className="mr-2" icon={faBuilding} />
                Unit
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/lease">
                <FontAwesomeIcon className="mr-2" icon={faFileContract} />
                Lease
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/tenant">
                <FontAwesomeIcon className="mr-2" icon={faPeopleArrows} />
                Tenant
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/invoice">
                <FontAwesomeIcon className="mr-2" icon={faMoneyBill} />
                Invoice
              </NavLink>
            </NavItem>
          </div>
        </Nav>
      </div>
    </div>
  )
}

export default SideBar
