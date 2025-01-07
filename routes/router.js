const { Router } = require("express");
const appController = require("../controllers/appController");
const router = Router();

router.get("/", appController.getMessages);
router.get("/new", appController.createNewMessageGet);
router.post("/new", appController.createNewMessagePost);
router.get("/message/:id", appController.findMessageGet);

module.exports = router;
