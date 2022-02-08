const express = require("express");
const router = express.Router();
const { postFolder, getFolders } = require("../controllers/folderController");

router.post("/", postFolder);
router.get("/", getFolders);

module.exports = router;
