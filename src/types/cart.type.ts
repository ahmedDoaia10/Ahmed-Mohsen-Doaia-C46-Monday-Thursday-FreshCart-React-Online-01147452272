export interface ProductI {
  _id: string;
  id: string;
  title: string;
  slug: string;
  imageCover: string;
  quantity: number;
  price: number;
  priceAfterDiscount?: number; 
  ratingsAverage: number;
  ratingsQuantity?: number;    
  brand: brandI;
  category: categoryI;
  subcategory: subcategoryI[];
}

export interface cartDataI {
  _id: string;
  cartOwner: string;
  products: cartProductI[];
  totalCartPrice: number;
  createdAt:string;
  updatedAt:string;
 __v: number;
}

export interface cartProductI {
  _id: string;
  product: ProductI;
  count: number;
  price: number;
}

export interface CartI {
  status: string;
  message: string;
  numOfCartItems: number;
  data: cartDataI;
  cartId: string;
}


export interface brandI {
  _id: string;
  name:string;
  slug: string;
  image: string;
}

export interface categoryI {
  _id: string;
  name:string;
  slug: string;
  image: string;
}


export interface subcategoryI {
  _id: string;
  name:string;
  slug: string;
  category: string;
}


export interface ShippDataI {
  shippingAddress: {
    details: string;
    phone: number;
    city: string;
    postalCode: number;
  };
}



export interface WishlistProduct {
  _id: string;
  title: string;
  imageCover: string;
  price: number;
  priceAfterDiscount?: number;
  category: { name: string };
}



