// Controller de la route '/places'
import _ from "lodash";
import Errors from "../helpers/Errors";

// Récupération du model
import PlaceModel from "../models/PlaceModel";
import UserUpdateModel from "../models/UserUpdateModel";

const places = (mylat, mylng) => {
  // On fait appel à la fonction getplaces du model
  // Celle ci renvoie tous les places présents en base

   var p = 0.017453292519943295;
   var c = Math.cos;
   var mylat = 48.714460;
   var mylng = 2.211270;
  return Promise.all([
    PlaceModel.getPlaces(),
    UserUpdateModel.getUserUpdates(),
  ])
  .then((data) => {
    // On récupère ici data qui est une liste de places

    if (data[0] === null) {
      // Si data est vide, nous renvoyons l'erreur 'noplacesError'
      throw new Error('noPlacesError');
    }

    if (data[1] === null) {
      throw new Error('noUserUpdatesError');
    }

    // On prépare ici la réponse que va renvoyer l'api, il s'agit d'un tableau
    let response = [];
    for (let place of data[0]){
      // On parcours data. pour chaque élément, on garde les champs name, venue, description, capacity, price, image et date

      let waitingTime = 0;
      let lastUpdate = new Date(0);
      let presentTime = new Date();
      let mostRecentEstimate = new Date(0);

      for (let userUpdate of data[1]){
        if (place._id == userUpdate.idPlace){
          if (userUpdate.creation > lastUpdate) {
            mostRecentEstimate = userUpdate.creation.getTime() + userUpdate.duration * 60000;
            lastUpdate = userUpdate.creation;
          }
        }
      }

      if (mostRecentEstimate > presentTime){
        waitingTime = Math.floor((mostRecentEstimate - presentTime)/60000);
      }

      if (waitingTime == 0){
        response[response.length] = {
          id: place._id,
          name: place.name,
          description: place.description,
          lienInternet: place.lienInternet,
          lat: place.lat,
          lng: place.lng,
          image: place.image,
          time: "No estimate yet",
          distance: 12742 * Math.asin(Math.sqrt(0.5 - c((mylat - place.lat) * p)/2 +
          c(place.lat * p) * c(mylat * p) *
          (1 - c((mylng - place.lng) * p))/2)),
        }
      }
      else {
        response[response.length] = {
          id: place._id,
          name: place.name,
          description: place.description,
          lienInternet: place.lienInternet,
          lat: place.lat,
          lng: place.lng,
          image: place.image,
          time: waitingTime,
          distance: 12742 * Math.asin(Math.sqrt(0.5 - c((mylat - place.lat) * p)/2 +
                     c(place.lat * p) * c(mylat * p) *
                     (1 - c((mylng - place.lng) * p))/2)),
        }
      }
    }

    // Avant d'envoyer la réponse on la tri par ordre alphabétique croissant sur le champs name
    return _.sortBy(response, 'distance');
  });
}


const place = (_id) => {
  // On fait appel à la fonction getplace du model
  // Celle ci renvoie le place dont l'id est _id
  var p = 0.017453292519943295;
   var c = Math.cos;
   var mylat = 48.714460;
   var mylng = 2.211270;
  return Promise.all([
    PlaceModel.getPlace(_id),
    UserUpdateModel.getUserUpdates(),
  ])
  .then((data) => {
    // On récupère ici data qui est une liste de places

    if (data[0] === null) {
      // Si data est vide, nous renvoyons l'erreur 'noplaceError'
      throw new Error('noPlaceError');
    }

    if (data[1] === null) {
      throw new Error('noUserUpdatesError');
    }

    let waitingTime = 0;
    let lastUpdate = new Date(0);
    let presentTime = new Date();
    let mostRecentEstimate = new Date(0);

    for (let userUpdate of data[1]){
      if (data[0]._id == userUpdate.idPlace){
        if (userUpdate.creation > lastUpdate) {
          mostRecentEstimate = userUpdate.creation.getTime() + userUpdate.duration * 60000;
          lastUpdate = userUpdate.creation;
        }
      }
    }

    if (mostRecentEstimate > presentTime){
      waitingTime = Math.floor((mostRecentEstimate - presentTime)/60000);
    }


    // On prépare ici la réponse que va renvoyer l'api, il s'agit d'un élement
    let response = {};
    if (waitingTime == 0){
      response = {
        id: data[0]._id,
        name: data[0].name,
        description: data[0].description,
        lienInternet: data[0].lienInternet,
        lat: data[0].lat,
        lng: data[0].lng,
        image: data[0].image,
        time: "No estimate yet",
        distance: 12742 * Math.asin(Math.sqrt(0.5 - c((mylat - data[0].lat) * p)/2 +
                     c(data[0].lat * p) * c(mylat * p) *
                     (1 - c((mylng - data[0].lng) * p))/2)),
      }
    }
    else {
      response = {
        id: data[0]._id,
        name: data[0].name,
        description: data[0].description,
        lienInternet: data[0].lienInternet,
        lat: data[0].lat,
        lng: data[0].lng,
        image: data[0].image,
        time: waitingTime,
        distance: 12742 * Math.asin(Math.sqrt(0.5 - c((mylat - data[0].lat) * p)/2 +
                     c(data[0].lat * p) * c(mylat * p) *
                     (1 - c((mylng - data[0].lng) * p))/2)),
      }
    }
      return response;
  });
}

