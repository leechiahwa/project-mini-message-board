const express = require("express");
const ejs = require("ejs");
const { v4: uuidv4 } = require("uuid");

const app = express();
const router = express.Router();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

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

app.get("/", (req, res) => {
  console.log("Router working");
  res.render("index", { title: "Mini Messageboard", messages: messages });
});

router.get("/new", (req, res, next) => {
  res.render("form");
});

router.post("/new", (req, res) => {
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
});

router.get("/message/:id", (req, res) => {
  const messageId = req.params.id;

  // Find the message by ID
  const message = messages.find((msg) => msg.id === messageId);

  if (!message) {
    return res.status(404).render("error", { message: "Message not found" });
  }

  // Render the message details page
  res.render("message", { message });
});

app.use(router);

app.listen(3000, () => {
  console.log("Server running in port 3000");
});
