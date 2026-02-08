const {test, expect} = require('@playwright/test')

test('Register a User', async({page})=>{
    await page.goto('https://rahulshettyacademy.com/client/#/auth/register');
    await page.locator('#firstName').fill('Sagar')
    await page.locator('#lastName').fill('Bhilawade')
    await page.locator('#userEmail').fill('bhilawadesagar123@gmail.com')
    await page.locator('#userMobile').fill('7841970321')
    const occupationDropdown = page.locator("[formcontrolname='occupation']")
    await occupationDropdown.selectOption("3: Engineer")
    await page.locator("input[value='Male']").click()
    await page.locator("#userPassword").fill("Sagar@0321")
    await page.locator('#confirmPassword').fill("Sagar@0321")
    await page.locator("input[type='checkbox']").click()
    await page.locator("[value='Register']").click()
    await expect(page.locator("h1.headcolor")).toHaveText("Account Created Successfully")
})

test('Login User', async({page})=>{
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login')
    await page.locator("#userEmail").fill("bhilawadesagar321@gmail.com")
    await page.locator("#userPassword").fill("Sagar@0321")
    await page.locator("#login[value='Login']").click()
})

test('E2E Tests', async({page})=>{
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login')
    await page.locator("#userEmail").fill("bhilawadesagar321@gmail.com")
    await page.locator("#userPassword").fill("Sagar@0321")
    await page.locator("#login[value='Login']").click()
    const allCards = page.locator("div.row div.card")
    await expect(allCards.first()).toBeVisible();
    const count = await allCards.count();
    console.log('Count :'+count);
    
    for(let i = 0; i < count; ++i){
        const product=  allCards.nth(i).locator("div.card-body");
        const productName = await product.locator('h5').textContent()
        if(productName?.includes('ZARA')){
           await product.locator("button[style*='float']").click()
            break;
        }
    }

    await page.locator("button[routerLink = '/dashboard/cart']").click()
    await page.locator("//button[normalize-space()='Checkout']").click()
    await page.locator("[value='4542 9931 9292 2293']").clear()
    await page.locator("[value='4542 9931 9292 2293']").fill("1234 1234 1234 1234")
    const monthDropDown = page.locator("//select[1]")
    await monthDropDown.selectOption("02");
    const yearDropDown = page.locator("//select[2]")
    await yearDropDown.selectOption("26")
    await page.locator("//div[@class='field small'][2]/input").fill("999")
    
})