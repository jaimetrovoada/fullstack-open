
import axios from 'axios'
const baseUrl = '/api/blogs'

let token:string | null = null
const setToken = (newToken:string) => { token = `Bearer ${newToken}` }

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const addNewBlog = async ({ title, author, url }: { title: string, author: string, url: string } ) => { 
  const data = {
    title, author, url
  }
  
  const config = {headers: { Authorization: token },  }
  const response = await axios.post(baseUrl,data, config )
  return response.data

}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, setToken, addNewBlog }