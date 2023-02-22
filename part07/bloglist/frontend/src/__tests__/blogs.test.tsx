import React, { useState } from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../components/Blog'
import BlogForm from '../components/BlogForm'

const blogs= [
  {
    'title': 'Canonical string reduction',
    'author': 'Edsger W. Dijkstra',
    'url': 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    'likes': 13,
    'user': {
      'name': 'Zoro',
      'username': 'zoro',
      'id': '63dca9bbd699ebf539fb2dc9'
    },
    'id': '5a422b3a1b54a676234d17f9'
  },
  {
    'title': 'First class tests',
    'author': 'Robert C. Martin',
    'url': 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    'likes': 10,
    'user': {
      'name': 'Zoro',
      'username': 'zoro',
      'id': '63dca9bbd699ebf539fb2dc9'
    },
    'id': '5a422b891b54a676234d17fa'
  },
  {
    'title': 'React patterns',
    'author': 'Michael Chan',
    'url': 'https://reactpatterns.com/',
    'likes': 7,
    'user': {
      'name': 'Monkey D. Luffy',
      'username': 'luffy',
      'id': '63dca9bbd699ebf539fb2dc8'
    },
    'id': '5a422a851b54a676234d17f7'
  },
  {
    'title': 'Go To Statement Considered Harmful',
    'author': 'Edsger W. Dijkstra',
    'url': 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    'likes': 5,
    'user': {
      'name': 'Monkey D. Luffy',
      'username': 'luffy',
      'id': '63dca9bbd699ebf539fb2dc8'
    },
    'id': '5a422aa71b54a676234d17f8'
  },
  {
    'title': 'straw hats daily life',
    'author': 'chopper',
    'url': 'https://chopper-daily.com',
    'likes': 3,
    'user': {
      'name': 'Chopper',
      'username': 'chopper',
      'id': '63e36cc18f4e15cd0f6a8c27'
    },
    'id': '63e376c48f4e15cd0f6a8d19'
  },
  {
    'title': 'Type wars',
    'author': 'Robert C. Martin',
    'url': 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    'likes': 2,
    'user': {
      'name': 'Vinsmoke Sanji',
      'username': 'sanji',
      'id': '63dca9bbd699ebf539fb2dca'
    },
    'id': '5a422bc61b54a676234d17fc'
  },
  {
    'title': 'On let vs const',
    'author': 'Dan Abramov',
    'url': 'https://overreacted.io/on-let-vs-const/',
    'likes': 1,
    'user': {
      'name': 'Chopper',
      'username': 'chopper',
      'id': '63e36cc18f4e15cd0f6a8c27'
    },
    'id': '63e466547258f292e9c6ad87'
  },
  {
    'title': 'TDD harms architecture',
    'author': 'Robert C. Martin',
    'url': 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    'likes': 0,
    'user': {
      'name': 'Vinsmoke Sanji',
      'username': 'sanji',
      'id': '63dca9bbd699ebf539fb2dca'
    },
    'id': '5a422ba71b54a676234d17fb'
  }
]

describe('blog section - shown content', () => {
  test('only blog name and author is shown if body is hidden', () => {


    const { container } = render(<Blog blog={blogs[0]} deleteBlog={jest.fn()} likeBlog={jest.fn()} />)

    const element = screen.queryByText('Canonical string reduction Edsger W. Dijkstra')
    const blogBody = container.querySelector('.blogItem--body')

    expect(element).toBeDefined()
    expect(blogBody).toHaveStyle('display: none')

  })

  test('url and likes only show after click', async () => {

    const { container } = render(<Blog blog={blogs[0]} deleteBlog={jest.fn()} likeBlog={jest.fn()} />)

    const blogBody = container.querySelector('.blogItem--body')

    const showBtn = container?.querySelector('.blogItem--button') as Element

    const user = userEvent.setup()
    await user.click(showBtn)
    expect(blogBody).toHaveStyle('display: block')
  })

  test('url and likes only show after click', async () => {

    const likeBlog = jest.fn()
    const { container } = render(<Blog blog={blogs[0]} deleteBlog={jest.fn()} likeBlog={likeBlog} />)

    const likeBtn = container?.querySelector('.blogItem--like') as Element

    const user = userEvent.setup()
    await user.dblClick(likeBtn)
    expect(likeBlog.mock.calls).toHaveLength(2)
  })
})

describe('blog form', () => {
  test('form is shown', async () => {
    const createNewBlog = jest.fn().mockImplementation((e) => e.preventDefault())
    const { container } = render(<BlogForm createNewBlog={createNewBlog} />)

    const showFormBtn = container.querySelector('.showFormBtn') as Element
    const user = userEvent.setup()
    await user.click(showFormBtn)

    const titleInput = container.querySelector('#title') as Element
    await user.type(titleInput, 'test is testing')

    const authorInput = container.querySelector('#author') as Element
    await user.type(authorInput, 'test user')

    const urlInput = container.querySelector('#url') as Element
    await user.type(urlInput, 'https://testing.com/this-is-a-test')

    const submitFormBtn = container.querySelector('.submitFormBtn') as Element
    await user.click(submitFormBtn)

    expect(createNewBlog.mock.calls).toHaveLength(1)
    expect(createNewBlog.mock.calls[0]).toContain('test is testing')
    expect(createNewBlog.mock.calls[0]).toContain('test user')
    expect(createNewBlog.mock.calls[0]).toContain('https://testing.com/this-is-a-test')
  })
})