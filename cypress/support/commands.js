function getTestParameters() {
	return cy.fixture('parameters/test-parameters');
}

Cypress.Commands.add('fillTextBox', (get,find,type) => {
	cy.get(get).find(find).type(type);
});

Cypress.Commands.add('chooseCategoryElement', (category,element) => {
	cy.get('.category-cards').contains(category).click();
	cy.get('.menu-list').contains(element).click();
});

Cypress.Commands.add('checkCheckbox', (checkboxName) => {
	cy.get('#tree-node').find('input').get('#tree-node-'+checkboxName).click({force:true});
});

Cypress.Commands.add('selectRadio', (id,text) => {
	cy.get(id).check({force:true});
	cy.get('.text-success').should('have.text',text);
	});


Cypress.Commands.add('registrationFill', (name,lastname,email,age,salary,department) => {
	cy.get('#addNewRecordButton').click();
	cy.get('#firstName').type(name);
	cy.get('#lastName-wrapper').type(lastname);
	cy.get('#userEmail-wrapper').type(email);
	cy.get('#age').type(age);
	cy.get('#salary-wrapper').type(salary);
	cy.get('#department-wrapper').type(department);
	cy.get('#submit').click();
	});


Cypress.Commands.add('checkAPI', (url,id,buttonText,buttonAtribute,code,Message) => {

	cy.intercept('GET', url).as('apibutton');

	cy.get(id)
	.scrollIntoView()
	.should('contain',buttonText)
	.and("not.have.attr", "href", "#undefined")
	.and("have.attr", "href", buttonAtribute)
	.click();

	cy.wait('@apibutton').then((interception) => {
	  const { statusCode } = interception.response;
	  const { statusMessage } = interception.response;
	  
	  expect(statusCode).equal(code);
	  expect(statusMessage).equal(Message)
	});

	

});
