import React, { memo, FormEvent, useState, useEffect } from "react"
import { Form, FormGroup, Row, Col, Label, Input, Button } from "reactstrap"
import { useRecoilValue, useRecoilState } from "recoil"
import { profileState, tokenState } from "../../store"
import { addTenant, addLease } from "../../data/api"
import { Profile, Unit, Lease } from "../../utils/types"

const LeaseForm: React.FC = () => {
  const [startDate, setStartDate] = useState<string>()
  const [endDate, setEndDate] = useState<string>()
  const [unitId, setUnitId] = useState<number>()
  const [profile, setProfile] = useRecoilState(profileState)
  const token = useRecoilValue(tokenState)
  
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const resp = await addLease(
      token!,
      new Date(startDate!),
      new Date(endDate!),
      unitId!
    )

    let newUnit = profile?.units.find((unit) => unit.id === unitId)
    newUnit = {
      ...newUnit,
      leases: [resp, ...newUnit!.leases],
    } as Unit

    setProfile(
      (prev) =>
        ({
          units: [
            newUnit,
            ...prev!.units.filter((unit) => unitId! !== unit.id),
          ],
        } as Profile)
    )
    setStartDate(undefined)
    setEndDate(undefined)
    setUnitId(undefined)
  }



  return (
    <Form onSubmit={onSubmit}>
      <FormGroup>
        <Label>Unit</Label>
        <Input
          type="select"
          onChange={(e) => setUnitId(Number(e.target.value))}
        >
          <option selected disabled>
            Select Unit
          </option>
          {profile?.units.map((unit, i) => (
            <option value={unit.id}>{unit.address}</option>
          ))}
        </Input>
      </FormGroup>
      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label>Start Date</Label>
            <Input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label>End Date</Label>
            <Input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </FormGroup>
        </Col>
      </Row>
      <Button type="submit">Add Lease</Button>
    </Form>
  )
}

export default memo(LeaseForm)
