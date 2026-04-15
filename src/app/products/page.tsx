import React from "react";
import { ProductI, subcategoryI } from "@/types/cart.type";
import Image from "next/image";
import { RefreshCw, Eye, Star, X, Tag } from "lucide-react";
import { CardDescription } from "@/components/ui/card";
import Link from "next/link";
import AddToCartBtn from "@/components/cart/AddToCartBtn";
import {
  getAllProducts,
  getSubcategoryById,
  getProductsBySubcategory,
  getCategoryById,
  getProductsByBrand,
  getBrandById,
} from "@/services/product.services";
import { BrandI } from "@/types/product.type";
import AddToWishlistBtn from "@/components/wishlist/AddToWishlistBtn";

export default async function Products({
  searchParams,
}: {
  searchParams: Promise<{
    subcategory?: string;
    category?: string;
    brand?: string;
  }>;
}) {
  const { subcategory, category, brand } = await searchParams;

  const [data, subCatData, catData, brandData] = await Promise.all([
    subcategory
      ? getProductsBySubcategory(subcategory)
      : brand
        ? getProductsByBrand(brand)
        : getAllProducts(category),
    subcategory ? getSubcategoryById(subcategory) : null,
    category ? getCategoryById(category) : null,
    brand ? getBrandById(brand) : null,
  ]);

  const products: ProductI[] = Array.isArray(data.data) ? data.data : [];
  const subCategory: subcategoryI | null = subCatData ?? null;
  const categoryData: BrandI | null = catData ?? null;
  const brandInfo: BrandI | null = brandData ?? null;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => {
      const full = i < Math.floor(rating);
      const half = !full && i < rating;
      return (
        <div key={i} className="relative w-4.5 h-4.5">
          <Star className="w-4.5 h-4.5 text-[#fdc700] fill-none absolute top-0 left-0" />
          {(full || half) && (
            <div
              className={`absolute top-0 left-0 overflow-hidden ${half ? "w-1/2" : "w-full"}`}
            >
              <Star className="w-4.5 h-4.5 text-[#fdc700] fill-[#fdc700]" />
            </div>
          )}
        </div>
      );
    });
  };

  const activeFilterName =
    subCategory?.name ?? categoryData?.name ?? brandInfo?.name ?? null;
  const headerTitle =
    subCategory?.name ??
    categoryData?.name ??
    brandInfo?.name ??
    "All Products";
  const headerDesc = subCategory?.name
    ? `Browse products in ${subCategory.name}`
    : categoryData?.name
      ? `Browse products in ${categoryData.name}`
      : brandInfo?.name
        ? `Shop ${brandInfo.name} products`
        : "Explore our complete product collection";

  return (
    <main className="bg-gray-50/50">
      {/* Header Banner */}
      <div className="bg-linear-to-br from-[#16a34a] via-[#22c55e] to-[#4ade80] text-white">
        <div className="container mx-auto px-4 py-10 sm:py-14">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/70 mb-6 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="text-white/40">/</span>
            {subcategory && subCategory ? (
              <>
                <Link
                  href="/categories"
                  className="hover:text-white transition-colors"
                >
                  Categories
                </Link>
                <span className="text-white/40">/</span>
                <span className="text-white font-medium">
                  {subCategory.name}
                </span>
              </>
            ) : category && categoryData ? (
              <>
                <Link
                  href="/categories"
                  className="hover:text-white transition-colors"
                >
                  Categories
                </Link>
                <span className="text-white/40">/</span>
                <span className="text-white font-medium">
                  {categoryData.name}
                </span>
                <span className="text-white/40">/</span>
                <span className="text-white font-medium">
                  {categoryData.name}
                </span>
              </>
            ) : brand && brandInfo ? (
              <>
                <Link
                  href="/brands"
                  className="hover:text-white transition-colors"
                >
                  Brands
                </Link>
                <span className="text-white/40">/</span>
                <span className="text-white font-medium">{brandInfo.name}</span>
              </>
            ) : (
              <span className="text-white font-medium">All Products</span>
            )}
          </nav>

          {/* Title */}
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl ring-1 ring-white/30 overflow-hidden">
              {brand && brandInfo?.image ? (
                <Image
                  src={brandInfo.image}
                  alt={brandInfo.name}
                  width={70}
                  height={70}
                  className="w-22 h-14 object-cover p-3.5"
                />
              ) : category && categoryData?.image ? (
                <Image
                  src={categoryData.image}
                  alt={categoryData.name}
                  width={70}
                  height={70}
                  className="w-19.5 h-19.5 object-cover p-3.5"
                />
              ) : subcategory ? (
                <svg
                  viewBox="0 0 576 512"
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                >
                  <path d="M88.7 223.8L0 375.8 0 96C0 60.7 28.7 32 64 32l117.5 0c17 0 33.3 6.7 45.3 18.7l26.5 26.5c12 12 28.3 18.7 45.3 18.7L416 96c35.3 0 64 28.7 64 64l0 32-336 0c-22.8 0-43.8 12.1-55.3 31.8zm27.6 16.1C122.1 230 132.6 224 144 224l400 0c11.5 0 22 6.1 27.6 16.1s5.8 22.2-.1 32.1l-112 192C453.9 474 443.4 480 432 480L32 480c-11.5 0-22-6.1-27.6-16.1s-5.8-22.2 .1-32.1l112-192z" />
                </svg>
              ) : (
                <svg
                  viewBox="0 0 640 512"
                  className="w-9 h-9 text-white"
                  fill="currentColor"
                >
                  <path d="M560.3 237.2c10.4 11.8 28.3 14.4 41.8 5.5 14.7-9.8 18.7-29.7 8.9-44.4l-48-72c-2.8-4.2-6.6-7.7-11.1-10.2L351.4 4.7c-19.3-10.7-42.8-10.7-62.2 0L88.8 116c-5.4 3-9.7 7.4-12.6 12.8L27.7 218.7c-12.6 23.4-3.8 52.5 19.6 65.1l33 17.7 0 53.3c0 23 12.4 44.3 32.4 55.7l176 99.7c19.6 11.1 43.5 11.1 63.1 0l176-99.7c20.1-11.4 32.4-32.6 32.4-55.7l0-117.5zm-240-9.8L170.2 144 320.3 60.6 470.4 144 320.3 227.4zm-41.5 50.2l-21.3 46.2-165.8-88.8 25.4-47.2 161.7 89.8z" />
                </svg>
              )}
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                {headerTitle}
              </h1>
              <p className="text-white/80 mt-1">{headerDesc}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Active Filter */}
        {activeFilterName && (
          <div className="flex items-center gap-3 mb-4">
            <span className="text-sm text-[#4a5565] font-medium flex items-center gap-1">
              <svg
                viewBox="0 0 576 512"
                className="w-4 h-4"
                fill="currentColor"
              >
                <path d="M3.9 22.9C10.5 8.9 24.5 0 40 0l496 0c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L396.4 195.6C316.2 212.1 256 283 256 368c0 27.4 6.3 53.4 17.5 76.5c-1.6-.8-3.2-1.8-4.7-2.9l-64-48c-8.1-6-12.8-15.5-12.8-25.6l0-79.1L9 65.3C-.7 53.4-3 36.8 3.9 22.9z" />
              </svg>
              Active Filters:
            </span>
            <Link
              href="/products"
              className="hover:text-green-900 transition-colors ml-1"
            >
              <span
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  brandInfo
                    ? "bg-violet-100 text-violet-700 hover:bg-violet-200"
                    : "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                }`}
              >
                {brandInfo ? (
                  <svg
                data-prefix="fas"
                data-icon="tags"
                className="svg-inline--fa fa-tags h-3 w-3.75"
                role="img"
                viewBox="0 0 576 512"
                aria-hidden="true"
              >
                <path
                  fill="currentColor"
                  d="M401.2 39.1L549.4 189.4c27.7 28.1 27.7 73.1 0 101.2L393 448.9c-9.3 9.4-24.5 9.5-33.9 .2s-9.5-24.5-.2-33.9L515.3 256.8c9.2-9.3 9.2-24.4 0-33.7L367 72.9c-9.3-9.4-9.2-24.6 .2-33.9s24.6-9.2 33.9 .2zM32.1 229.5L32.1 96c0-35.3 28.7-64 64-64l133.5 0c17 0 33.3 6.7 45.3 18.7l144 144c25 25 25 65.5 0 90.5L285.4 418.7c-25 25-65.5 25-90.5 0l-144-144c-12-12-18.7-28.3-18.7-45.3zm144-85.5a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"
                ></path>
              </svg>
                ) : (
                  <svg
                    data-prefix="fas"
                    data-icon="layer-group"
                    className="svg-inline--fa fa-layer-group h-3 w-3.75"
                    role="img"
                    viewBox="0 0 512 512"
                    aria-hidden="true"
                  >
                    <path
                      fill="currentColor"
                      d="M232.5 5.2c14.9-6.9 32.1-6.9 47 0l218.6 101c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L13.9 149.8C5.4 145.8 0 137.3 0 128s5.4-17.9 13.9-21.8L232.5 5.2zM48.1 218.4l164.3 75.9c27.7 12.8 59.6 12.8 87.3 0l164.3-75.9 34.1 15.8c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L13.9 277.8C5.4 273.8 0 265.3 0 256s5.4-17.9 13.9-21.8l34.1-15.8zM13.9 362.2l34.1-15.8 164.3 75.9c27.7 12.8 59.6 12.8 87.3 0l164.3-75.9 34.1 15.8c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L13.9 405.8C5.4 401.8 0 393.3 0 384s5.4-17.9 13.9-21.8z"
                    ></path>
                  </svg>
                )}
                {activeFilterName}
                <X className="h-4 w-4" />
              </span>
            </Link>
            
            <Link
              href="/products"
              className="text-sm text-gray-500 hover:text-gray-700 underline"
            >
              Clear all
            </Link>
          </div>
        )}

        <p className="text-gray-500 text-sm mb-6">
          Showing {products.length} products
        </p>

        {/* Empty State */}
        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
              <svg
                viewBox="0 0 640 512"
                className="w-9 h-9 text-gray-400"
                fill="currentColor"
              >
                <path d="M560.3 237.2c10.4 11.8 28.3 14.4 41.8 5.5 14.7-9.8 18.7-29.7 8.9-44.4l-48-72c-2.8-4.2-6.6-7.7-11.1-10.2L351.4 4.7c-19.3-10.7-42.8-10.7-62.2 0L88.8 116c-5.4 3-9.7 7.4-12.6 12.8L27.7 218.7c-12.6 23.4-3.8 52.5 19.6 65.1l33 17.7 0 53.3c0 23 12.4 44.3 32.4 55.7l176 99.7c19.6 11.1 43.5 11.1 63.1 0l176-99.7c20.1-11.4 32.4-32.6 32.4-55.7l0-117.5zm-240-9.8L170.2 144 320.3 60.6 470.4 144 320.3 227.4zm-41.5 50.2l-21.3 46.2-165.8-88.8 25.4-47.2 161.7 89.8z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-800">
              No Products Found
            </h2>
            <p className="text-gray-500 text-sm">
              No products match your current filters.
            </p>
            <Link
              href="/products"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
            >
              View All Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {products.map((product) => (
              <React.Fragment key={product._id}>
                <div className="bg-white rounded-lg border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col">
                  <div className="relative w-full aspect-square">
                    {product.priceAfterDiscount !== undefined && (
                      <div className="absolute top-3 left-3 bg-red-500 text-white text-[12px] font-medium px-2 py-1 rounded z-10">
                        -
                        {Math.round(
                          (1 - product.priceAfterDiscount / product.price) *
                            100,
                        )}
                        %
                      </div>
                    )}
                    <Image
                      src={product.imageCover}
                      alt={product.title}
                      fill
                      quality={100}
                      className="object-contain"
                    />
                    <div className="absolute top-3 right-3 flex flex-col gap-2">
                      <AddToWishlistBtn prodId={product._id} />
                      <button className="w-8 h-8 cursor-pointer rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center transition-colors hover:[&>svg]:text-[#16a34a]">
                        <RefreshCw
                          size={17}
                          className="text-[#4a5565] transition-colors"
                        />
                      </button>
                      <Link href={`/products/${product._id}`}>
                        <button className="w-8 h-8 cursor-pointer rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center transition-colors hover:[&>svg]:text-[#16a34a]">
                          <Eye
                            size={17}
                            className="text-[#4a5565] transition-colors"
                          />
                        </button>
                      </Link>
                    </div>
                  </div>
                  <div className="p-3 flex flex-col gap-1 flex-1">
                    <p className="text-[#6a7282] font-medium text-[12px]">
                      {product.category?.name}
                    </p>
                    <Link href={`/products/${product._id}`}>
                      <h3
                        className="text-[16px] font-medium text-[#364153] line-clamp-2 hover:text-[#15803d] transition-colors cursor-pointer"
                        title={product.title}
                      >
                        {product.title}
                      </h3>
                    </Link>
                    <CardDescription className="flex items-center gap-1.5">
                      <div className="flex items-center gap-0.5">
                        {renderStars(product.ratingsAverage)}
                      </div>
                      <span className="text-[#6a7282] text-[11px] font-medium">
                        {product.ratingsAverage} ({product.ratingsQuantity})
                      </span>
                    </CardDescription>
                    <div className="flex items-center justify-between mt-auto pt-2">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[18px] font-bold ${product.priceAfterDiscount !== undefined ? "text-[#16a34a]" : "text-[#1e2939]"}`}
                        >
                          {product.priceAfterDiscount !== undefined
                            ? product.priceAfterDiscount
                            : product.price}{" "}
                          EGP
                        </span>
                        {product.priceAfterDiscount !== undefined && (
                          <span className="text-[14px] font-medium text-[#6a7282] line-through">
                            {product.price} EGP
                          </span>
                        )}
                      </div>
                      <AddToCartBtn prodId={product._id} />
                    </div>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        )}
      </div>

      {/* Features Bar */}
      <div className="bg-green-50 border-y border-green-100">
        <div className="container mx-auto px-4 py-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
                <svg
                  viewBox="0 0 576 512"
                  className="w-5 h-5 text-[#16a34a]"
                  fill="currentColor"
                >
                  <path d="M0 96C0 60.7 28.7 32 64 32l288 0c35.3 0 64 28.7 64 64l0 32 50.7 0c17 0 33.3 6.7 45.3 18.7L557.3 192c12 12 18.7 28.3 18.7 45.3L576 384c0 35.3-28.7 64-64 64l-3.3 0c-10.4 36.9-44.4 64-84.7 64s-74.2-27.1-84.7-64l-102.6 0c-10.4 36.9-44.4 64-84.7 64s-74.2-27.1-84.7-64L64 448c-35.3 0-64-28.7-64-64L0 96zM512 288l0-50.7-45.3-45.3-50.7 0 0 96 96 0zM192 424a40 40 0 1 0 -80 0 40 40 0 1 0 80 0zm232 40a40 40 0 1 0 0-80 40 40 0 1 0 0 80z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-sm">
                  Free Shipping
                </h4>
                <p className="text-gray-500 text-xs">On orders over 500 EGP</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
                <svg
                  viewBox="0 0 512 512"
                  className="w-4.5 h-4.5 text-[#16a34a]"
                  fill="currentColor"
                >
                  <path d="M256 64c-56.8 0-107.9 24.7-143.1 64l47.1 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 192c-17.7 0-32-14.3-32-32L0 32C0 14.3 14.3 0 32 0S64 14.3 64 32l0 54.7C110.9 33.6 179.5 0 256 0 397.4 0 512 114.6 512 256S397.4 512 256 512c-87 0-163.9-43.4-210.1-109.7-10.1-14.5-6.6-34.4 7.9-44.6s34.4-6.6 44.6 7.9c34.8 49.8 92.4 82.3 157.6 82.3 106 0 192-86 192-192S362 64 256 64z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-sm">
                  Easy Returns
                </h4>
                <p className="text-gray-500 text-xs">14-day return policy</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
                <svg
                  viewBox="0 0 512 512"
                  className="w-4.5 h-4.5 text-[#16a34a]"
                  fill="currentColor"
                >
                  <path d="M256 0c4.6 0 9.2 1 13.4 2.9L457.8 82.8c22 9.3 38.4 31 38.3 57.2-.5 99.2-41.3 280.7-213.6 363.2-16.7 8-36.1 8-52.8 0-172.4-82.5-213.1-264-213.6-363.2-.1-26.2 16.3-47.9 38.3-57.2L242.7 2.9C246.9 1 251.4 0 256 0zm0 66.8l0 378.1c138-66.8 175.1-214.8 176-303.4l-176-74.6 0 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-sm">
                  Secure Payment
                </h4>
                <p className="text-gray-500 text-xs">100% secure checkout</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
                <svg
                  viewBox="0 0 448 512"
                  className="w-4.5 h-4.5 text-[#16a34a]"
                  fill="currentColor"
                >
                  <path d="M224 64c-79 0-144.7 57.3-157.7 132.7 9.3-3 19.3-4.7 29.7-4.7l16 0c26.5 0 48 21.5 48 48l0 96c0 26.5-21.5 48-48 48l-16 0c-53 0-96-43-96-96l0-64C0 100.3 100.3 0 224 0S448 100.3 448 224l0 168.1c0 66.3-53.8 120-120.1 120l-87.9-.1-32 0c-26.5 0-48-21.5-48-48s21.5-48 48-48l32 0c26.5 0 48 21.5 48 48l0 0 40 0c39.8 0 72-32.2 72-72l0-20.9c-14.1 8.2-30.5 12.8-48 12.8l-16 0c-26.5 0-48-21.5-48-48l0-96c0-26.5 21.5-48 48-48l16 0c10.4 0 20.3 1.6 29.7 4.7-13-75.3-78.6-132.7-157.7-132.7z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-sm">
                  24/7 Support
                </h4>
                <p className="text-gray-500 text-xs">Contact us anytime</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
