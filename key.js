var api_key = "7STuj7naNvqQgZTu";
var token = "samuel";
var dB = "LBR";

module.exports = {
  mongoURI: `mongodb+srv://${token}:${api_key}@cluster0.dottv.mongodb.net/${dB}?retryWrites=true&w=majority`,
};