import React, { useState } from "react"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import { pk_stripe } from "./utils/constants"
import Content from "./components/Content"
import SideBar from "./components/SideBar"
import { BrowserRouter } from "react-router-dom"
import useWindowSize from "./hooks/useWindowSize"
import { useRecoilValue } from "recoil"
import { isLoggedInState } from "./store"

const App: React.FC = () => {
  const stripePromise = loadStripe(pk_stripe)
  const [isOpen, setIsOpen] = useState(false)
  const isLoggedIn = useRecoilValue(isLoggedInState)
  const size = useWindowSize()

  const toggle = () => setIsOpen(!isOpen)

  return (
    <Elements stripe={stripePromise}>
      <BrowserRouter>
        <div className="App">
          {isLoggedIn && (
            <SideBar
              isOpen={size.width && size.width > 500 ? true : isOpen}
              toggle={toggle}
            />
          )}
          <Content
            isOpen={size.width && size.width > 500 ? true : isOpen}
            toggle={toggle}
          />
        </div>
      </BrowserRouter>
    </Elements>
  )
}

export default App
