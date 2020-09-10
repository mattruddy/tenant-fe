import React, { memo, FormEvent, useState, useEffect } from "react"
import {
  Form,
  FormGroup,
  Row,
  Col,
  Label,
  Input,
  Button,
  InputGroup,
  InputGroupAddon,
} from "reactstrap"
import { useRecoilValue, useRecoilState } from "recoil"
import { profileState, tokenState } from "../../store"
import { addTenant, addLease, addInvoice } from "../../data/api"
import { Profile, Unit, Lease } from "../../utils/types"

const InvoiceForm: React.FC = () => {
  const [amount, setAmount] = useState<number>()
  const [tenantId, setTenantId] = useState<number>()
  const [leaseId, setLeaseId] = useState<number>()
  const [unitId, setUnitId] = useState<number>()
  const [profile, setProfile] = useRecoilState(profileState)
  const token = useRecoilValue(tokenState)

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const resp = await addInvoice(token!, amount!, tenantId!)

    // let newTenant = profile?.units

    // newLease = {} as Lease

    // newUnit = {
    //   ...newUnit,
    //   leases: [resp, ...newUnit!.leases],
    // } as Unit

    // setProfile(
    //   (prev) =>
    //     ({
    //       units: [
    //         newUnit,
    //         ...prev!.units.filter((unit) => unitId! !== unit.id),
    //       ],
    //     } as Profile)
    // )
  }

  return (
    <Form onSubmit={onSubmit}>
      <FormGroup>
        <Label>Tenant</Label>
        <Input
          type="select"
          onChange={(e) => setTenantId(Number(e.target.value))}
        >
          <option selected disabled>
            Select Tenant
          </option>
          {profile?.units.map((unit) =>
            unit.leases.map((lease) =>
              lease.tenants.map((tenant, i) => (
                <option
                  key={i}
                  value={tenant.id}
                >{`${tenant.firstName} ${tenant.lastName} - ${unit.address}`}</option>
              ))
            )
          )}
        </Input>
      </FormGroup>
      <FormGroup>
        <Label>Amount</Label>
        <InputGroup>
          <InputGroupAddon addonType="append">$</InputGroupAddon>
          <Input
            placeholder="1000"
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </InputGroup>
      </FormGroup>

      <Button type="submit">Add Invoice</Button>
    </Form>
  )
}

export default memo(InvoiceForm)
