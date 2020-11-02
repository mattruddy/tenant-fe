import React from 'react'
import { useParams } from 'react-router-dom'
import { Container } from 'reactstrap'
import ExpenseForm from '../../components/ExpenseForm'

interface PathParams {
    unitId: string
}

const AddExpense = () => {
    const {unitId} = useParams<PathParams>()

    return <Container>
        <ExpenseForm unitId={Number(unitId)} />
    </Container>
}

export default AddExpense