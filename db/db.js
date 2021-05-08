const mongoose = require("mongoose");
const keys = require('../key')

// mongoose.connect("mongodb://localhost:27017/dataset", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


var dbConn = mongoose.connection;
dbConn.on("connected", function () {
  console.log("Mongoose connected");
});
