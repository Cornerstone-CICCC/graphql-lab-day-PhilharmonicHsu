import { Customer } from '../models/customer.model'
import { ICustomer } from '../types'

// Get all customers
const getCustomers = async () => {
  const customers = await Customer.find()

  return customers
}

// Create customer
const createCustomer = async (data: Omit<ICustomer, 'id'>) => {
  const customer = new Customer(data)

  return await customer.save()
}

// Find customer by id
const getCustomerById = async (id: string) => {
  return await Customer.findById(id)
}

// Update customer
const updateCustomer = async (id: string, data: Partial<ICustomer>) => {
  return await Customer.findByIdAndUpdate(id, data, { new: true })
}

// Delete customer
const deleteCustomer = async (id: string) => {
  return await Customer.findByIdAndDelete(id)
}

export default {
    getCustomers,
    createCustomer,
    getCustomerById,
    updateCustomer,
    deleteCustomer
}