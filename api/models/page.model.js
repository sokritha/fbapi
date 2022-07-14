const mongoose = require("mongoose");

const pageSchema = mongoose.Schema({
  pageId: {
    type: String,
    required: [true, "Field page id is not provided"],
  },
  name: {
    type: String,
    required: [true, "Field name is not provided"],
  },
  category: [
    {
      name: String,
    },
  ],
});

const Page = mongoose.model("Page", pageSchema);

module.exports = Page;