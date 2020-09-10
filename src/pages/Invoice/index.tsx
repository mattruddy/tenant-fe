import { memo } from "react"
import React from "react"
import { Container, Row, Col } from "reactstrap"
import InvoiceCard from "../../components/InvoiceCard"

const Invoice: React.FC = () => {
  return (
    <div>
      <Container>
        <Row>
          <Col>
            <InvoiceCard />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default memo(Invoice)
