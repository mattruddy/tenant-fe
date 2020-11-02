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
import { Container } from "reactstrap"
import AddUnit from "../../pages/AddUnit"
import AddTenant from "../../pages/AddTenant"
import AddLease from "../../pages/AddLease"
import AddInvoice from "../../pages/AddInvoice"
import Unit from "../../pages/Unit"
import AddExpense from "../../pages/AddExpense"

const Content: React.FC = () => {
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
    <Container fluid>
      {isLoggedIn !== undefined && (
        <Switch>
          <Route
            path="/"
            exact
            render={() => (isLoggedIn ? <Home /> : <Redirect to="/login" />)}
          />
          <Route
            path="/unit/:id"
            render={() => (isLoggedIn ? <Unit /> : <Redirect to="/login" />)}
            exact
          />
          <Route
            path="/add/unit"
            render={() => (isLoggedIn ? <AddUnit /> : <Redirect to="/login" />)}
            exact
          />
          <Route
            path="/tenant/add/:unitId"
            render={() =>
              isLoggedIn ? <AddTenant /> : <Redirect to="/login" />
            }
          />
          <Route
            path="/expense/add/:unitId"
            render={() =>
              isLoggedIn ? <AddExpense /> : <Redirect to="/login" />
            }
          />
          <Route
            path="/lease/add/:unitId"
            render={() =>
              isLoggedIn ? <AddLease /> : <Redirect to="/login" />
            }
          />
          <Route
            path="/invoice/add"
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
