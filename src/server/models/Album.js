const mongoose = require('mongoose');
const { Schema } = mongoose;

const albumSchema = new Schema({
  name: String,
  artist: String,
  type: String,
  artworkURL: String,
  albumURL: String
});

module.exports = albumSchema;