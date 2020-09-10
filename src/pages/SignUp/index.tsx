import React from "react"
import { Container, Row, Col, Toast, ToastBody } from "reactstrap"
import AuthForm from "../../components/AuthForm"
import { signup } from "../../data/api"

const SignUp: React.FC = () => {
  return (
    <Container>
      <Row>
        <Col>
          <AuthForm title="Register" onSubmit={signup} />
        </Col>
      </Row>
    </Container>
  )
}

export default SignUp
