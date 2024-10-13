import { getCategories, getWorkouts } from "@/data/data";
import React from "react";
import WorkoutsList from "./[id]/components/WorkoutsList";
import AdminNav from "../components/AdminNav";

export default async function AdminWorkoutsPage() {
  const workouts = await getWorkouts();
  const categories = await getCategories();

  return (
    <div className="flex flex-col gap-4">
      <AdminNav />
      <WorkoutsList workouts={workouts} categories={categories} />
    </div>
  );
}
