import { atom } from "recoil"
import { Profile } from "../utils/types"

export const tokenState = atom({
  key: "token",
  default: undefined as string | undefined,
})

export const isLoggedInState = atom({
  key: "isLoggedIn",
  default: undefined as undefined | boolean,
})

export const profileState = atom({
  key: "profile",
  default: undefined as Profile | undefined,
})
