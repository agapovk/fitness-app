import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getWorkout } from "@/data/data";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  params: {
    id: string;
  };
};
export default async function WorkoutPage({ params }: Props) {
  const workout = await getWorkout(params.id);

  if (!workout)
    return (
      <div className="flex flex-col gap-4">
        <p>Workout not found</p>
        <Link href="/">
          <Button variant="default">Go back</Button>
        </Link>
      </div>
    );

  return (
    <>
      <div className="flex items-center justify-between pb-4">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="outline" className="h-8 w-8 p-0">
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
          </Link>
          <h2 className="text-xl text-muted-foreground">{workout.name}</h2>
        </div>
        <Badge>{workout.category.name}</Badge>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {workout.exercises.map((exercise) => (
          <Card key={exercise.id} className="overflow-hidden">
            <CardContent className="p-0">
              <Image
                src={exercise.image}
                alt={workout.name}
                width={100}
                height={100}
                className="aspect-square w-full object-cover"
              />
              <div className="space-y-1 p-2">
                <h3 className="text-md text-center font-medium">
                  {exercise.name}
                </h3>
                <p className="text-center text-sm text-muted-foreground">
                  {exercise.description}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
