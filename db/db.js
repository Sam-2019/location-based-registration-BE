const mongoose = require("mongoose");

// mongoose.connect("mongodb://localhost:27017/dataset", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

module.exports = {
  mongoURI: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_APIKEY}@cluster0.dottv.mongodb.net/${process.env.DB_COLLECTION}?retryWrites=true&w=majority`,
};

var dbConn = mongoose.connection;
dbConn.on("connected", function () {
  console.log("Mongoose connected");
});
