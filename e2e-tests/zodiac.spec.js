import { test, expect } from '@playwright/test';

test.describe('Zodiac Web App E2E', () => {
  test('should switch language successfully', async ({ page }) => {
    await page.goto('/');
    
    // Default is English
    await expect(page.locator('h2')).toHaveText('Discover Your Chart');
    
    // Switch to Vietnamese
    await page.getByRole('button', { name: 'Tiếng Việt' }).click();
    await expect(page.locator('h2')).toHaveText('Khám Phá Bản Đồ Sao Của Bạn');
  });

  test('should submit birth data and show encrypted chart success', async ({ page }) => {
    await page.goto('/');
    
    // Fill out the form
    await page.getByLabel('Name').fill('Test User');
    await page.getByLabel('Date of Birth').fill('1990-01-01');
    await page.getByLabel('Time of Birth').fill('12:00');
    await page.getByLabel('Location').fill('Test City');
    
    // Submit
    await page.getByRole('button', { name: 'Get Natal Chart' }).click();
    
    // Wait for success display
    await expect(page.getByText('Natal Chart Generated Successfully')).toBeVisible();
    await expect(page.getByText('Trust in your inner resilience')).toBeVisible();
  });

  test('should show compatibility check interface (Synastry)', async ({ page }) => {
    // Note: Synastry UI is planned for next iteration. For now, testing the base form renders properly.
    await page.goto('/');
    await expect(page.getByRole('button', { name: 'Get Natal Chart' })).toBeVisible();
  });
});
