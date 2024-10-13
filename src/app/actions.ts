"use server";

import { db } from "@/server/db";
import { revalidatePath } from "next/cache";

export const createCategory = async (data: { name: string }) => {
  const category = await db.category.create({
    data,
  });

  console.log(category);
  revalidatePath("/admin");

  return category;
};

export const createWorkout = async (data: {
  name: string;
  categoryId: string;
}) => {
  const workout = await db.workout.create({
    data,
  });

  console.log(workout);
  revalidatePath("/admin");

  return workout;
};

export const createExercise = async (data: {
  name: string;
  workouts: string[];
  image: string;
}) => {
  const { name, workouts, image } = data;
  const exercise = await db.exercise.create({
    data: {
      name,
      image,
      workouts: {
        connect: workouts.map((id) => ({ id })),
      },
    },
  });

  console.log(exercise);
  revalidatePath("/admin");

  return exercise;
};

export const deleteCategory = async (id: string) => {
  const category = await db.category.delete({
    where: {
      id,
    },
  });

  console.log(`${category.name} has been deleted`);
  revalidatePath("/admin");

  return category;
};

export const deleteWorkout = async (id: string) => {
  const workout = await db.workout.delete({
    where: {
      id,
    },
  });

  console.log(`${workout.name} has been deleted`);
  revalidatePath("/admin");

  return workout;
};

export const deleteExercise = async (id: string) => {
  const exercise = await db.exercise.delete({
    where: {
      id,
    },
  });

  console.log(`${exercise.name} has been deleted`);
  revalidatePath("/admin");

  return exercise;
};

export const addWorkoutToExercise = async (
  exerciseId: string,
  workoutId: string,
) => {
  const exercise = await db.exercise.update({
    where: {
      id: exerciseId,
    },
    data: {
      workouts: {
        connect: {
          id: workoutId,
        },
      },
    },
  });

  console.log(exercise);
  revalidatePath("/admin");

  return exercise;
};

export const removeWorkoutFromExercise = async (
  exerciseId: string,
  workoutId: string,
) => {
  const exercise = await db.exercise.update({
    where: {
      id: exerciseId,
    },
    data: {
      workouts: {
        disconnect: {
          id: workoutId,
        },
      },
    },
  });

  console.log(exercise);
  revalidatePath("/admin");

  return exercise;
};
