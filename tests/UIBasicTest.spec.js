const {test, expect} = require('@playwright/test')

test('broswer context Playwright test', async ({browser})=>{

    const context = await browser.newContext()
    const page = await context.newPage();
   await page.goto('https://rahulshettyacademy.com/loginpagepractice/')
})

test('Page Playwright test', async ({page})=>{

    await page.goto('https://google.com')
})

test('Title Assertion', async ({page}) =>{
    await page.goto("https://google.com")
    console.log(await page.title())
    await expect(page).toHaveTitle('Google')
})

test('Login', async ({page})=>{
   
    await page.goto('https://testautomationpractice.blogspot.com/')
    await page.locator('#name').fill('Sagar Bhilawade')
    await page.locator('#email').fill('bhilawadesagar321@gmail.com')
    
})


test('Login Page Practice', async ({page})=>{
   
    await page.goto('https://automationexercise.com/login')
    await page.locator("input[data-qa='login-email']").fill('bhilawadesagar321@gmail.com')
    await page.locator("input[placeholder='Password']").fill('Sagar@0321')
    await page.locator("button[data-qa='login-button']").click()
    await expect( page.locator("input[placeholder='Password']~p")).toHaveText("Your email or password is incorrect!")
    
})

test('UI controls - DROPDOWN', async({page})=>{

    await page.goto('https://testautomationpractice.blogspot.com/')
    const contryDropdown=  page.locator('select#country')
    await contryDropdown.selectOption('india')
    await page.locator('#female').click()
    expect(page.locator('#female')).toBeChecked()
    await page.locator("label[for='sunday']").click()
    await page.locator("label[for='sunday']").uncheck()
    expect(await page.locator("label[for='sunday']").isChecked()).toBeFalsy()

})


test('Child windows Handling', async({browser})=>{
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto('https://testautomationpractice.blogspot.com/')
    const [newPage, newpage2] = await Promise.all(
        [ context.waitForEvent('page'),
        context.waitForEvent('page'),
    page.locator('#PopUp').click()
   ])

   console.log(await newPage.locator('div.card-body').locator('p').nth(1).textContent());
   console.log(await newpage2.locator('.getStarted_Sjon').textContent());
})




