import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { config } from "dotenv";
import { resolve } from "path";

// Load environment variables from .env file
config({ path: resolve(__dirname, "../.env") });

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create default admin user
  const hashedPassword = await bcrypt.hash("Abc@123", 10);

  const adminUser = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      password: hashedPassword,
      name: "Admin User",
    },
  });

  console.log("✅ Created admin user:", adminUser.email);

  // Create some sample shoes
  const shoes = [
    { name: "Air Jordan 1", brand: "Nike" },
    { name: "Yeezy Boost 350", brand: "Adidas" },
    { name: "Chuck Taylor All Star", brand: "Converse" },
  ];

  for (const shoe of shoes) {
    const created = await prisma.shoe.upsert({
      where: { id: `seed-${shoe.name.toLowerCase().replace(/\s/g, "-")}` },
      update: {},
      create: {
        id: `seed-${shoe.name.toLowerCase().replace(/\s/g, "-")}`,
        name: shoe.name,
        brand: shoe.brand,
      },
    });
    console.log("✅ Created shoe:", created.name);
  }

  console.log("🎉 Seeding completed!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
