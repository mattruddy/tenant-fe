export interface Payment {
  address: string
  state: string
  zip: string
  amount: number
  firstName: string
  lastName: string
  city: string
}

export interface Invoice {
  amount: number
  token: string
  paid: boolean
  paidDate: Date
}

export interface Lease {
  id: number
  startDate: Date
  endDate: Date
  tenants: Tenant[]
}

export interface Tenant {
  id: number
  firstName: string
  lastName: string
  phoneNumber: string
  email: string
  invoices: Invoice[]
}

export interface Unit {
  id: number
  address: string
  city: string
  zip: string
  state: string
  leases: Lease[]
  expenseResponses: Expense[]
}

export interface Expense {
  id: number
  desc: string
  amount: number 
  createDate: Date
}

export interface Profile {
  email: string
  units: Unit[]
}

export type authType = "Register" | "Login"
