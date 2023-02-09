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
})