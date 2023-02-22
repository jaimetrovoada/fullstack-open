import React, { useState, useEffect } from 'react'
import countryService from '../services/country'

export const useCountry = (name: string) => {
  const [country, setCountry] = useState<any>(null)

  useEffect(() => {
    if (name) {
      countryService.getCountry(name)
        .then(res => {
          if (res[0]) {
            setCountry({ ...res[0], found: true })
          } else {
            setCountry({ found: false })
          }
        })
    }
  }, [name])

  return  country
}

export const useField = (type: string) => {
  const [value, setValue] = useState('')

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}