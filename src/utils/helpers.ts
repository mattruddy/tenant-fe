import moment from "moment"

export const currencyFormatter = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
})

export const dateFormat = (date: Date): string => {
  return moment(new Date(date)).format("MMM Do YYYY").toString()
}

export const capitalize = (s: string): string => {
  return `${s.charAt(0).toUpperCase()}${s.slice(1).toLowerCase()}`
}
