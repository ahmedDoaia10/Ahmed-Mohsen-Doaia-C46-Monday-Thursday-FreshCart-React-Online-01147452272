import HomeClient from "@/components/home/HomeClient";
import { getAllCategories, getAllProducts } from "@/services/product.services";


export default async function Home() {
  const [categoriesRes, productsRes] = await Promise.all([
    getAllCategories(),
    getAllProducts(),
  ]);

  return (
    <HomeClient
      categories={categoriesRes.data}
      products={productsRes.data}
    />
  );
}