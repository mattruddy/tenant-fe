import React from "react"
import { Button, Nav, Navbar, NavbarBrand, NavItem, NavLink } from "reactstrap"
import { AUTH_TOKEN } from "../../utils/constants"
import { useSetRecoilState } from "recoil"
import { profileState, tokenState, isLoggedInState } from "../../store"
import {
  faHome, faLongArrowAltRight,
} from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const MainNav: React.FC = () => {
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
    <Navbar className="MyNav">
      <Link to="/">
        <NavbarBrand>
        <div style={{display: "flex", alignItems: "center"}}>
          <img height="55" width="55" src="/logo.png" />
          <h3>Tross</h3>
        </div>
        </NavbarBrand>
      </Link>
        <Nav>
          <NavItem>
            <NavLink tag={Link} to="/">
              <FontAwesomeIcon className="mr-2" icon={faHome} />
              Home
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} onClick={handleLogout}>
              <FontAwesomeIcon className="mr-2" icon={faLongArrowAltRight} />
              Logout
            </NavLink>
          </NavItem>
        </Nav>
    </Navbar>
  )
}

export default MainNav
