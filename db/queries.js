const { search } = require("../routes/router");
const pool = require("./pool");

async function getAllMessages() {
  const { rows } = await pool.query("SELECT * FROM message_board");
  return rows;
}

async function insertMessage(author, text) {
  await pool.query(
    "INSERT INTO message_board (username,message) VALUES ($1, $2)",
    [author, text]
  );
}

async function searchMessage(id) {
  const { rows } = await pool.query(
    "SELECT * FROM message_board WHERE id = ($1)",
    [id]
  );
  return rows;
}
module.exports = {
  getAllMessages,
  insertMessage,
  searchMessage,
};
