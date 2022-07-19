const express = require("express");

const router = express.Router();

router.route("/").get((req, res) => {
  console.log(req);
  res.status(200).json({
    status: "success",
    data: null,
  });
});

module.exports = router;
