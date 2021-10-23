const express = require("express");
const { insertTag, removeTag } = require("../services/filterService");
const tagRouter = express.Router();
const {
  getTags,
  getTag,
  createTag,
  editTag,
  deleteTag,
  searchTag,
} = require("../services/tagService");
tagRouter.get("/tag", getTags);
tagRouter.get("/tag/search", searchTag);
tagRouter.get("/tag/:id", getTag);
tagRouter.post("/tag", createTag);
tagRouter.put("/tag/:id", editTag);
tagRouter.delete("/tag/:id", deleteTag);

/**
 * body : {tagId}
 */
tagRouter.post("/tag/insert/:productId", insertTag);
tagRouter.post("/tag/remove/:productId", removeTag);

module.exports = tagRouter;
