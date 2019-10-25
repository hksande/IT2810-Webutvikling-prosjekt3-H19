
///<reference types = "cypress"/>
 import Chance from "chance";

 const chance = new Chance;

 describe('Application', () =>{
     const search = "Scapa Glansa"
    it("Can search",()=>{
         cy.visit('http://localhost:3002/')
         cy.get('[data-cy= "input"]').type(search)
         cy.get('#SearchButton').click()
         
         
         
        
     })
     it("Can use togglebutton",()=>{
        cy.visit('http://localhost:3002/')
        cy.get("#ToggleButton").click()
        cy.contains("Pris stigende").click()
        
    })
     it("Can use tabs",()=>{
         cy.visit('http://localhost:3002/')
         cy.get('[data-cy="tab2"]').click()
         cy.contains('Topp 10 mest kjøpte varer')
     })

    it("Can buy", ()=> {
        cy.visit('http://localhost:3002/')
        cy.get('[data-cy="exspansion"]').click
        cy.get('[data-cy= ""]')
    })



 })