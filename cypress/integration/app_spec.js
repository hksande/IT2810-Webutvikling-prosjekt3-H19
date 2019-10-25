
///<reference types = "cypress"/>
 import Chance from "chance";


 const chance = new Chance;
 Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  })

 describe('Application', () =>{
     const search = "Scapa Glansa"
     const minimum = "34"
    it("Can search",()=>{
         cy.visit('http://localhost:3000/')
         cy.get('[data-cy= "input"]').type(search)
         cy.get('#SearchButton').click()
         cy.get('[data-cy ="tekst"]').type(search)        
     })

     it("Can use togglebutton",()=>{
        cy.visit('http://localhost:3000/')
        cy.get('[data-cy = "drop"]').click()
        cy.contains("Pris stigende").click()
        cy.get('[data-cy = "0price"]').type("Kr. " + minimum)
        
    })
     it("Can use tabs",()=>{
         cy.visit('http://localhost:3000/')
         cy.get('[data-cy="tab2"]').click()
         cy.contains('Mest populære produkter')
     })

    it("Shopping", ()=> {
        cy.visit('http://localhost:3000/')
        cy.get('[data-cy="0expansion"]').click()
        cy.get('[data-cy = "0pluss"]').click()
        cy.get('[data-cy= "shopping"]').click()
        cy.get('[data-cy = "bekreft"]').click()
        
    })

    it("Can filter", () => {
        cy.visit('http://localhost:3000/')
        cy.get('[data-cy="Rødvin"]').click()
        
    })





 })