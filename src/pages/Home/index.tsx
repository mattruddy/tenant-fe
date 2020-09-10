import { memo } from "react"
import { useRecoilValue } from "recoil"
import { profileState } from "../../store"
import React from "react"
import { Container } from "reactstrap"
import UnitBlock from "../../components/UnitBlock"

const Home: React.FC = () => {
  const profile = useRecoilValue(profileState)
  console.log(profile)
  return (
    <Container fluid>
      {profile && profile.units && <UnitBlock units={profile.units} />}
    </Container>
  )
}

export default memo(Home)
