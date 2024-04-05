const express = require("express");
const cors = require("cors");
const env = require("dotenv").config();
const { getAll, getOne, createOne, updateOne, deleteOne } = require("./db");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/api/getall", async (req, res) => {
  try {
    const data = await getAll();
    return res.status(200).json({ data });
  } catch (error) {
    return res.status(500).json({ message: "internal server error - getall" });
  }
});

app.post("/api/add", async (req, res) => {
  const data = req.body;
  try {
    await createOne(data);
    return res.status(200).json({ message: "ok" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "internal server error - createOne" });
  }
});

app.post("/api/update", async (req, res) => {
  const { id, data } = req.body;

  try {
    await updateOne(id, data);
    return res.status(200).json({ message: "ok" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "internal server error - createOne" });
  }
});

app.post("/api/delete", async (req, res) => {
  const { id } = req.body;
  try {
    await deleteOne(id);
    return res.status(200).json({ message: "ok" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "internal server error - createOne" });
  }
});

app.post("/api/search", async (req, res) => {
  const { phone } = req.body;
  try {
    const result = await getOne(phone);
    return res.status(200).json({ data: result[0] });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "internal server error - createOne" });
  }
});

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));
