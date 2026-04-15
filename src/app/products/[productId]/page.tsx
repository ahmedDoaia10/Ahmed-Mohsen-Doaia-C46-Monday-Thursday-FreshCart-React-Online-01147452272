
import { ProductI } from "@/types/product.type";
import ProductDetailsClient from "./ProductDetailsClient";
import { getAllProducts } from "@/services/product.services";


export default async function ProductDetails({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  console.log(productId);

  const response = await fetch(`${process.env.BASE_URL}/products/${productId}`, {
    cache: "no-store",
  });
  const data = await response.json();
  const products: ProductI = data.data;
  // console.log(products);
  const related = await getAllProducts(products.category._id)
  const relatedProducts: ProductI[] = related.data
  



   return <ProductDetailsClient product={products} relatedProducts={relatedProducts} />;

}
