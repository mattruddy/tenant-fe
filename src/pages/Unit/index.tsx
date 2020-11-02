import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Fragment, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Container } from 'reactstrap'
import { useRecoilValue } from 'recoil'
import { profileState } from '../../store'
import { capitalize, currencyFormatter, dateFormat } from '../../utils/helpers'
import { Unit } from '../../utils/types'

interface PathProps {
    id: string
}

const UnitPage = () => {
    const profile = useRecoilValue(profileState)
    const {id} = useParams<PathProps>()
    const [unit, setUnit] = useState<Unit>()

    useEffect(() => {
        if (id && profile) {
            const u = profile.units.find(unit => unit.id === Number(id))
            setUnit(u)
        }
    }, [id, profile])

return <Container>
    {unit && 
    <Fragment>

    <div className="SecNav">
        <h2>{unit.address}</h2>
        <div>
            <Link className="p-2" to={`/lease/add/${id}`}>
                <FontAwesomeIcon icon={faPlus} /> Lease
            </Link>
            <Link className="p-2" to={`/tenant/add/${id}`}>
                <FontAwesomeIcon icon={faPlus} /> Tenant
            </Link>
        </div>
    </div>
    <div>
        {unit.leases.map((lease, i) => (
            <ul key={i}>
                <span><b>{`${dateFormat(lease.startDate)} - ${dateFormat(lease.endDate)}`}</b></span>
                {lease.tenants.map((tenant, i) => (
                    <li key={i}>{`${capitalize(tenant.firstName)} ${capitalize(tenant.lastName)}`}</li>
                ))}
            </ul>
        ))}
    </div>
    <div>
        <div>
        <h2>Expenses</h2>
        <Link to={`/expense/add/${unit.id}`}><FontAwesomeIcon icon={faPlus} /></Link>
        </div>
        {unit.expenseResponses.map((expense, i) => (
            <span key={i}><b>{dateFormat(expense.createDate)}</b> {currencyFormatter.format(expense.amount)} - {expense.desc}</span>
        ))}
    </div>
    </Fragment>
    }
    </Container>
}

export default UnitPage