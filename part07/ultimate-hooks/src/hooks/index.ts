import React, { useEffect, useState } from 'react'
import axios from 'axios'

export interface Person {
    name: string
    number: string
    id: number
}

export interface Note {
    id: number,
    content: string
}

export const useResource = (baseUrl: string) => {
  const [resources, setResources] = useState<Person[] | Note[]>([])

  useEffect(() => {
    axios.get(baseUrl).then(response => {
      setResources(response.data)
    })
  }, [baseUrl])

  const create = async (resource: Omit<Note, 'id'> | Omit<Person,  'id'>) => {
    try {
      const res = await axios.post(baseUrl, resource)
      setResources([...resources, res.data])
    } catch (error) {
      console.log(error)
    }
  }

  const service = {
    create
  }

  return [
    resources, service
  ] as const
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