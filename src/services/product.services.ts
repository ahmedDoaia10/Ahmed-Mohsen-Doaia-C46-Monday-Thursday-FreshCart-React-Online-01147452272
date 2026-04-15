export async function getAllProducts(catId?: string) {
  const base = `${process.env.NEXT_PUBLIC_BASE_URL}/products`;

  const url = catId
    ? `${process.env.NEXT_PUBLIC_BASE_URL}/products?category[in]=${catId}`
    : base;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(
      responseData?.message ||
        responseData?.error ||
        "Failed to create account",
    );
  }

  return responseData;
}



export async function getAllCategories() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/categories`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData?.message || "Failed to fetch categories");
  }

  return responseData;
}



export async function getCategoryById(catId: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/categories/${catId}`,
    { cache: "no-store" }
  );
  const data = await response.json();
  return data.data;
}

export async function getSubcategoryById(subCatId: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/subcategories/${subCatId}`,
    { cache: "no-store" }
  );
  const data = await response.json();
  if (!response.ok) throw new Error(data?.message || "Failed to fetch subcategory");
  return data.data;
}





export async function getProductsBySubcategory(subCatId: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/products?subcategory[in]=${subCatId}`,
    { cache: "no-store" }
  );
  const data = await response.json();
  if (!response.ok) throw new Error(data?.message || "Failed to fetch products");
  return data;
}




export async function getAllBrands() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/brands`, {
    cache: "no-store",
  });
  const data = await response.json();
  return data;
}

export async function getBrandById(brandId: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/brands/${brandId}`, {
    cache: "no-store",
  });
  const data = await response.json();
  return data.data;
}

export async function getProductsByBrand(brandId: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/products?brand=${brandId}`,
    { cache: "no-store" }
  );
  const data = await response.json();
  return data;
}