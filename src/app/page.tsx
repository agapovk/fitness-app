import Homepage from "@/components/Homepage";
import { getCategories, getWorkouts } from "@/data/data";

export default async function Page() {
  const categories = await getCategories();
  const workouts = await getWorkouts();

  return <Homepage categories={categories} workouts={workouts} />;
}
