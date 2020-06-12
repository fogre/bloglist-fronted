
const loginHelper = (user = 'test', pass = 'secret') => {
  cy.contains('login').click()
  cy.get('#LoginUser').type(user)
  cy.get('#LoginPass').type(pass)
  cy.get('#LoginButton').click()
}

describe('Bloglist app', function() { 

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/tests/reset')
    const user = { username: 'test', password: 'secret' }
    cy.request('POST', 'http://localhost:3001/api/users/', user) 
    cy.visit('http://localhost:3000')
  })

  describe('The bloglist site ', function() {
    
    it('front page can be opened', function() {
      cy.contains('blogs')
    })

    it('login can be opened and invalid user returns error message', function() {
      loginHelper('asdd', 'wdad')
      cy.contains('wrong credentials')
      cy.contains('cancel')
    })

    it('login can be opened and valid user can log in and out', function() {
      loginHelper()
      cy.get('#LogoutButton').click()
      cy.contains('login')
    })
  })

  describe('When logged in', function() {

    beforeEach(function() {
      loginHelper()
    })

    it('a new blog can be created', function() {
      cy.contains('Add blog').click()
      cy.get(`input[name='title']`).type('Testing stuff blog')
      cy.get(`input[name='author']`).type('Andy Author')
      cy.get(`input[name='url']`).type('www.com')
      cy.contains('save').click()
    })

  })
})    