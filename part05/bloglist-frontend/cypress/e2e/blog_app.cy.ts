describe('blog app', () => {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = { name: 'Matti Luukkainen', username: 'mluukkai', password: 'salainen' }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('login form is shown', () => {
    cy.get('#login-form').should('be.visible')
  })

  describe('Login',() =>  {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('.loginBtn').click()

      cy.contains('logged in as mluukkai')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('sdagdfghasd')
      cy.get('.loginBtn').click()

      cy.get('#notification').should('have.css', 'color', 'rgb(255, 0, 0)')
      cy.contains('wrong name or password')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'mluukkai', password: 'salainen' })
      cy.createBlog({ title: 'Hello World', author: 'Matti Luukkainen', url: 'http://matti.com/hello-world' })
    })

    it('A blog can be created', function() {

      cy.contains('Hello World Matti Luukkainen')
    })

    it('can like a blog', function () {
      cy.get('.blogItem--button').click()
      cy.contains('likes 0')
      cy.get('.blogItem--like').click()
      cy.contains('likes 1')
    })

    it('can delete a blog', function () {
      cy.get('.blogItem--button').click()
      cy.contains('delete')
      cy.get('.blogItem--delete').click()
      cy.get('.blogSection').should('not.contain', 'Hello World Matti Luukkainen')
    })

    it('only the creator can see delete button', function () {
      const user = { name: 'Chopper', username: 'chopper', password: 'reindeer' }
      cy.request('POST', 'http://localhost:3001/api/users/', user)

      cy.get('.logout-btn').click()
      cy.login({ username: 'chopper', password: 'reindeer' })

      cy.get('.blogItem--button').click()
      cy.get('.blogItem').should('not.contain', 'delete')
    })
  })


})