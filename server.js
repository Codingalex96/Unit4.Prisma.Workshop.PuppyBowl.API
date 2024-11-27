const express = require("express");
const morgan = require("morgan");
const prisma = require("./prisma");

const app = express();
app.use(morgan("dev"));
app.use(express.json());

app.get("/api/players", async (req, res) => {
  const players = await prisma.player.findMany();
  res.json(players);
});

app.post("/api/players", async (req, res) => {
  const { name, team, status } = req.body;
  const player = await prisma.player.create({
    data: { name, team, status },
  });
  res.json(player);
});

app.get("/api/players/:id", async (req, res) => {
  const { id } = req.params;
  const player = await prisma.player.findUnique({ where: { id: Number(id) } });
  res.json(player);
});

app.put("/api/players/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const player = await prisma.player.update({
    where: { id: Number(id) },
    data: { status },
  });
  res.json(player);
});

app.delete("/api/players/:id", async (req, res) => {
  const { id } = req.params;
  await prisma.player.delete({ where: { id: Number(id) } });
  res.status(204).send();
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));