import React, { memo, useState, FormEvent } from "react"
import { Form, FormGroup, Input, Label, Button, Row, Col } from "reactstrap"
import { addUnit } from "../../data/api"
import { useRecoilValue, useRecoilState } from "recoil"
import { tokenState, profileState } from "../../store"
import { Profile } from "../../utils/types"

const UnitForm: React.FC = () => {
  const [address, setAddress] = useState<string>()
  const [state, setState] = useState<string>()
  const [city, setCity] = useState<string>()
  const [zip, setZip] = useState<string>()
  const token = useRecoilValue(tokenState)
  const [profile, setProfile] = useRecoilState(profileState)

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const resp = await addUnit(token!, address!, state!, city!, zip!)
    setProfile(
      (prev) =>
        ({
          units: [...prev!.units, resp],
        } as Profile)
    )
  }

  return (
    <Form onSubmit={onSubmit}>
      <FormGroup>
        <Label>Address</Label>
        <Input
          placeholder="123 Main st."
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        ></Input>
      </FormGroup>

      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label>City</Label>
            <Input
              placeholder="New York"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            ></Input>
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label>State</Label>
            <Input
              placeholder="NY"
              value={state}
              onChange={(e) => setState(e.target.value)}
            ></Input>
          </FormGroup>
        </Col>
        <Col md={2}>
          <FormGroup>
            <Label>Zip</Label>
            <Input
              placeholder="10009"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
            ></Input>
          </FormGroup>
        </Col>
      </Row>

      <Button>Add Unit</Button>
    </Form>
  )
}

export default memo(UnitForm)
