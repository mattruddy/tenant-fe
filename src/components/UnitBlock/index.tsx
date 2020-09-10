import { memo, Fragment } from "react"
import { Col, Row, Card, CardHeader, CardBody, CardTitle } from "reactstrap"
import { Unit } from "../../utils/types"
import React from "react"
import { dateFormat, currencyFormatter } from "../../utils/helpers"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck } from "@fortawesome/free-solid-svg-icons"

interface UnitBlockProps {
  units: Unit[]
}

const UnitBlock: React.FC<UnitBlockProps> = ({ units }) => {
  return (
    <Fragment>
      {units.map((unit, i) => (
        <Row key={i}>
          <Col className="mb-3">
            <Card>
              <CardHeader>
                <CardTitle> {unit.address}</CardTitle>
              </CardHeader>
              <CardBody>
                {unit.leases.map((lease, i) => {
                  return (
                    <Row key={i}>
                      <Col>
                        <Card>
                          <CardHeader>
                            <span>{dateFormat(lease.startDate)}</span>
                            <span> - </span>
                            <span>{dateFormat(lease.endDate)}</span>
                          </CardHeader>
                          <CardBody>
                            <Card>
                              <CardBody>
                                {lease.tenants.map((tenant, i) => {
                                  return (
                                    <div key={i}>
                                      <Row>
                                        <Col>{`${tenant.firstName} ${tenant.lastName}'s Invoices`}</Col>
                                      </Row>
                                      {tenant.invoices.map((invoice, i) => {
                                        return (
                                          <div
                                            key={i}
                                            style={{
                                              display: "flex",
                                              flexDirection: "column",
                                              margin: "16px",
                                            }}
                                          >
                                            {currencyFormatter.format(
                                              invoice.amount
                                            )}
                                            {invoice.token}
                                            {invoice.paid ? (
                                              <FontAwesomeIcon
                                                color="green"
                                                icon={faCheck}
                                              />
                                            ) : (
                                              <span color="red">PENDING</span>
                                            )}
                                            {invoice.paidDate &&
                                              dateFormat(invoice.paidDate)}
                                          </div>
                                        )
                                      })}
                                    </div>
                                  )
                                })}
                              </CardBody>
                            </Card>
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                  )
                })}
              </CardBody>
            </Card>
          </Col>
        </Row>
      ))}
    </Fragment>
  )
}

export default memo(UnitBlock)
