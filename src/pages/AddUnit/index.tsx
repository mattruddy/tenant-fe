import { memo } from "react"
import React from "react"
import { Container, Card, CardBody, Row, Col, Button } from "reactstrap"
import UnitForm from "../../components/UnitForm"
import { useRecoilValue } from "recoil"
import { profileState, tokenState } from "../../store"
import { deleteUnit } from "../../data/api"

const AddUnit: React.FC = () => {
  const profile = useRecoilValue(profileState)
  const token = useRecoilValue(tokenState)

  const handleDelete = (id: number) => {
    deleteUnit(id, token!)
  }

  return (
    <Container fluid>
      <Card>
        <CardBody>
          <UnitForm />
        </CardBody>
      </Card>
    </Container>
  )
}

export default memo(AddUnit)
