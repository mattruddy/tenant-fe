import React, { memo } from "react"
import { Container } from "reactstrap"
import InvoiceForm from "../../../components/InvoiceForm"

const AddInvoice = () => {
  return (
    <Container>
      <InvoiceForm />
    </Container>
  )
}

export default memo(AddInvoice)
