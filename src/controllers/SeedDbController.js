import Errors from "../helpers/Errors";

// Récupération du model
import PlaceModel from "../models/PlaceModel";
import UserUpdateModel from "../models/UserUpdateModel";

export default {
  seedDb: (req, res) => {
    return Promise.all([
      PlaceModel.deletePlaces(),
      UserUpdateModel.deleteUserUpdates(),
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