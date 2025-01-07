const { v4: uuidv4 } = require("uuid");

const messages = [
  {
    id: uuidv4(),
    text: "Hello!",
    user: "Melvin",
    added: new Date(),
  },
  {
    id: uuidv4(),
    text: "Good morning!",
    user: "Stefani",
    added: new Date(),
  },
];

async function getMessages(req, res) {
  console.log("Router working");
  res.render("index", { title: "Mini Messageboard", messages: messages });
}

async function createNewMessageGet(req, res) {
  res.render("form");
}

async function createNewMessagePost(req, res) {
  const { author, text } = req.body;
  const newMessage = {
    id: uuidv4(), // Generate a unique ID
    text: text,
    user: author,
    added: new Date(),
  };
  messages.push(newMessage);

  // Process the form data (e.g., save it to a database)
  console.log(`Author: ${author}, Text: ${text}`);

  res.redirect("/");
}

async function findMessageGet(req, res) {
  const messageId = req.params.id;

  // Find the message by ID
  const message = messages.find((msg) => msg.id === messageId);

  if (!message) {
    return res.status(404).render("error", { message: "Message not found" });
  }

  // Render the message details page
  res.render("message", { message });
}

module.exports = {
  getMessages,
  createNewMessageGet,
  createNewMessagePost,
  findMessageGet,
};
