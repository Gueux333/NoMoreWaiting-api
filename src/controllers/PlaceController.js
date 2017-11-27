// Controller de la route '/places'
import _ from "lodash";
import Errors from "../helpers/Errors";

// Récupération du model
import PlaceModel from "../models/PlaceModel";

const places = () => {
  // On fait appel à la fonction getplaces du model
  // Celle ci renvoie tous les places présents en base
  return PlaceModel.getPlaces()
  .then((data) => {
    // On récupère ici data qui est une liste de places

    if (data === null) {
      // Si data est vide, nous renvoyons l'erreur 'noplacesError'
      throw new Error('noPlacesError');
    }

    // On prépare ici la réponse que va renvoyer l'api, il s'agit d'un tableau
    let response = [];
    for (let place of data){
      // On parcours data. pour chaque élément, on garde les champs name, venue, description, capacity, price, image et date
      response[response.length] = {
        id: place._id,
        name: place.name,
        description: place.description,
        lienInternet: place.lienInternet,
        lat: place.lat, 
        lng: place.lng,
        image: place.image,
        time: place.time
      }
    }

    // Avant d'envoyer la réponse on la tri par ordre alphabétique croissant sur le champs name
    return _.sortBy(response, 'name');
  });
}

const placesAround = (mylat, mylng) => {
  // On fait appel à la fonction getplaces du model
  // Celle ci renvoie tous les places présents en base
  return PlaceModel.getPlaces()
  .then((data) => {
    // On récupère ici data qui est une liste de places

    if (data === null) {
      // Si data est vide, nous renvoyons l'erreur 'noplacesError'
      throw new Error('noPlacesError');
    }

    // Introduction de certaine variable pour le calcule des distances 
    var p = 0.017453292519943295;    
    var c = Math.cos;

    // On prépare ici la réponse que va renvoyer l'api, il s'agit d'un tableau
    let response = [];
    for (let place of data){
      // On parcours data. pour chaque élément, on garde les champs name, venue, description, capacity, price, image et date
      response[response.length] = {
        id: place._id,
        name: place.name,
        description: place.description,
        lienInternet: place.lienInternet,
        lat: place.lat,
        lng: place.lng,
        image: place.image,
        time: place.time,
        // Mettre ici le résultat du calcul entre (mylat, mylng) et (place.lat, place.lng)
        distance: 12742 * Math.asin(Math.sqrt(0.5 - c((mylat - place.lat) * p)/2 + 
          c(place.lat * p) * c(mylat * p) * 
          (1 - c((mylng - place.lng) * p))/2)),
      }
    }

    // Avant d'envoyer la réponse on la tri par ordre alphabétique croissant sur le champs name
    return _.sortBy(response, 'distance');
  });
}

const place = (_id) => {
  // On fait appel à la fonction getplace du model
  // Celle ci renvoie le place dont l'id est _id
  return PlaceModel.getPlace(_id)
  .then((data) => {
    // On récupère ici data qui est une liste de places

    if (data === null) {
      // Si data est vide, nous renvoyons l'erreur 'noplaceError'
      throw new Error('noPlaceError');
    }

    // On prépare ici la réponse que va renvoyer l'api, il s'agit d'un élement
    let response = {
      id: data._id,
      name: data.name,
      description: data.description,
      lienInternet: data.lienInternet,
      lat: data.lat, 
      lng: data.lng,
      image: data.image,
      time: data.time
    };
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
