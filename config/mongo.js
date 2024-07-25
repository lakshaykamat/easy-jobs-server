const mongoose = require("mongoose");

// MongoDB connection
const connect = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error(err));
};
module.exports = connect;
