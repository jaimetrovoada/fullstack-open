describe('blog app', () => {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3000/api/testing/reset')
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
})