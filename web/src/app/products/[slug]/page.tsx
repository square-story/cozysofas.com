'use client';

import { useParams } from 'next/navigation';
import { ProductPageClient } from "@/components/product-page-client";

export default function Page() {
  const params = useParams();
  const slug = params.slug as string;
  
  return <ProductPageClient slug={slug} />;
}
