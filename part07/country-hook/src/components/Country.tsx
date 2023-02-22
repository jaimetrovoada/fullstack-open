import React from 'react'

interface Props {
    country: Record<any, any>
}
const Country: React.FC<Props> = ({ country }) => {

  if (!country) {
    return null
  }

  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country?.name.common} </h3>
      <div>capital {country?.capital[0]} </div>
      <div>population {country?.population}</div>
      <img src={country?.flags.png} height='100' alt={`flag of ${country?.name. common}`}/>
    </div>
  )
}

export default Country