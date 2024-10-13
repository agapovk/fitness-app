"use client";

import type { Category, Workout } from "@prisma/client";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";

type Props = {
  categories: Category[];
  workouts: (Workout & { category: Category })[];
};
export default function Homepage({ categories, workouts }: Props) {
  const [selectedCategory, setSelectedCategory] = React.useState(
    categories[0]?.id,
  );

  const currentWorkouts = workouts.filter(
    (workout) => workout.categoryId === selectedCategory,
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            onClick={() => setSelectedCategory(category.id)}
            className="flex items-center space-x-2 whitespace-nowrap"
          >
            <span>{category.name}</span>
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {currentWorkouts.map((workout, index) => (
          <Link
            href={`/workouts/${workout.id}`}
            key={index}
            className="hover:opacity-60"
          >
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <Image
                  src="placeholder.svg"
                  alt={workout.name}
                  width={100}
                  height={100}
                  className="h-32 w-full object-cover"
                />
                <div className="p-2">
                  <h3 className="text-center text-sm font-medium">
                    {workout.name}
                  </h3>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
