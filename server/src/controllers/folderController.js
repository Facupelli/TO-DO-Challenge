const { Folder } = require("../db");

const postFolder = async (req, res, next) => {
  try {
    const folder = {
      name: req.body.name,
    };

    const folderNameExist = await Folder.findOne({
      where: { userId: room.userId, name: room.name },
    });

    if (folderNameExist) {
      res.status(400).json({ message: "folder name already exists" });
    } else {
      await Folder.create(folder);
      res.json({ data: "created" });
    }
  } catch (e) {
    next(e);
  }
};

const getFolders = async (req, res, next) => {
  try {
    const folders = await Folder.findAll({
    //   include: { model: User, attributes: ["username"] },
    });

    res.json(folders);
  } catch (e) {
    next(e);
  }
};

module.exports = { postFolder, getFolders };