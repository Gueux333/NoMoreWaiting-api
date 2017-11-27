// Model de la route '/UserUpdates'

import mongoose from "mongoose";
mongoose.Promise = global.Promise;

let Schema = new mongoose.Schema({
  idPlace: {type: String},
  username: {type: String},
  duration: {type: Number},       // Derniere estimation 
  creation: {type: Date},

});

let Model = mongoose.model('UserUpdate', Schema);

export default {
  getUserUpdates: () => {
    return Model.find({}).exec();
  },

  getUserUpdate: (_id) => {
    return Model.findOne({ _id }).exec();
  },

  createUserUpdate: (UserUpdate) => {
    return Model.create({
      idPlace: UserUpdate.idPlace,
      username: UserUpdate.username,
      duration: UserUpdate.duration,   // Derniere estimation 
      creation: new Date(),
    });
  },

  updateUserUpdate: (_id, UserUpdate) => {
    return Model.findOneAndUpdate({ _id }, {
      idPlace: UserUpdate.idPlace,
      username: UserUpdate.username,
      duration: UserUpdate.duration,   // Derniere estimation 
      creation: new Date(year, month, date, hours, minutes, seconds),
    }, {upsert: true}).exec();
  },

  deleteUserUpdates: () => {
    return Model.remove({}).exec();
  },

  deleteUserUpdate: (_id) => {
    return Model.remove({ _id }).exec();
  },
};