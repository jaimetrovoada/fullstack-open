/* eslint-disable @typescript-eslint/no-explicit-any */

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

  const config = { headers: { Authorization: token },  }
  const response = await axios.post(baseUrl,data, config )
  return response.data

}

const likeBlog = async ( blog : any ) => {
  const id = blog.id

  const updatedBlog = {
    ...blog,
    likes: blog.likes + 1,
    user: blog.user.id
  }

  const response = await axios.put(`${baseUrl}/${id}`,updatedBlog )
  return response.data
}

const deleteBlog = async (id: string) => {
  const config = { headers: { Authorization: token },  }
  const response = await axios.delete(`${baseUrl}/${id}`, config )
  return response.data
}

export default { getAll, setToken, addNewBlog, likeBlog, deleteBlog }