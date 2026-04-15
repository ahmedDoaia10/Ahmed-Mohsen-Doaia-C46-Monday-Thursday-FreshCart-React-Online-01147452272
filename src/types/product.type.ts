export interface ProductI {
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  priceAfterDiscount?: number;
  imageCover: string;
  images: string[]; 
  category: BrandI;
  brand?: BrandI; 
  subcategory: BrandI;
  ratingsAverage: number;
  ratingsQuantity: number;
  sold: number;
  createdAt: string;
  updatedAt: string;
}

export interface BrandI {
  _id: string;
  name: string;
  slug: string;
  image: string;
}


export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
}


export interface AuthResponse {
  message: string;
  user: User;
  token: string;
}


export interface AddressI {
  _id: string;
  name: string;
  details: string;
  phone: string;
  city: string;
}

// export interface ApiResponse<T> {
//   data: T;
//   results?: number;
//   metadata?: {
//     currentPage: number;
//     numberOfPages: number;
//     limit: number;
//     nextPage?: number;
//   };
// }