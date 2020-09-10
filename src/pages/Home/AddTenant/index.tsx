import { memo } from "react"
import React from "react"
import { Container, Card, CardBody } from "reactstrap"
import TenantForm from "../../../components/TenantForm"

const AddTenant: React.FC = () => {
  return (
    <Container fluid>
      <Card>
        <CardBody>
          <TenantForm />
        </CardBody>
      </Card>
    </Container>
  )
}

export default memo(AddTenant)
