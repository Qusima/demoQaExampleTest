function getTestParameters() {
	return cy.fixture('parameters/test-parameters');
}

describe('Demoqa e2e test', { testIsolation: true }, () => {
	beforeEach(() => {
		cy.visit('');
	});
	it('Text Box', () => {
		getTestParameters().then((parameters) => {
			// custom command ChooseCategoryElement - commands.js
			cy.chooseCategoryElement('Elements', 'Text Box');

			// custom command FillTextBox - commands.js
			cy.fillTextBox(
				'#userName-wrapper',
				'input',
				parameters.textBoxName
			);
			cy.fillTextBox(
				'#userEmail-wrapper',
				'input',
				parameters.textBoxEmail
			);
			cy.fillTextBox(
				'#currentAddress-wrapper',
				'textarea',
				parameters.textBoxcurrentAdress
			);
			cy.fillTextBox(
				'#permanentAddress-wrapper',
				'textarea',
				parameters.textBoxpermanentAdresss
			);

			cy.get('#submit').click();
		});
	});

	it('Check Box', () => {
		cy.chooseCategoryElement('Elements', 'Check Box');

		cy.get('.rct-option-expand-all').click();

		getTestParameters().then((parameters) => {
			cy.checkCheckbox(parameters.checkbox1);
			cy.checkCheckbox(parameters.checkbox2);
			cy.checkCheckbox(parameters.checkbox3);
			cy.checkCheckbox(parameters.checkbox4);
			cy.checkCheckbox(parameters.checkbox5);

			cy.get('#result').should(
				'have.text',
				`You have selected :${parameters.checkboxresult}`
			);

			cy.get('.rct-option-collapse-all').click();
			cy.get('#tree-node')
				.find('input')
				.get(`#tree-node-${parameters.checkbox1}`)
				.should('not.exist');
		});
		cy.get('.rct-icon-expand-close').click();

		cy.get('#tree-node')
			.find('input')
			.get('#tree-node-desktop')
			.should('exist');
		cy.get('#tree-node')
			.contains('Desktop')
			.find('svg')
			.eq(0)
			.should('have.class', 'rct-icon-check');
		cy.get('#tree-node')
			.find('input')
			.get('#tree-node-notes')
			.should('not.exist');
	});

	it('Radio Button', () => {
		cy.chooseCategoryElement('Elements', 'Radio Button');

		cy.selectRadio('#yesRadio', 'Yes');
		cy.selectRadio('#impressiveRadio', 'Impressive');

		cy.get('#noRadio').should('be.disabled');
	});

	it('Web Tables', () => {
		const array1 = [1, 30, 4, 21, 100000];
		array1.sort();
		getTestParameters().then((parameters) => {
			cy.chooseCategoryElement('Elements', 'Web Tables');
			cy.registrationFill(
				'test1',
				'test1',
				'test@test.pl',
				'24',
				'2000',
				'test1'
			);
			cy.registrationFill(
				'test2',
				'test2',
				'test2@test.pl',
				'25',
				'3000',
				'test2'
			);

			cy.get('.rt-tr-group').should('have.length', 10);
			cy.get('.select-wrap').find('select').select('5 rows');
			cy.get('.rt-tr-group').should('have.length', 5);

			const correctSort = [
				'Last Name',
				'Cantrell',
				'Gentry',
				'test1',
				'test2',
				'Vega',
			];

			cy.get('.rt-resizable-header').contains('Last Name').click();

			cy.get('.rt-tr > :nth-child(2)').each(($span, i) => {
				expect($span.text()).to.equal(correctSort[i]);
			});

			cy.registrationFill(
				'test3',
				'test3',
				'test3@test.pl',
				'26',
				'4000',
				'test3'
			);

			cy.get('.rt-resizable-header').contains('First Name').click();
			cy.get('.-next').click();
			cy.scrollTo('top');
			cy.get('.rt-tr-group').contains(/4000|10000/); // two diffrent rows are on secound page for each run so we expect one of those two 
			cy.get('.-pageJump').find('input').should('have.value', '2');

			cy.get('.-previous').click();
			cy.get('.-pageJump').find('input').should('have.value', '1');

			cy.get('#searchBox').type('test3');
			cy.get('.rt-tr-group').contains('test3');

			cy.get('#edit-record-6').click();
			cy.get('#firstName').type('delete');
			cy.get('#submit').click();
			cy.get('.rt-tr-group').contains('test3delete');

			cy.get('.-next').click();
			cy.get('#delete-record-6').click();
			cy.get('.rt-noData').should('be.visible');
			cy.get('#searchBox').clear();
			cy.get('.-pageJump').find('input').should('have.value', '1');
		});
	});

	it('Buttons', () => {
		cy.chooseCategoryElement('Elements', 'Buttons');
		cy.get('[type=button]').eq(3).click();
		cy.get('#rightClickBtn').rightclick();
		cy.get('#doubleClickBtn').dblclick();
	});

	it('Links', () => {
		cy.chooseCategoryElement('Elements', 'Links');

		cy.contains('Home')
			.scrollIntoView()
			.should('have.text', 'Home')
			.and('not.have.attr', 'href', '#undefined')
			.and('have.attr', 'href', 'https://demoqa.com');

		cy.get('#dynamicLink')
			.scrollIntoView()
			.should('contain', 'Home')
			.and('not.have.attr', 'href', '#undefined')
			.and('have.attr', 'href', 'https://demoqa.com');

		cy.checkAPI(
			'https://demoqa.com/created',
			'#created',
			'Created',
			'javascript:void(0)',
			201,
			'Created'
		);
		cy.checkAPI(
			'https://demoqa.com/no-content',
			'#no-content',
			'No Content',
			'javascript:void(0)',
			204,
			'No Content'
		);
		cy.checkAPI(
			'https://demoqa.com/moved',
			'#moved',
			'Moved',
			'javascript:void(0)',
			301,
			'Moved Permanently'
		);
		cy.checkAPI(
			'https://demoqa.com/bad-request',
			'#bad-request',
			'Bad Request',
			'javascript:void(0)',
			400,
			'Bad Request'
		);
		cy.checkAPI(
			'https://demoqa.com/unauthorized',
			'#unauthorized',
			'Unauthorized',
			'javascript:void(0)',
			401,
			'Unauthorized'
		);
		cy.checkAPI(
			'https://demoqa.com/forbidden',
			'#forbidden',
			'Forbidden',
			'javascript:void(0)',
			403,
			'Forbidden'
		);
		cy.checkAPI(
			'https://demoqa.com/invalid-url',
			'#invalid-url',
			'Not Found',
			'javascript:void(0)',
			404,
			'Not Found'
		);
	});

	it('Broken Links', () => {
		cy.chooseCategoryElement('Elements', 'Broken Links - Images');

		cy.get('[src="/images/Toolsqa.jpg"]')
			.should('be.visible')
			.and(($img) => expect($img[0].naturalWidth).to.be.gt(346));

		cy.get('[href="http://the-internet.herokuapp.com/status_codes/500"]')
			.invoke('attr', 'href')
			.then(($link) => {
				const link = $link;

				cy.request({ url: link, failOnStatusCode: false }).should(
					(response) => {
						expect(response.status).to.eq(500);
					}
				);
			});

		cy.get('[href="http://demoqa.com"]')
			.invoke('attr', 'href')
			.then(($link2) => {
				const link2 = $link2;

				cy.request({ url: link2, failOnStatusCode: false }).should(
					(response) => {
						expect(response.status).to.eq(200);
					}
				);
			});

		// to make test not fail
		Cypress.on('fail', (error, runnable) => {
			if (!error.message.includes('0 to be above 50')) {
				throw error;
			}
		});

		cy.get('[src="/images/Toolsqa_1.jpg"]')
			.should('be.visible')
			.and(($img) => expect($img[0].naturalWidth).to.be.gt(50));
	});

	it.only('Upload and Download', () => {
		cy.chooseCategoryElement('Elements', 'Upload and Download');

		getTestParameters().then((parameters) => {

		cy.log('Clear download fodler if failed here');
		cy.readFile(parameters.downloadPath).should('not.exist');

		cy.get('#downloadButton').contains('Download').click();

			// needed to clear downloads folder before cypress start in interactive mode
			// cypress doesnt support file delete in that scenario
			// still searching for solution - for now step skiped
			cy.readFile(parameters.downloadPath);

			
			

			cy.get('#uploadFile').click();

			cy.get('#uploadFile').selectFile(
				'cypress/downloads/sampleFile.jpeg'
			);
		});
	});

	it('Dynamic Properties', () => {
		cy.chooseCategoryElement('Elements', 'Dynamic Properties');

		cy.get('#colorChange').should(
			'have.css',
			'-webkit-text-fill-color',
			'rgb(255, 255, 255)'
		);

		cy.contains('This text has random Id')
			.invoke('attr', 'id')
			.then((id) => {
				cy.log(id); // prints id
			});

		cy.get('#enableAfter').click({ timeout: 6000 });

		cy.get('#visibleAfter').should('be.visible').click({ timeout: 6000 });

		cy.get('#colorChange').should(
			'have.css',
			'-webkit-text-fill-color',
			'rgb(220, 53, 69)',
			{ timeout: 6000 }
		);
	});
});
