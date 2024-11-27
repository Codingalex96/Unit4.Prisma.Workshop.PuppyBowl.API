const prisma = require("./index");

const seed = async () => {
  const players = [
    { name: "Player 1", team: "Team A", status: "field" },
    { name: "Player 2", team: "Team B", status: "bench" },
    { name: "Player 3", team: "Team A", status: "field" },
    { name: "Player 4", team: "Team B", status: "bench" },
    { name: "Player 5", team: "Team A", status: "field" },
    { name: "Player 6", team: "Team B", status: "bench" },
    { name: "Player 7", team: "Team A", status: "field" },
    { name: "Player 8", team: "Team B", status: "bench" },
    
  ];

  await prisma.player.createMany({
    data: players,
  });

  console.log("Database seeded successfully.");
};

seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });