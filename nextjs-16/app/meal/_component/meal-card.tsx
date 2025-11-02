import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface MealCardProps {
  meal: {
    idMeal: string;
    strMeal: string;
    strDrinkAlternate: string | null;
    strCategory: string;
    strArea: string;
    strInstructions: string;
    strMealThumb: string;
    strTags: string | null;
    strYoutube: string | null;
    strSource: string | null;
    strImageSource: string | null;
    strCreativeCommonsConfirmed: string | null;
    dateModified: string | null;
    [key: `strIngredient${number}`]: string | null;
    [key: `strMeasure${number}`]: string | null;
  };
}

export function MealCard({ meal }: MealCardProps) {
  // Extract ingredients and measures
  const ingredients: Array<{ ingredient: string; measure: string }> = [];

  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}` as keyof typeof meal];
    const measure = meal[`strMeasure${i}` as keyof typeof meal];

    if (ingredient && ingredient.trim()) {
      ingredients.push({
        ingredient: ingredient.trim(),
        measure: (measure || "").trim(),
      });
    }
  }

  // Parse tags
  const tags = meal.strTags
    ? meal.strTags.split(",").map((tag) => tag.trim())
    : [];

  return (
    <Card className="w-full max-w-4xl mx-auto overflow-hidden">
      <div className="relative w-full h-64 md:h-80">
        <Image
          src={meal.strMealThumb}
          alt={meal.strMeal}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <CardHeader>
        <div className="flex flex-col gap-2">
          <CardTitle className="text-2xl font-bold">{meal.strMeal}</CardTitle>
          <CardDescription className="flex gap-4 text-sm">
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
              {meal.strCategory}
            </span>
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full">
              {meal.strArea}
            </span>
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Ingredients Section */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Ingredients</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {ingredients.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-2 bg-gray-50 rounded-lg"
              >
                <span className="font-medium">{item.ingredient}</span>
                <span className="text-sm text-gray-600">{item.measure}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Instructions Section */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Instructions</h3>
          <div className="text-sm leading-relaxed whitespace-pre-line">
            {meal.strInstructions}
          </div>
        </div>

        {/* Tags Section */}
        {tags.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex flex-wrap gap-4">
        {meal.strYoutube && (
          <Link
            href={meal.strYoutube}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-red-600 hover:text-red-800 font-medium"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
            Watch Recipe
          </Link>
        )}

        {meal.strSource && (
          <Link
            href={meal.strSource}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
            Original Recipe
          </Link>
        )}
      </CardFooter>
    </Card>
  );
}
