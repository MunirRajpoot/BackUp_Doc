import Cookies from "js-cookie";

/**
 * Retrieves the authentication token from cookies.
 * @returns {string | null} The auth token if available, otherwise null.
 */
export const getAuthToken = () => Cookies.get("auth_token") ?? null;

/**
 * Removes the authentication token from cookies.
 */
export const delAuthToken = (name) => Cookies.remove(name);