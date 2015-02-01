var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CountCache = new Schema({
  service: { type: String, required: true },
  action: { type: String, required: true },
  url: { type: String, required: true },
  count: { type: Number, required: true },
  createdAt: { type: Date },
  updatedAt: { type: Date, expires: 24 * 60 * 60 } // 24 h
});

CountCache.pre('save', function (next) {
  var now = new Date();
  this.updatedAt = now;
  if (!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

mongoose.model('CountCache', CountCache);