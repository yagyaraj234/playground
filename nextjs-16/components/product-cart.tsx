import { getProducts } from "@/api/product";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProductListSkeleton } from "@/components/product-skeleton";
import Image from "next/image";
import { Suspense } from "react";
import { productCategories } from "@/api/data";
import { cacheLife, cacheTag, revalidateTag } from "next/cache";

// Star rating component
function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-1">
      {/* Full stars */}
      {Array.from({ length: fullStars }).map((_, i) => (
        <svg
          key={`full-${i}`}
          className="w-4 h-4 fill-yellow-400 text-yellow-400"
          viewBox="0 0 24 24"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}

      {/* Half star */}
      {hasHalfStar && (
        <svg className="w-4 h-4 text-yellow-400" viewBox="0 0 24 24">
          <defs>
            <linearGradient id="half-star" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <path
            fill="url(#half-star)"
            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
          />
        </svg>
      )}

      {/* Empty stars */}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <svg
          key={`empty-${i}`}
          className="w-4 h-4 text-gray-300"
          viewBox="0 0 24 24"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}

      <span className="ml-1 text-sm text-muted-foreground">({rating})</span>
    </div>
  );
}

// Products display component
async function ProductsList({ type }: { type: string }) {
  try {
    const products = await getProducts(type);

    return (
      <div className="w-full max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight mb-2">
            {productCategories[type as keyof typeof productCategories].name}
          </h2>
          <p className="text-muted-foreground text-lg">
            {
              productCategories[type as keyof typeof productCategories]
                .description
            }
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {products.map((product: any) => (
            <Card
              key={product.id}
              className="group overflow-hidden border-0 py-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white dark:bg-gray-900"
            >
              <CardHeader className="p-0">
                <div className="aspect-4/3 relative overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    priority
                    unoptimized
                    className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
                </div>
              </CardHeader>

              <CardContent className="p-3">
                <div className="mb-2">
                  <span className="inline-block px-2 py-0.5 text-xs font-medium bg-secondary text-secondary-foreground rounded-full">
                    {product.category}
                  </span>
                </div>

                <CardTitle className="text-base font-semibold leading-tight mb-1.5 line-clamp-2 group-hover:text-primary transition-colors">
                  {product.title}
                </CardTitle>

                <p className="text-muted-foreground text-xs line-clamp-2 mb-2">
                  {product.description}
                </p>

                <div className="flex items-center justify-between">
                  <StarRating rating={product.rating?.rate || 0} />
                </div>
              </CardContent>

              <CardFooter className="p-3 pt-0 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-primary">
                    ${product.price}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Free shipping
                  </span>
                </div>

                <button className="inline-flex items-center justify-center rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground shadow hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 transition-colors">
                  Add to Cart
                </button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="text-6xl mb-4">⚠️</div>
          <h3 className="text-xl font-semibold mb-2">
            Failed to Load Products
          </h3>
          <p className="text-muted-foreground mb-4">
            We encountered an error while loading the products. Please try again
            later.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }
}

("use cache");
cacheTag("product-cart");
cacheLife("hours");
export default function ProductCart({ type = "clothing" }: { type: string }) {
  return (
    <Suspense fallback={<ProductListSkeleton />}>
      <ProductsList type={type} />
    </Suspense>
  );
}

// export function AddNewProduct({ product }: { product: any }) {
//   'use server';
//   async function handleAddToCart() {
//     await addNewProduct(product);
//     revalidateTag("skin-care-products");
//   }

//   return (
//     <button
//       onClick={handleAddToCart}
//       className="bg-blue-500 text-white px-4 py-2 rounded-md"
//     >
//       Add to Cart
//     </button>
//   );
// }
