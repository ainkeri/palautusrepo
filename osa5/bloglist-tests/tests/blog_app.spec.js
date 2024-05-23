const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http:localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Inkeri Ahlström',
        username: 'inksupinksu',
        password: 'secret'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const locator = await page.getByText('log in to application')
    await expect(locator).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
        await page.getByTestId('username').fill('inksupinksu')
        await page.getByTestId('password').fill('secret')

        await page.getByRole('button', { name: 'login' }).click()

        await expect(page.getByText('Inkeri Ahlström logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
        await page.getByTestId('username').fill('inksupinksu')
        await page.getByTestId('password').fill('wrong')

        await page.getByRole('button', { name: 'login' }).click()

        await expect(page.getByText('Inkeri Ahlström logged in')).not.toBeVisible()
        await expect(page.getByText('wrong username or password')).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
        await page.getByTestId('username').fill('inksupinksu')
        await page.getByTestId('password').fill('secret')

        await page.getByRole('button', { name: 'login' }).click()
    })

    test('a new blog can be created', async ({ page }) => {
        await page.getByRole('button', { name: 'new blog' }).click()
        
        await page.getByTestId('title').fill('my first blog')
        await page.getByTestId('author').fill('unknown')
        await page.getByTestId('url').fill('https://myblogs.com/')

        await page.getByRole('button', { name: 'create' }).click()

        await expect(page.getByText('a new blog my first blog by unknown added')).toBeVisible()
    })
  })
})