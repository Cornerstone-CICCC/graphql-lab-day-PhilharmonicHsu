import { Order } from '../models/order.model'
import { IOrder } from '../types'

// Get all orders
const getOrders = async () => {
  const orders = await Order.find()

  return orders
}

// Create order
const createOrder = async (data: Omit<IOrder, 'id'>) => {
  const order = new Order(data)

  return await order.save()
}

// Update order
const updateOrder = async (id: string, data: Partial<IOrder>) => {
  return await Order.findByIdAndUpdate(id, data, { new: true })
}

// Delete order
const deleteOrder = async (id: string) => {
  return await Order.findByIdAndDelete(id)
}

export default {
    getOrders,
    createOrder,
    updateOrder,
    deleteOrder
}