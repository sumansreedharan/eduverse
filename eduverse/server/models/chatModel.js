// const mongoose = require("mongoose");

// const messageSchema = new mongoose.Schema({
//   chatId: {
//     type: String,
//     required: true,
//   },
//   message: {
//     type: String,
//     required: true,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// const Message = mongoose.model("Message", messageSchema);

// module.exports = Message;

const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  chatId: {
    type: String,
    required: true,
  },
  senderUserId: {
    type: String,  // You might want to use ObjectId if you're using MongoDB ObjectIds for user IDs
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;

