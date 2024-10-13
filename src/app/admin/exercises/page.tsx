import { getCategories, getExercises, getWorkouts } from "@/data/data";

import React from "react";
import ExercisesList from "./components/ExercisesList";
import AdminNav from "../components/AdminNav";

export default async function AdminExercisePage() {
  const exercises = await getExercises();
  const workouts = await getWorkouts();
  const categories = await getCategories();

  return (
    <div className="flex flex-col gap-4">
      <AdminNav />
      <ExercisesList
        exercises={exercises}
        workouts={workouts}
        categories={categories}
      />
    </div>
  );
  return;
}
