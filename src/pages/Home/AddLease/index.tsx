import React, { memo } from "react"
import { Container, Card, CardBody } from "reactstrap"
import LeaseForm from "../../../components/LeaseForm"

const AddLease = () => {
  return (
    <Container fluid>
      <Card>
        <CardBody>
          <LeaseForm />
        </CardBody>
      </Card>
    </Container>
  )
}

export default memo(AddLease)
