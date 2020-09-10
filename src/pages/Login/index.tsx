import { memo } from "react"
import React from "react"
import AuthForm from "../../components/AuthForm"
import { Container, Row, Col, Toast, ToastBody } from "reactstrap"
import { login } from "../../data/api"

const Login: React.FC = () => {
  return (
    <Container>
      <Row>
        <Col>
          <AuthForm title="Login" onSubmit={login} />
        </Col>
      </Row>
    </Container>
  )
}

export default memo(Login)
