import axios from 'axios'

export const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    'http://localhost:8080/api',

  headers: {
    'Content-Type': 'application/json',
  },
})

export const productApi = {
  getAll() {
    return api.get('/products')
  },

  getById(productId) {
    return api.get(`/products/${productId}`)
  },

  getNewArrivals() {
    return api.get('/products/new-arrivals')
  },

  getTopSelling() {
    return api.get('/products/top-selling')
  },
}