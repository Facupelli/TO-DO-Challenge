const express = require("express");
const router = express.Router();
const {
  postFolder,
  getFolders,
  deleteFolder,
} = require("../controllers/folderController");

router.post("/", postFolder);
router.get("/", getFolders);
router.delete("/:id", deleteFolder);

module.exports = router;
