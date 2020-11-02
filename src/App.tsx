import React from "react"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import { pk_stripe } from "./utils/constants"
import Content from "./components/Content"
import { BrowserRouter } from "react-router-dom"
import useWindowSize from "./hooks/useWindowSize"
import { useRecoilValue } from "recoil"
import { isLoggedInState } from "./store"
import MainNav from "./components/MainNav"

const App: React.FC = () => {
  const stripePromise = loadStripe(pk_stripe)
  const isLoggedIn = useRecoilValue(isLoggedInState)
  const size = useWindowSize()

  return (
    <Elements stripe={stripePromise}>
      <BrowserRouter>
        <div className="App">
          {isLoggedIn && (
            <MainNav />
          )}
          <Content />
        </div>
      </BrowserRouter>
    </Elements>
  )
}

export default App
