export interface ICustomer {
    id: string
    firstName: String
    lastName: String
    email: String
}

export interface IOrder {
    id: string
    productId: string
    customerId: string
}

export interface IProduct {
    id: string
    productName: String;
    productPrice: Number;
}