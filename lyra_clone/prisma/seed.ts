import { db } from "../src/server/db";

async function main() {
  const id = "cl9ebqhxk00003b600tymydho";

  await db.base.upsert({
    where: { id },
    create: {
      id,
      base_name: "default base",
      user_id: "seed-user",
    },
    update: {},
  });
}

main()
  .then(() => db.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
