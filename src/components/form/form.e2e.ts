import { newE2EPage } from '@stencil/core/testing';

describe('login-form', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<login-form></login-form>');

    const element = await page.find('login-form');
    expect(element).toHaveClass('hydrated');
  });
});
