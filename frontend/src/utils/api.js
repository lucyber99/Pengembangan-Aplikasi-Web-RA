/**
 * Utility functions for API calls
 */

const getAuthToken = () => {
  // Get token from localStorage (will be set when user logs in)
  return localStorage.getItem('auth_token');
};

const getApiHeaders = () => {
  const headers = {
    'Content-Type': 'application/json',
  };
  
  const token = getAuthToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
};

const apiBase = import.meta.env.VITE_API_BASE || 'http://localhost:6543';

/**
 * Favorites API functions
 */
export const favoritesAPI = {
  /**
   * Get all favorite properties for the current user
   */
  async getFavorites() {
    const response = await fetch(`${apiBase}/api/favorites`, {
      method: 'GET',
      headers: getApiHeaders(),
    });
    
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Unauthorized. Please login first.');
      }
      throw new Error(`Failed to fetch favorites: ${response.statusText}`);
    }
    
    return await response.json();
  },

  /**
   * Add a property to favorites
   */
  async addFavorite(propertyId) {
    const response = await fetch(`${apiBase}/api/favorites/add`, {
      method: 'POST',
      headers: getApiHeaders(),
      body: JSON.stringify({ property_id: propertyId }),
    });
    
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Unauthorized. Please login first.');
      }
      const error = await response.json().catch(() => ({ message: response.statusText }));
      throw new Error(error.message || 'Failed to add favorite');
    }
    
    return await response.json();
  },

  /**
   * Remove a property from favorites
   */
  async removeFavorite(propertyId) {
    const response = await fetch(`${apiBase}/api/favorites/remove/${propertyId}`, {
      method: 'DELETE',
      headers: getApiHeaders(),
    });
    
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Unauthorized. Please login first.');
      }
      throw new Error(`Failed to remove favorite: ${response.statusText}`);
    }
    
    return await response.json();
  },

  /**
   * Check if a property is favorited
   */
  async checkFavorite(propertyId) {
    const response = await fetch(`${apiBase}/api/favorites/check/${propertyId}`, {
      method: 'GET',
      headers: getApiHeaders(),
    });
    
    if (!response.ok) {
      // If unauthorized, return false (not favorited)
      if (response.status === 401) {
        return { success: true, is_favorite: false };
      }
      return { success: true, is_favorite: false };
    }
    
    return await response.json();
  },
};

/**
 * Properties API functions
 */
export const propertiesAPI = {
  /**
   * Get all properties
   */
  async getProperties(filters = {}) {
    const params = new URLSearchParams();
    Object.keys(filters).forEach(key => {
      if (filters[key] !== null && filters[key] !== undefined && filters[key] !== '') {
        params.append(key, filters[key]);
      }
    });
    
    const url = `${apiBase}/api/properties${params.toString() ? '?' + params.toString() : ''}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: getApiHeaders(),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch properties: ${response.statusText}`);
    }
    
    return await response.json();
  },
};

