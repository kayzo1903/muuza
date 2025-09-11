import ProductEditForm from "@/components/Dashboard/productEditForm";

interface PageProps {
  params: Promise<{ slug : string; productId: string }>;
}

export default async function EditProductPage({ params }: PageProps) {
  const { slug , productId } = await params;
  

  return <ProductEditForm businessId={ slug } productId={productId} />;
}