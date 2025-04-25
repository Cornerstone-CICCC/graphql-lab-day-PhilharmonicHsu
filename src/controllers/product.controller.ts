import { Product } from '../models/product.model'
import { IProduct } from '../types'

// Get all products
const getProducts = async () => {
  const products = await Product.find()

  return products
}

// Create product
const createProduct = async (data: Omit<IProduct, 'id'>) => {
  const product = new Product(data)

  return await product.save()
}

// Find product by id
const getProductById = async (id: string) => {
  return await Product.findById(id)
}

// Update product
const updateProduct = async (id: string, data: Partial<IProduct>) => {
  return await Product.findByIdAndUpdate(id, data, { new: true })
}

// Delete product
const deleteProduct = async (id: string) => {
  return await Product.findByIdAndDelete(id)
}

export default {
    getProducts,
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct
}