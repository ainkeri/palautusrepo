const { test, expect, beforeEach, describe } = require('@playwright/test')
const { pathToFileURL } = require('url')
const { loginWith, createBlog } = require('./helper')

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

    await request.post('http://localhost:3003/api/users', {
        data: {
          name: 'Maija Virtanen',
          username: 'maijavirtanen',
          password: 'salainen'
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
        await loginWith(page, 'inksupinksu', 'secret')
        await expect(page.getByText('Inkeri Ahlström logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
        await loginWith(page, 'inksupinksu', 'wrong')
        await expect(page.getByText('Inkeri Ahlström logged in')).not.toBeVisible()
        await expect(page.getByText('wrong username or password')).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
        await loginWith(page, 'inksupinksu', 'secret')
    })

    test('a new blog can be created', async ({ page }) => {
        await createBlog(page, 'my first blog', 'unknown', 'https://myblogs.com/')
        await expect(page.getByText('a new blog my first blog by unknown added')).toBeVisible()
    })

    test('a blog can be liked', async ({ page }) => {
        await createBlog(page, 'my another blog', 'unknown again', 'https://myblogs.com/')

        await page.getByRole('button', { name: 'view' }).click()
        await page.getByRole('button', { name: 'like' }).click()

        await expect(page.getByText('likes 1')).toBeVisible()
    })

    test('a blog created by user can be deleted by same user', async ({ page }) => {
        await createBlog(page, 'my another blog', 'unknown again', 'https://myblogs.com/')
        await page.getByRole('button', { name: 'view' }).click()

        page.on('dialog', async dialog => {
            expect(dialog.type()).toContain('confirm')
            expect(dialog.message()).toContain('Remove blog my another blog by unknown again')
            await dialog.accept()
        })

        await page.getByRole('button', { name: 'remove' }).click()
        await expect(page.getByText('my another blog unknown againhide')).not.toBeVisible()
    })

    describe('When another person logs in', () => {
        beforeEach(async ({ page }) => {
            await createBlog(page, 'my first blog', 'unknown', 'https://myblogs.com/')
            await page.getByRole('button', { name: 'logout' }).click()
        })

        test('remove button is shown only if blog is created by user', async ({  page }) => {            
            await loginWith(page, 'maijavirtanen', 'salainen')

            await page.getByRole('button', { name: 'view' }).click()

            await expect(page.getByText('remove')).not.toBeVisible()
        })

        test.only('blog with most likes is displayed first', async ({ page }) => {
            await loginWith(page, 'maijavirtanen', 'salainen')

            await createBlog(page, 'my another blog', 'another unknown', 'https://myblogs.com/another')
            await page.getByText('my another blog another unknownview').waitFor()
            await page.getByRole('button', { name: 'view' }).last().click()
            await page.getByRole('button', { name: 'like' }).click()

            await page.getByRole('button', { name: 'logout' }).click()

            await loginWith(page, 'inksupinksu', 'secret')
            
            await page.getByRole('button', { name: 'view' }).first().click()
            await page.getByText('https://myblogs.com/another').waitFor()

            await expect(page.getByText('Maija Virtanen')).toBeVisible()
        })
    })
  })
})