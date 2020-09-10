import { memo } from "react"
import React from "react"
import { Container, Card, CardBody } from "reactstrap"
import UnitForm from "../../../components/UnitForm"

const AddUnit: React.FC = () => {
  return (
    <Container fluid>
      <Card>
        <CardBody>
          <UnitForm />
        </CardBody>
      </Card>
    </Container>
  )
}

export default memo(AddUnit)
