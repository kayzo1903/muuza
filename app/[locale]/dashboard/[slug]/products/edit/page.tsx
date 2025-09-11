import { Suspense } from "react";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ productId: string }>;
}

async function getProductData(productId: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/product/${productId}`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        notFound();
      }
      throw new Error("Failed to fetch product");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching product:", error);
    notFound();
  }
}

export default async function EditProductPage({ params }: PageProps) {
  const { productId } = await params;
  const productData = await getProductData(productId);

  return (
    <Suspense fallback={<div>Loading product data...</div>}>
      <ProductEditForm productData={productData} productId={productId} />
    </Suspense>
  );
}