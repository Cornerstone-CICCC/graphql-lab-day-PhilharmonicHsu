import productController from "../controllers/product.controller"
import customerController from "../controllers/customer.controller"
import orderController from "../controllers/order.controller"
import { Order } from "../models/order.model"
import { IOrder, IProduct, ICustomer } from "../types" 

// Finish the resolvers
export const resolvers = {
  Query: {
    products: async () => await productController.getProducts(),
    customers: async () => await customerController.getCustomers(),
    orders: async () => await orderController.getOrders(),
    getProductById: async (_: unknown, {id}: {id: string}) => {
      return await productController.getProductById(id)
    },
    getCustomerById: async (_: unknown, {id}: {id: string}) => {
      return await customerController.getCustomerById(id)
    },
  },
  Product: {
    customers: async (parent: {_id: string}) => {
      const orders = await Order.find({productId: parent._id}).populate("customerId");
      const customers = orders.map(order => order.customerId)

      return customers;
    }
  },
  Customer: {
    products: async (parent: {_id: string}) => {
      const orders = await Order.find({customerId: parent._id}).populate("productId");
      const products = orders.map(order => order.productId)

      return products
    }
  },
  Order: {
    product: async (parent: {_id: string}) => {
      const order = await Order.findById(parent._id).populate("productId")

      return order?.productId
    },
    customer: async (parent: {_id: string}) => {
      const order = await Order.findById(parent._id).populate("customerId")

      return order?.customerId
    }
  },
  Mutation: {
    addProduct: async (_: unknown, {productName, productPrice}: Omit<IProduct, 'id'>) => {
      return await productController.createProduct({ productName, productPrice })
    },
    editProduct: async (_: unknown, {id, productName, productPrice}: IProduct) => {
      return await productController.updateProduct(id, {productName, productPrice})
    },
    removeProduct: async (_: unknown, {id}: {id: string}) => {
      return await productController.deleteProduct(id)
    },

    addCustomer: async (_: unknown, {firstName, lastName, email}: Omit<ICustomer, 'id'>) => {
      return await customerController.createCustomer({firstName, lastName, email})
    },
    editCustomer: async (_: unknown, {id, firstName, lastName, email}: ICustomer) => {
      return await customerController.updateCustomer(id, {firstName, lastName, email});
    },
    removeCustomer: async (_: unknown, {id}: {id: string}) => {
      return await customerController.deleteCustomer(id)
    },

    addOrder: async (_: unknown, {productId, customerId}: Omit<IOrder, 'id'>) => {
      return await orderController.createOrder({productId, customerId})
    },
    editOrder: async (_: unknown, {id, productId, customerId}: IOrder) => {
      return await orderController.updateOrder(id, {productId, customerId})
    },
    removeOrder: async (_: unknown, {id}: {id: string}) => {
      return await orderController.deleteOrder(id)
    }
  }
}
