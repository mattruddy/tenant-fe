import { memo, FormEvent, useState } from "react"
import React from "react"
import {
  Input,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Label,
  Form,
  FormGroup,
} from "reactstrap"
import { login } from "../../data/api"
import { useSetRecoilState } from "recoil"
import { tokenState, isLoggedInState } from "../../store"
import { AUTH_TOKEN } from "../../utils/constants"
import { authType } from "../../utils/types"
import { Link } from "react-router-dom"

interface AuthCardParams {
  title: authType
  onSubmit: (email: string, password: string) => Promise<string>
}

const AuthCard: React.FC<AuthCardParams> = ({ title, onSubmit }) => {
  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()
  const setToken = useSetRecoilState(tokenState)
  const setIsLoggedIn = useSetRecoilState(isLoggedInState)

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()
    const token = await onSubmit(email!, password!)
    if (token) {
      localStorage.setItem(AUTH_TOKEN, token)
      setToken(token)
      setIsLoggedIn(true)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardBody>
        <Form onSubmit={handleLogin}>
          <FormGroup>
            <Label>Email</Label>
            <Input
              placeholder="example@me.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label>Password</Label>
            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Button type="submit">{title}</Button>
              <Link to={title === "Register" ? "/login" : "/signup"}>
                {title === "Login" ? "Register" : "Login"}
              </Link>
            </div>
          </FormGroup>
        </Form>
      </CardBody>
    </Card>
  )
}

export default memo(AuthCard)
