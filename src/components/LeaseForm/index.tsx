import React, { memo, FormEvent, useState, useEffect } from "react"
import { Form, FormGroup, Row, Col, Label, Input, Button } from "reactstrap"
import { useRecoilValue, useRecoilState } from "recoil"
import { profileState, tokenState } from "../../store"
import { addLease } from "../../data/api"
import { Profile, Unit, Lease } from "../../utils/types"
import { useParams } from "react-router-dom"

interface PathProps {
  unitId: string
}

const LeaseForm: React.FC = () => {
  const [startDate, setStartDate] = useState<string>()
  const [endDate, setEndDate] = useState<string>()
  const [profile, setProfile] = useRecoilState(profileState)
  const token = useRecoilValue(tokenState)
  const {unitId} = useParams<PathProps>()
  
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const resp = await addLease(
      token!,
      new Date(startDate!),
      new Date(endDate!),
      Number(unitId)!
    )

    let newUnit = profile?.units.find((unit) => unit.id === Number(unitId))
    newUnit = {
      ...newUnit,
      leases: [resp, ...newUnit!.leases],
    } as Unit

    setProfile(
      (prev) =>
        ({
          units: [
            newUnit,
            ...prev!.units.filter((unit) => Number(unitId)! !== unit.id),
          ],
        } as Profile)
    )
    setStartDate(undefined)
    setEndDate(undefined)
  }



  return (
    <Form onSubmit={onSubmit}>
      <FormGroup>
        <Label>{profile?.units.find(unit => unit.id === Number(unitId))?.address}</Label>
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
