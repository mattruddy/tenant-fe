import { Payment, Profile, Unit, Tenant, Lease, Invoice } from "../utils/types"
import { basePath } from "../utils/constants"

export const getInvoice = async (token: string): Promise<Payment> => {
  const resp = await fetch(`${basePath}/public/invoice/${token}`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  })
  return (await resp.json()) as Payment
}

export const payInvoice = async (stripeId: string, token: string) => {
  await fetch(`${basePath}/public/invoice`, {
    headers: {
      "content-type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      token: token,
      stripeId: stripeId,
    }),
  })
}

export const login = async (
  email: string,
  password: string
): Promise<string> => {
  const resp = await fetch(`${basePath}/public/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
  return (await resp.json()).token as string
}

export const signup = async (
  email: string,
  password: string
): Promise<string> => {
  const resp = await fetch(`${basePath}/public/signup`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
  return (await resp.json()).token as string
}

export const getProfile = async (token: string): Promise<Profile> => {
  const resp = await fetch(`${basePath}/secure/profile`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
  return (await resp.json()) as Profile
}

export const addUnit = async (
  token: string,
  address: string,
  state: string,
  city: string,
  zip: string
): Promise<Unit> => {
  const resp = await fetch(`${basePath}/secure/unit`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      address: address,
      state: state,
      city: city,
      zip: zip,
    }),
  })
  return (await resp.json()) as Unit
}

export const addTenant = async (
  token: string,
  firstName: string,
  lastName: string,
  email: string,
  phoneNumber: string,
  leaseId: number
): Promise<Tenant> => {
  const resp = await fetch(`${basePath}/secure/tenant/${leaseId}`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
    }),
  })
  return (await resp.json()) as Tenant
}

export const addLease = async (
  token: string,
  startDate: Date,
  endDate: Date,
  unitId: number
): Promise<Lease> => {
  const resp = await fetch(`${basePath}/secure/lease/${unitId}`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      startDate: startDate,
      endDate: endDate,
    }),
  })
  return (await resp.json()) as Lease
}

export const addInvoice = async (
  token: string,
  amount: number,
  tenantId: number
): Promise<Invoice> => {
  const resp = await fetch(`${basePath}/secure/invoice/${tenantId}`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      amount: amount,
    }),
  })
  return (await resp.json()) as Invoice
}
