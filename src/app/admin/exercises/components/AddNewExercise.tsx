"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createExercise } from "@/app/actions";
import { Checkbox } from "@/components/ui/checkbox";
import type { Category, Workout } from "@prisma/client";
import { toast } from "sonner";
import { UploadButton } from "@/utils/uploadthing";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import React from "react";

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  description: z.string().min(1, {
    message: "Description must be at least 1 characters.",
  }),
  workouts: z.string().array(),
  image: z.string({
    message: "Загрузите изображение",
  }),
});

type Props = {
  categories: Category[];
  workouts: (Workout & { category: Category })[];
  setOpen: (state: boolean) => void;
};
export default function AddNewExercise({
  setOpen,
  workouts,
  categories,
}: Props) {
  const [filter, setFilter] = React.useState<string[]>(
    categories.map((c) => c.id),
  );

  const filteredWorkouts = workouts.filter((workout) => {
    return filter.includes(workout.category.id);
  });

  // 1. Define a form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      workouts: [],
      image: undefined,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    try {
      const newExercise = await createExercise(values);
      console.log(newExercise);
      setOpen(false);
      toast(values.name, {
        description: "New exercise has been created",
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Card className="border-none shadow-none">
          <CardHeader className="flex flex-row items-center justify-between p-0 pb-3">
            <div>
              <CardTitle className="text-sm font-medium leading-none">
                Workouts
              </CardTitle>
              <CardDescription />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <MixerHorizontalIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {categories.map((category) => (
                  <DropdownMenuCheckboxItem
                    key={category.id}
                    className="capitalize"
                    checked={filter.includes(category.id)}
                    onCheckedChange={() => {
                      setFilter((prev) =>
                        prev.includes(category.id)
                          ? prev.filter((item) => item !== category.id)
                          : [...filter, category.id],
                      );
                    }}
                  >
                    {category.name}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </CardHeader>
          <CardContent className="flex max-h-96 flex-col gap-2 overflow-scroll rounded-md border p-4">
            {filteredWorkouts.map((workout) => (
              <FormField
                key={workout.id}
                control={form.control}
                name="workouts"
                render={({ field }) => {
                  return (
                    <FormItem
                      key={workout.id}
                      className="flex flex-row items-start space-x-3 space-y-0"
                    >
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(workout.id)}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...field.value, workout.id])
                              : field.onChange(
                                  field.value?.filter(
                                    (value) => value !== workout.id,
                                  ),
                                );
                          }}
                        />
                      </FormControl>
                      <FormLabel className="flex items-center gap-4 font-normal">
                        {workout.name}
                        <Badge variant="outline" className="font-normal">
                          {workout.category.name}
                        </Badge>
                      </FormLabel>
                    </FormItem>
                  );
                }}
              />
            ))}
          </CardContent>
        </Card>

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start gap-2">
              <FormLabel>Image/Gif</FormLabel>
              <FormControl>
                <UploadButton
                  className="ut-button:h-10 ut-button:bg-primary"
                  endpoint="imageUploader"
                  content={{
                    button({ ready }) {
                      if (ready) return "Загрузить";
                      return "Подготовка...";
                    },
                  }}
                  onClientUploadComplete={(res) => {
                    // Do something with the response
                    field.onChange(res[0]?.url);
                    toast("Upload Completed", {
                      description: "Image has been uploaded",
                    });
                  }}
                  onUploadError={(error: Error) => {
                    // Do something with the error.
                    alert(`ERROR! ${error.message}`);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Сохранить</Button>
      </form>
    </Form>
  );
}
