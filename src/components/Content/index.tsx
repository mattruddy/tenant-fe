import React, { useEffect, memo } from "react"
import { useRecoilState, useSetRecoilState } from "recoil"
import { tokenState, isLoggedInState, profileState } from "../../store"
import { AUTH_TOKEN } from "../../utils/constants"
import { getProfile } from "../../data/api"
import { Switch, Route, Redirect } from "react-router-dom"
import Home from "../../pages/Home"
import Login from "../../pages/Login"
import SignUp from "../../pages/SignUp"
import Invoice from "../../pages/Invoice"
import { Container, Navbar, Button } from "reactstrap"
import classNames from "classnames"
import AddUnit from "../../pages/Home/AddUnit"
import AddTenant from "../../pages/Home/AddTenant"
import AddLease from "../../pages/Home/AddLease"
import AddInvoice from "../../pages/Home/AddInvoice"

interface ContentProps {
  isOpen: boolean
  toggle: () => void
}

const Content: React.FC<ContentProps> = ({ isOpen, toggle }) => {
  const [token, setToken] = useRecoilState(tokenState)
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState)
  const setProfile = useSetRecoilState(profileState)

  useEffect(() => {
    const prevToken = localStorage.getItem(AUTH_TOKEN)
    if (prevToken) {
      setToken(prevToken)
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }, [])

  useEffect(() => {
    if (isLoggedIn && token) {
      loadProfile()
    }
  }, [isLoggedIn, token])

  const loadProfile = async () => {
    const profile = await getProfile(token!)
    setProfile(profile)
  }

  return (
    <Container fluid className={classNames("content", { "is-open": isOpen })}>
      {isLoggedIn !== undefined && (
        <Switch>
          <Route
            path="/"
            exact
            render={() => (isLoggedIn ? <Home /> : <Redirect to="/login" />)}
          />
          <Route
            path="/unit"
            render={() => (isLoggedIn ? <AddUnit /> : <Redirect to="/login" />)}
          />
          <Route
            path="/tenant"
            render={() =>
              isLoggedIn ? <AddTenant /> : <Redirect to="/login" />
            }
          />
          <Route
            path="/lease"
            render={() =>
              isLoggedIn ? <AddLease /> : <Redirect to="/login" />
            }
          />
          <Route
            path="/invoice"
            render={() =>
              isLoggedIn ? <AddInvoice /> : <Redirect to="/login" />
            }
          />
          <Route
            path="/login"
            exact
            render={() => (!isLoggedIn ? <Login /> : <Redirect to="/" />)}
          />
          <Route
            path="/signup"
            exact
            render={() => (!isLoggedIn ? <SignUp /> : <Redirect to="/" />)}
          />
          <Route path="/payment/:token" exact component={Invoice} />
        </Switch>
      )}
    </Container>
  )
}

export default memo(Content)
