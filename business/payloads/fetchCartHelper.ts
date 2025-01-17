import { BrowserContext } from '@playwright/test';
import { fetchCartPayload } from './fetchCart'; // Ensure this path is correct

/**
 * Sends a Cart query to fetch the current user's cart.
 * @param context - The Playwright BrowserContext.
 * @returns The JSON response from the Cart query.
 */
export const fetchCart = async (context: BrowserContext): Promise<any> => {
  // Retrieve all cookies from the context
  const cookies = await context.cookies();

  // Extract individual cookie values
  const datadome = cookies.find(cookie => cookie.name === 'datadome')?.value || '';
  const solvvy_session = cookies.find(cookie => cookie.name === 'solvvy_session')?.value || '';
  const scnt_session_v3 = cookies.find(cookie => cookie.name === 'scnt_session_v3')?.value || '';
  const scnt_locale = cookies.find(cookie => cookie.name === 'scnt_locale')?.value || '';
  const csrfToken = cookies.find(cookie => cookie.name === 'csrfToken')?.value || '';

  // Construct the 'cookie' header
  const cookieHeader = `datadome=${datadome}; solvvy_session=${solvvy_session}; scnt_session_v3=${scnt_session_v3}; scnt_locale=${scnt_locale}`;

  // Send the POST request to fetch the cart
  const response = await context.request.post(`https://api.scentbird.com/graphql?opname=Cart`, {
    headers: {
      'accept': '*/*',
      'accept-encoding': 'gzip, deflate, br, zstd',
      'accept-language': 'en-US,en;q=0.9',
      'content-type': 'application/json',
      'cookie': cookieHeader,
      'x-csrf-token': csrfToken,
      'x-locale': scnt_locale
    },
    data: fetchCartPayload
  });

  // Parse and return the JSON response
  const responseData = await response.json();
  return responseData;
};
