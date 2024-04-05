const mysql = require("mysql2");

const db = mysql
  .createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASENAME,
  })
  .promise();

const newAppointment = {
  patient_name: "Jane Doe",
  patient_phone: "9999999998",
  visit_type: "FOLLOW_UP",
  status: "CONFIRMED",
  for_dr: "Dr. Rajesh Sharma",
  date_time: "05/04/2024/14:00",
};

async function createOne(data) {
  try {
    const result = await db.query("INSERT INTO appointment SET ?", [data]);
    console.log(result);
  } catch (error) {
    console.log("> createOne()\n", error.message);
  }
}

// createOne();

async function getAll() {
  try {
    const data = await db.query("SELECT * FROM appointment");
    // console.log("> DATA\n", data[0]);
    return data;
  } catch (error) {
    console.log("> getAll()\n", error.message);
    return;
  }
}
// getAll();

async function getOne(phone) {
  try {
    return db.query("SELECT * FROM appointment WHERE patient_phone = ?", [
      phone,
    ]);
  } catch (error) {
    console.log("> getOne()\n", error.message);
  }
}

async function updateOne(id, data) {
  try {
    db.query("UPDATE appointment SET ? WHERE id = ?", [data, id]);
  } catch (error) {
    console.log("> updateOne()\n", error.message);
  }
}

async function deleteOne(id) {
  console.log(id);
  try {
    db.query("DELETE FROM appointment WHERE id = ?", [id]);
  } catch (error) {
    console.log("> deleteOne()\n", error.message);
  }

  return "updated";
}

module.exports = { getAll, getOne, createOne, updateOne, deleteOne };
