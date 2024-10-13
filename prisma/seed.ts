import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const mobilityCategory = await prisma.category.create({
    data: {
      name: "Mobility",
      workouts: {
        create: [
          {
            name: "Hip opener",
          },
          {
            name: "Core mobility",
          },
        ],
      },
    },
  });

  const activationCategory = await prisma.category.create({
    data: {
      name: "Activation",
      workouts: {
        create: [
          {
            name: "Glute activation",
          },
          {
            name: "Knee stability",
          },
        ],
      },
    },
  });

  const injuryPreventionCategory = await prisma.category.create({
    data: {
      name: "Injury prevention",
      workouts: {
        create: [
          {
            name: "Hamstring",
          },
          {
            name: "Ankle",
          },
        ],
      },
    },
  });

  // Create 3 exercises for each workout

  const deadlift = await prisma.exercise.create({
    data: {
      name: "Deadlift",
      description: "3x10 each",
    },
  });

  const pullup = await prisma.exercise.create({
    data: {
      name: "Pull-Up",
      description: "3x10 each",
    },
  });

  const lunge = await prisma.exercise.create({
    data: {
      name: "Lunge",
      description: "3x10 each",
    },
  });

  const pushdown = await prisma.exercise.create({
    data: {
      name: "Push-Down",
      description: "3x10 each",
    },
  });

  const squat = await prisma.exercise.create({
    data: {
      name: "Squat",
      description: "3x10 each",
    },
  });

  const pushup = await prisma.exercise.create({
    data: {
      name: "Push-Up",
      description: "3x10 each",
    },
  });

  const burpee = await prisma.exercise.create({
    data: {
      name: "Burpee",
      description: "3x10 each",
    },
  });

  const pushpress = await prisma.exercise.create({
    data: {
      name: "Push Press",
      description: "3x10 each",
    },
  });

  console.log(
    mobilityCategory,
    activationCategory,
    injuryPreventionCategory,
    deadlift,
    pullup,
    lunge,
    pushdown,
    squat,
    pushup,
    burpee,
    pushpress,
  );

  console.log("Seed data created!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
