"use strict";

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MessagesSchema = new Schema(
{
    date : {type: Date},
    content: {type: String},
    username: { type :String}
}, 
{
    versionKey: false,
    collection : 'MessageCollection'
});

module.exports = mongoose.model('Messages', MessagesSchema);