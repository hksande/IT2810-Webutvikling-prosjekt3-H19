
///<reference types = "cypress"/>
 import Chance from "chance";


 const chance = new Chance;

 describe('Application', () =>{
     const search = "Scapa Glansa"
    it("Can search",()=>{
         cy.visit('http://localhost:3002/')
         cy.get('[data-cy= "input"]').type(search)
         cy.get('#SearchButton').click()
         cy.get('[data-cy ="tekst"]').type(search)
         
         
         
        
     })
     it("Can use togglebutton",()=>{
        cy.visit('http://localhost:3002/')
        cy.get('[data-cy = "drop"]').click()
        cy.contains("Pris stigende").click()
        
    })
     it("Can use tabs",()=>{
         cy.visit('http://localhost:3002/')
         cy.get('[data-cy="tab2"]').click()
         cy.contains('Mest populære produkter')
     })

    it("Shopping", ()=> {
        cy.visit('http://localhost:3002/')
        cy.get('[data-cy= "shopping"]').click()
    })



 })