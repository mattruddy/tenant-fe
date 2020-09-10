import React, { memo, FormEvent, useState, useEffect } from "react"
import { Form, FormGroup, Row, Col, Label, Input, Button } from "reactstrap"
import { useRecoilValue, useRecoilState } from "recoil"
import { profileState, tokenState } from "../../store"
import { addTenant } from "../../data/api"
import { Profile, Unit, Lease } from "../../utils/types"
import { dateFormat } from "../../utils/helpers"

const TenantForm: React.FC = () => {
  const [firstName, setFirstName] = useState<string>()
  const [lastName, setLastName] = useState<string>()
  const [email, setEmail] = useState<string>()
  const [phoneNumber, setPhoneNumber] = useState<string>()
  const [unitId, setUnitId] = useState<number>()
  const [leaseId, setLeaseId] = useState<number>()
  const [profile, setProfile] = useRecoilState(profileState)
  const token = useRecoilValue(tokenState)
  const [currentLeases, setCurrentLease] = useState<Lease[]>([])

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const resp = await addTenant(
      token!,
      firstName!,
      lastName!,
      email!,
      phoneNumber!,
      leaseId!
    )

    let newUnit = profile?.units.find((unit) => unit.id === unitId)
    let newLease = newUnit?.leases.find((lease) => lease.id === leaseId)

    newLease = {
      ...newLease,
      tenants: [resp, ...newLease!.tenants],
    } as Lease

    newUnit = {
      ...newUnit,
      leases: [
        newLease,
        ...newUnit!.leases.filter((lease) => lease.id !== leaseId),
      ],
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
    setFirstName(undefined)
    setLastName(undefined)
    setEmail(undefined)
    setPhoneNumber(undefined)
  }

  useEffect(() => {
    if (unitId) {
      setCurrentLease(
        profile?.units.find((unit) => unit.id === unitId)?.leases!
      )
    }
  }, [unitId])

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
      {currentLeases.length > 0 && (
        <FormGroup>
          <Label>Lease</Label>
          <Input
            type="select"
            onChange={(e) => setLeaseId(Number(e.target.value))}
          >
            <option selected disabled>
              Select Lease
            </option>
            {currentLeases.map((lease, i) => (
              <option key={i} value={lease.id}>{`${dateFormat(
                lease.startDate
              )} - ${dateFormat(lease.endDate)}`}</option>
            ))}
          </Input>
        </FormGroup>
      )}
      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label>First Name</Label>
            <Input
              placeholder="John"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label>Last Name</Label>
            <Input
              placeholder="Smith"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </FormGroup>
        </Col>
      </Row>
      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label>Email</Label>
            <Input
              placeholder="example@me.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label>Phone Number</Label>
            <Input
              placeholder="(555) 555-5555"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </FormGroup>
        </Col>
      </Row>
      <Button type="submit">Add Tenant</Button>
    </Form>
  )
}

export default memo(TenantForm)
