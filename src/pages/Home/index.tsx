import { memo } from "react"
import { useRecoilValue } from "recoil"
import { profileState } from "../../store"
import React from "react"
import { Container } from "reactstrap"
import UnitBlock from "../../components/UnitBlock"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"

const Home: React.FC = () => {
  const profile = useRecoilValue(profileState)
  
  return (
    <Container fluid>
      <div>
        <Link to="/add/unit">
          <FontAwesomeIcon icon={faPlus} /> Add Unit
        </Link>
      </div>
      {profile && profile.units && <UnitBlock units={profile.units} />}
    </Container>
  )
}

export default memo(Home)
