// Model de la route '/Around'

import mongoose from "mongoose";
mongoose.Promise = global.Promise;

let Schema = new mongoose.Schema({
  idPlace: {type: String},
  lat: { type: String },
  lng: { type: String },
  latp: {type: String},
  lngp: {type: String},
  distance: {type: Number}
});

let Model = mongoose.model('Around', Schema);

export default {
  getArounds: () => {
    return Model.find({}).exec();
  },

  getAround: (_id) => {
    return Model.findOne({ _id }).exec();
  },

  createAround: (Around) => {
    return Model.create({
      idPlace: Around.idPlace,
      lat: Around.lat,
      lng: Around.lng,
      latp: Around.latp,
      lngp: Around.lngp,
      distance: Around.distance,
    });
  },

  updateAround: (_id, Around) => {
    return Model.findOneAndUpdate({ _id }, {
      idPlace: Around.idPlace,
      lat: Around.lat,
      lng: Around.lng,
      latp: Around.latp,
      lngp: Around.lngp,
      distance: Around.distance,
    }, {upsert: true}).exec();
  },

  deleteArounds: () => {
    return Model.remove({}).exec();
  },

  deleteAround: (_id) => {
    return Model.remove({ _id }).exec();
  },
};