const createPlace = (place) => {
  // On fait appel à la fonction createplace du model
  // Celle ci renvoie le place dont l'id est _id
  return PlaceModel.createPlace(place);
}

const updatePlace = (id, place) => {
  // On fait appel à la fonction updateplace du model
  // Celle ci renvoie le place dont l'id est _id
  return PlaceModel.updatePlace(id, place);
}

const deletePlace = (id) => {
  // On fait appel à la fonction deleteplace du model
  // Celle ci renvoie le place dont l'id est _id
  return PlaceModel.deletePlace(id);
}

export default {
  // Controller des views
  getPlaces: (req, res) => {
    places()
    .then((data) => {
      // data contient une liste de places
      res.render('place/places', { places: data });
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getPlacesAround: (req, res) => {
    placesAround(req.params.mylat, req.params.mylng)
    .then((data) => {
      // data contient une liste de places
      res.render('place/places', { places: data });
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getPlace: (req, res) => {
    place(req.params.id)
    .then((data) => {
      res.render('place/place', { place: data });
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getCreatePlace: (req, res) => {
    res.render('place/createPlace');
  },

  postCreatePlace: (req, res) => {
    let place = {
      name: req.body.name,
      description: req.body.description,
      lienInternet:req.body.lienInternet,
      lat: req.body.lat,
      lng: req.body.lng,
      image: req.body.image,
      time: req.body.time
    };

    createPlace(place)
    .then((data) => {
      res.redirect('/places');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getUpdatePlace: (req, res) => {
    place(req.params.id)
    .then((data) => {
      res.render('place/updatePlace', { place: data });
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  postUpdatePlace: (req, res) => {
    let place = {
      name: req.body.name,
      description: req.body.description,
      lienInternet: req.body.lienInternet,
      lat: req.body.lat,
      lng: req.body.lat,
      image: req.body.image,
      time: req.body.time
    };

    updatePlace(req.params.id, place)
    .then((data) => {
      res.redirect('/places');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getDeletePlace: (req, res) => {
    deletePlace(req.params.id)
    .then((data) => {
      res.redirect('/places');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  // ************ API FROM THERE ************ //

  // Controller des Apis
  getPlacesApi: (req, res) => {
    places()
    .then((data) => {
      // data contient maintenant la valeur retournée par la fonction _.sortBy
      // Si les opérations précédentes se sont bien passées, l'api renvoie une liste de places
      res.send(data);
    }, (err) => {
      // Si une erreur a été renvoyée avec la fonctions throw new Error(), nous atterrissons ici
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getPlacesAroundApi: (req, res) => {
    placesAround(req.params.mylat, req.params.mylng)
    .then((data) => {
      // data contient maintenant la valeur retournée par la fonction _.sortBy
      // Si les opérations précédentes se sont bien passées, l'api renvoie une liste de places
      res.send(data);
    }, (err) => {
      // Si une erreur a été renvoyée avec la fonctions throw new Error(), nous atterrissons ici
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getPlaceApi: (req, res) => {
    place(req.params.id)
    .then((data) => {
      res.send(data);
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  postCreatePlaceApi: (req, res) => {
    let place = {
      name: req.body.name,
      description: req.body.description,
      lienInternet: req.body.lienInternet,
      lat: req.body.lat,
      lng: req.body.lng,
      image: req.body.image,
      time: req.body.time
    };

    createPlace(place)
    .then((data) => {
      res.send('ok');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  postUpdatePlaceApi: (req, res) => {
    let place = {
      name: req.body.name,
      description: req.body.description,
      lienInternet: req.body.lienInternet,
      lat: req.body.lat,
      lng: req.body.lng,
      image: req.body.image,
      time: req.body.time,
    };

    updatePlace(req.params.id, place)
    .then((data) => {
      res.send('ok');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  postDeletePlaceApi: (req, res) => {
    deletePlace(req.params.id)
    .then((data) => {
      res.send('ok');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },
};
