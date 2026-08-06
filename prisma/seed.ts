import { hashPassword } from "@/app/lib/auth";
import { prisma } from "@/app/lib/db";
import { Role } from "@/app/types";

async function main() {
  console.log("Starting Database Seed...");
  //create teams
  const teams = await Promise.all([
    prisma.team.create({
      data: {
        name: "Engineering",
        description: "Software Development Team",
        code: "ENG-2026",
      },
    }),
    prisma.team.create({
      data: {
        name: "Marketing",
        description: "Marketing and Sales team",
        code: "MKT-2026",
      },
    }),
    prisma.team.create({
      data: {
        name: "Operations",
        description: "Business Operations Team",
        code: "OPS-2026",
      },
    }),
  ]);

  //create sample users
  const sampleUsers = [
    {
      name: "Chris Developer",
      email: "chris@company.com",
      team: teams[0],
      role: Role.MANAGER,
    },
    {
      name: "Jane Manager",
      email: "jane@company.com",
      team: teams[0],
      role: Role.USER,
    },
    {
      name: "Harry Marketer",
      email: "harry@company.com",
      team: teams[1],
      role: Role.MANAGER,
    },
    {
      name: "Alice Sales",
      email: "alice@company.com",
      team: teams[1],
      role: Role.USER,
    },
  ];

  for (const userData of sampleUsers) {
    await prisma.user.create({
      data: {
        email: userData.email,
        name: userData.name,
        password: await hashPassword("12345"),
        role: userData.role,
        teamId: userData.team.id,
      },
    });
  }
}

main()
  .catch((e) => {
    console.error("seeding failed", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
