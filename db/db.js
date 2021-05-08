const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/dataset", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// module.exports = {
//   mongoURI: `mongodb+srv://${rocess.env.DB_USER}:${DB_APIKEY}@cluster0.dottv.mongodb.net/${DB_COLLECTION}?retryWrites=true&w=majority`,
// };

var dbConn = mongoose.connection;
dbConn.on("connected", function () {
  console.log("Mongoose connected");
});
