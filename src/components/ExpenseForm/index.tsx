import { memo, FormEvent, useState } from "react"
import { Card, CardHeader, CardBody, Button, Form, FormGroup, Input } from "reactstrap"
import React from "react"
import { addExpense } from "../../data/api"
import { useRecoilValue } from "recoil"
import { tokenState } from "../../store"

interface Props {
    unitId: number
}

const ExpenseForm: React.FC<Props> = ({unitId}) => {
    const token = useRecoilValue(tokenState)
    const [createDate, setCreateDate] = useState<string>()
    const [amount, setAmount] = useState<number>()
    const [desc, setDesc] = useState<string>()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    addExpense(token!, amount!, new Date(createDate!), desc!, unitId)
  }
  return (
    <Card>
      <CardHeader>
      </CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Input type="date" value={createDate} onChange={(e) => setCreateDate(e.target.value)} />
          </FormGroup>
          <FormGroup>
              <Input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
          </FormGroup>          
          <FormGroup>
              <Input type="textarea" value={desc} onChange={e => setDesc(e.target.value)} />
          </FormGroup>
          <Button type="submit">Submit</Button>
        </Form>
      </CardBody>
    </Card>
  )
}

export default memo(ExpenseForm)