import { Selector } from 'testcafe';
import hopinPage from '../pageobjects/hopinPage';

fixture`Hopin Test`
  .page(`${hopinPage.url}`)

test('Submit Name', async t => {
  // Assertion for welcome page text
  await t.expect(Selector('#root h1').innerText).eql('Welcome to Customer App')
  await t.expect(Selector('#root p').innerText).eql('Please provide your name:')
  // Scenario - Validating error message when hitting submit button with blank name field
  await t.setNativeDialogHandler(() => true)
  await hopinPage.submitName()
  await t.expect(Selector('#root p').innerText).eql('Please provide your name:')
  // Scenario - Validating customer list screen when hitting submit button for "Saumil Jain" name
  await hopinPage.enterName('Saumil Jain')
  await hopinPage.submitName()
  await t.expect(Selector('#root b').innerText).eql('Saumil Jain')
  // scenario - Validating customer list screen components
  await t.expect(Selector('th').textContent).contains('Name', '# of Employees', 'Size')
})

test('Validate Contacts Detail Screen and Verify back button', async t => {
  await hopinPage.enterName('Saumil Jain')
  await hopinPage.submitName()
  // Validate Contacts Detail Screen
  await hopinPage.clickCompany()
  await t.expect(Selector('p').nth(2).textContent).contains('Name: Americas Inc.')
  await t.expect(Selector('p').nth(4).textContent).contains('Size: Small')
  await t.expect(Selector('p').nth(3).textContent).contains('# of Employees: 10')
  await t.expect(Selector('p').nth(5).textContent).contains('Contact: John Smith (jsmith@americasinc.com)')
  await t.expect(Selector('input[type="button"]').value).eql('Back to the list')
  // Verify Back to the list button
  await hopinPage.backList()
  await t.expect(Selector('td').nth(3).textContent).eql('Caribian Airlnis')
})

test('Validate for United Brands company and verify No contact info available message', async t => {
  await hopinPage.enterName('Saumil Jain')
  await hopinPage.submitName()
  // This test will fail due to JavaScript error with message - TypeError: Cannot read properties of undefined (reading 'name')
  await hopinPage.companyError()
  await t.expect(Selector('div').nth(3).innerText).contains('No contact info available message')
})
