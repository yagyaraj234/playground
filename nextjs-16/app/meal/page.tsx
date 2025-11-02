import { getMeals } from "@/api/meals";
import { MealCard } from "./_component/meal-card";
import { Suspense } from "react";
import Image from "next/image";

interface Meal {
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
}

export async function Meals() {
  const mealsData = await getMeals("rice");
  const meals: Meal[] = mealsData.data || [];

  return (
    <>
      {meals.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No meals found. Try a different search term.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {meals.map((meal) => (
            <MealCard key={meal.idMeal} meal={meal} />
          ))}
        </div>
      )}
    </>
  );
}

export default async function MealPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Meal Recipes
          </h1>
          <p className="text-gray-600">
            Discover delicious recipes from around the world
          </p>
        </div>

        <Image
          src="https://t4.ftcdn.net/jpg/06/73/46/63/240_F_673466372_tYHPh7KrN0mff3Fl7x43ag02fm4D2EtR.jpg"
          alt="Meal"
          width={400}
          height={150}
          className="w-full h-full "
        />
        <Suspense fallback={<div>Loading...</div>}>
          <Meals />
        </Suspense>
      </div>
    </div>
  );
}
