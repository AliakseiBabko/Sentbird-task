import { Cookie } from '@playwright/test';

/**
 * Serializes an array of cookies into a single string suitable for the 'cookie' header.
 * @param cookies - Array of Cookie objects.
 * @returns Serialized cookie string.
 */
export const serializeCookies = (cookies: Cookie[]): string => {
  return cookies
    .map(cookie => `${cookie.name}=${cookie.value}`)
    .join('; ');
};