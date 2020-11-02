import { memo, Fragment, useState } from "react"
import {
  Col,
  Row,
  Modal,
  ModalBody,
  ModalHeader,
  Card,
  CardHeader,
  CardBody,
} from "reactstrap"
import { Unit, Tenant } from "../../utils/types"
import React from "react"
import InvoiceTable from "./InvoiceTable"
import { capitalize, dateFormat } from "../../utils/helpers"
import { Link } from "react-router-dom"

interface UnitBlockProps {
  units: Unit[]
}

const UnitBlock: React.FC<UnitBlockProps> = ({ units }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [currentTenant, setCurrentTenant] = useState<Tenant>()

  const openInvoice = (tenant: Tenant) => {
    setCurrentTenant(tenant)
    setIsOpen(true)
  }

  return (
    <Fragment>
      {units.map((unit, i) => (
        <Row key={i}>
          <Col className="mb-3">
            <Link to={`/unit/${unit.id}`}>
            <Card>
              <CardHeader>
                {unit.address}, {unit.city} {unit.state} {unit.zip}
              </CardHeader>
              <CardBody>
                {unit.leases.map((lease, i) => (
                  <div style={{
                    display: "flex",
                    flexDirection: "column"
                  }} key={i}>
                    <span><b>{dateFormat(lease.startDate)} - {dateFormat(lease.endDate)}</b></span>
                    {lease.tenants.map((tenant, i) => (
                      <span key={i}>{capitalize(tenant.firstName)} {capitalize(tenant.lastName)}</span>
                    ))}
                  </div>
                ))}
              </CardBody>
            </Card>
            </Link>
          </Col>
        </Row>
      ))}
      <Modal isOpen={isOpen} toggle={() => setIsOpen(!isOpen)}>
        <ModalHeader>
          {currentTenant &&
            `${capitalize(currentTenant.firstName)} ${capitalize(currentTenant.lastName)}`}
        </ModalHeader>
        <ModalBody>
          {currentTenant && <InvoiceTable tenant={currentTenant} />}
        </ModalBody>
      </Modal>
    </Fragment>
  )
}

export default memo(UnitBlock)
