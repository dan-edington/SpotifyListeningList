const mongoose = require('mongoose');
const { Schema } = mongoose;
const albumSchema = require('./Album');

const userSchema = new Schema({
  spotifyID: String,
  albums: [albumSchema]
});

mongoose.model('users', userSchema);