const mongoose = require("mongoose");

const validateMongodbID = (id) => {
  const isValid = mongoose.Types.ObjectId.isValid(id);
  if (!isValid) throw new Error("The ID is not valid or found!");
  return;
};

module.exports = validateMongodbID;
