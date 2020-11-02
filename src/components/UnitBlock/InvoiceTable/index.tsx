import React, { memo } from "react"
import { Tenant } from "../../../utils/types"
import { Table } from "reactstrap"
import { currencyFormatter, dateFormat } from "../../../utils/helpers"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck, faStop } from "@fortawesome/free-solid-svg-icons"

interface InvoiceTableProps {
  tenant: Tenant
}

const InvoiceTable: React.FC<InvoiceTableProps> = ({ tenant }) => {
  return (
    <Table>
      <thead>
        <tr>
          <th>Amount</th>
          <th>Paid</th>
          <th>Paid On</th>
        </tr>
      </thead>
      <tbody>
        {tenant.invoices.map((invoice, i) => {
          return (
            <tr>
              <td>{currencyFormatter.format(invoice.amount)}</td>
              <td>
                {invoice.paid ? (
                  <FontAwesomeIcon color="green" icon={faCheck} />
                ) : (
                  <FontAwesomeIcon color="red" icon={faStop} />
                )}
              </td>
              <td>{invoice.paidDate ? dateFormat(invoice.paidDate) : "N/A"}</td>
            </tr>
          )
        })}
      </tbody>
    </Table>
  )
}

export default memo(InvoiceTable)
