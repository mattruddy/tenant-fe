import { memo, useState, useEffect, FormEvent } from "react"
import { Payment } from "../../utils/types"
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js"
import { Card, CardHeader, CardBody, Button, Form, FormGroup } from "reactstrap"
import React from "react"
import { currencyFormatter } from "../../utils/helpers"
import { useParams } from "react-router-dom"
import { getInvoice, payInvoice } from "../../data/api"

interface InvoiceParams {
  token: string
}

const InvoiceCard: React.FC = () => {
  const [invoice, setInvoice] = useState<Payment>()
  const stripe = useStripe()
  const elements = useElements()
  const { token } = useParams<InvoiceParams>()

  useEffect(() => {
    getInvoiceData()
  }, [])

  const getInvoiceData = async () => {
    const resp = await getInvoice(token)
    setInvoice(resp)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!stripe || !elements) {
      return
    }
    const cardEl = elements.getElement(CardElement)
    const { error, source } = await stripe.createSource(cardEl!, {
      currency: "usd",
    })
    if (error) {
      console.error(error)
    } else {
      payInvoice(source?.id!, token)
    }
  }
  return (
    <Card>
      <CardHeader>
        <span>{`${invoice?.address}, ${
          invoice?.city
        } ${invoice?.state.toUpperCase()}, ${invoice?.zip}`}</span>
        <br></br>
        <span>
          Amount of{" "}
          <strong>{currencyFormatter.format(invoice?.amount!)}</strong>
        </span>
      </CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <CardElement />
          </FormGroup>
          <Button type="submit">Submit</Button>
        </Form>
      </CardBody>
    </Card>
  )
}

export default memo(InvoiceCard)
