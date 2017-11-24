// Controller de la route '/Arounds'
import _ from "lodash";
import Errors from "../helpers/Errors";

// Récupération du model
import AroundModel from "../models/AroundModel";
import PlaceModel from "../models/PlaceModel";

const Arounds = () => {
  return AroundModel.getArounds()
  .then((data) => {
    if (data === null) {
      throw new Error('noAroundsError');
    }

    let response = [];
    for (let Around of data){
      response[response.length] = {
        idPlace: Around.idPlace,
        lat: Around.lat,
        lng: Around.lng,
        latp: Around.latp,
        lngp: Around.lngp,
        distance: Around.distance,
      }
    }
    return _.sortBy(response, 'idPlace');
  });
}

const Around = (_id) => {
  return AroundModel.getAround(_id)
  .then((data) => {
    if (data === null) {
      throw new Error('noAroundError');
    }

    let response = {
      idPlace: data.idPlace,
      lat: data.lat,
      lng: data.lng,
      latp: data.latp,
      lngp: data.lngp,
      distance: data.distance,
    };
    return response;
  });
}

const createAround = (Around) => {
  return AroundModel.createAround(Around);
}

const updateAround = (id, Around) => {
  return AroundModel.updateAround(id, Around);
}

const deleteAround = (id) => {
  return AroundModel.deleteAround(id);
}

export default {
  // Controller des views
  getArounds: (req, res) => {
    Arounds()
    .then((data) => {
      res.render('Around/arounds', { Arounds: data });
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getAround: (req, res) => {
    Around(req.params.id)
    .then((data) => {
      res.render('Around/around', { Around: data });
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getCreateAround: (req, res) => {
    PlaceModel.getPlaces()
    .then((data) => {
      res.render('Around/createAround', { places: data });
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  postCreateAround: (req, res) => {
    let Around = {
      idPlace: req.body.idPlace,
      lat: req.body.lat,
      lng: req.body.lng,
      latp: req.body.latp,
      lngp: req.body.lngp,
      distance: req.body.distance,
    };

    createAround(Around)
    .then((data) => {
      res.redirect('/arounds');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getUpdateAround: (req, res) => {
    Promise.all([
      Around(req.params.id),
      PlaceModel.getPlaces(),
    ])
    .then((data) => {
      res.render('Around/updateAround', { Around: data[0], places: data[1] });
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  postUpdateAround: (req, res) => {
    let Around = {
      idPlace: req.body.idPlace,
      lat: req.body.lat,
      lng: req.body.lng,
      latp: req.body.latp,
      lngp: req.body.lngp,
      distance: req.body.distance,
    };

    updateAround(req.params.id, Around)
    .then((data) => {
      res.redirect('/arounds');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getDeleteAround: (req, res) => {
    deleteAround(req.params.id)
    .then((data) => {
      res.redirect('/arounds');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  // Controller des Apis
  getAroundsApi: (req, res) => {
    Arounds()
    .then((data) => {
      res.send(data);
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getAroundApi: (req, res) => {
    Around(req.params.id)
    .then((data) => {
      res.send(data);
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  postCreateAroundApi: (req, res) => {
    let Around = {
      idPlace: req.body.idPlace,
      lat: req.body.lat,
      lng: req.body.lng,
      latp: req.body.latp,
      lngp: req.body.lngp,
      distance: req.body.distance,
    };

    createAround(Around)
    .then((data) => {
      res.send('ok');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  postUpdateAroundApi: (req, res) => {
    let Around = {
      idPlace: req.body.idPlace,
      lat: req.body.lat,
      lng: req.body.lng,
      latp: req.body.latp,
      lngp: req.body.lngp,
      distance: req.body.distance,
    };

    updateAround(req.params.id, Around)
    .then((data) => {
      res.send('ok');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  postDeleteAroundApi: (req, res) => {
    deleteAround(req.params.id)
    .then((data) => {
      res.send('ok');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },
};
