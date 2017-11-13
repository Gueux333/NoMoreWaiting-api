// Model de la route '/places'

import mongoose from "mongoose";
mongoose.Promise = global.Promise;

import showSeeds from "../helpers/showSeeds";

let Schema = new mongoose.Schema({
  name: { type: String },         // le nom du concert
  description: { type: String },  // la description    
  lat: { type: String }, 
  lng: { type: String },     
  image: { type: String },        // l'url de l'image
  time: { type: String }          // Derniere estimation 
});

let Model = mongoose.model('Place', Schema);

export default {
  seedPlaces: () => {
    let promises = [];
    for (let place of placeSeeds){
      promises[promises.legth] = Model.create(place);
    }
    return Promise.all(promises);
  },

  getPlaces: () => {
    return Model.find({}).exec();
  },

  getPlace: (_id) => {
    return Model.findOne({ _id }).exec();
  },

  createPlace: (place) => {
    return Model.create({
      name: place.name,
      description: place.description,
      lat: place.lat, 
      lng: place.lng,
      image: place.image,
      time: place.time
    });
  },

  updatePlace: (_id, place) => {
    return Model.findOneAndUpdate({ _id }, {
      name: place.name,
      description: place.description,
      lat: place.lat, 
      lng: place.lng,
      image: place.image,
      time: place.time
    }, {upsert: true}).exec();
  },

  deletePlaces: () => {
    return Model.remove({}).exec();
  },

  deletePlace: (_id) => {
    return Model.remove({ _id }).exec();
  },
};
