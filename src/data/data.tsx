import { db } from "@/server/db";

// GET ALL CATEGORIES
export const getCategories = async () => {
  const categories = await db.category.findMany({
    include: {
      workouts: true,
    },
  });
  if (!categories) return [];
  return categories;
};

// GET ALL WORKOUTS
export const getWorkouts = async () => {
  const workouts = await db.workout.findMany({
    include: {
      category: true,
      exercises: true,
    },
  });
  if (!workouts) return [];
  return workouts;
};

// GET SINGLE WORKOUT
export const getWorkout = async (id: string) => {
  const workout = await db.workout.findUnique({
    where: {
      id,
    },
    include: {
      category: true,
      exercises: true,
    },
  });
  if (!workout) return null;
  return workout;
};

// GET ALL EXERCISES
export const getExercises = async () => {
  const exercises = await db.exercise.findMany({
    where: {},
    include: {
      workouts: true,
    },
  });
  if (!exercises) return [];
  return exercises;
};
