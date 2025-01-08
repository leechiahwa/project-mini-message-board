const db = require("../db/queries");

async function getMessages(req, res) {
  console.log("Router working");
  const messages = await db.getAllMessages();
  console.log(messages);
  res.render("index", { title: "Mini Messageboard", messages: messages });
}

async function createNewMessageGet(req, res) {
  res.render("form");
}

async function createNewMessagePost(req, res) {
  const { author, text } = req.body;
  const newMessage = await db.insertMessage(author, text);
  console.log(newMessage);
  res.redirect("/");
}

async function findMessageGet(req, res) {
  const messageId = req.params.id;

  const message = await db.searchMessage(messageId);
  console.log(message);
  if (!message) {
    return res.status(404).render("error", { message: "Message not found" });
  }

  res.render("message", { messages: message });
}

module.exports = {
  getMessages,
  createNewMessageGet,
  createNewMessagePost,
  findMessageGet,
};
