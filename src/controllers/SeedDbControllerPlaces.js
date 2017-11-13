// Controller de la route '/shows'
import Errors from "../helpers/Errors";

// Récupération du model
import PlaeModel from "../models/PlaceModel";
import BookingModel from "../models/BookingModel";

export default {
  seedDb: (req, res) => {
    return Promise.all([
      PlaceModel.deletePlace(),
      BookingModel.deleteBookings(),
    ])
    .then((data) => {
      return Promise.all([
        PlaceModel.seedPlaces(),
      ]);
    })
    .then((data) => {
      res.send('ok');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },
};