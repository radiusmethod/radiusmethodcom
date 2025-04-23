/**
 * Base path utility for handling correct path prefixing
 * Works with any type of assets or routes that need the base path prefix in GitHub Pages
 */

/**
 * Gets the application's base path based on environment
 */
export const getBasePath = (): string => {
  return process.env.NEXT_PUBLIC_BASE_PATH || '';
};

/**
 * Adds the base path to any relative path
 * @param path The path to prefix with base path
 * @returns The path with proper base path prefix
 */
export const withBasePath = (path: string): string => {
  const basePath = getBasePath();
  
  // Make sure path starts with a slash
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  // Combine base path with the path
  return `${basePath}${normalizedPath}`;
}; 