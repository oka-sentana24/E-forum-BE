const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// const Users = require('./data/users');
const Posts = require('./data/siswa');

async function runSeeders() {
  // Users
//   await Promise.all(
//     Users.map(async (user) =>
//       prisma.user.upsert({
//         where : { id: user.id },
//         update: {},
//         create: user,
//       })
//     )
//   );

  // Siswa
  await Promise.all(
    siswa.map(async (siswa) =>
      prisma.siswa.upsert({
        where: { id: user.id },
        update: {},
        create: siswa,
      })
    )
  );
}

runSeeders()
  .catch((e) => {
    console.error(`There was an error while seeding: ${e}`);
    process.exit(1);
  })
  .finally(async () => {
    console.log('Successfully seeded database. Closing connection.');
    await prisma.$disconnect();
  });