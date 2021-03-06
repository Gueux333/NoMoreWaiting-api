// Controller de la route '/UserUpdates'
import _ from "lodash";
import Errors from "../helpers/Errors";

// Récupération du model
import UserUpdateModel from "../models/UserUpdateModel";
import PlaceModel from "../models/PlaceModel";

const UserUpdates = () => {
  return UserUpdateModel.getUserUpdates()
  .then((data) => {
    if (data === null) {
      throw new Error('noUserUpdatesError');
    }

    let response = [];
    for (let UserUpdate of data){
      response[response.length] = {
        id: UserUpdate._id,
        idPlace: UserUpdate.idPlace,
        username: UserUpdate.username,
        duration: UserUpdate.duration,
        creation: UserUpdate.creation,
      }
    }
    return _.sortBy(response, 'username');
  });
}

const UserUpdate = (_id) => {
  return UserUpdateModel.getUserUpdate(_id)
  .then((data) => {
    if (data === null) {
      throw new Error('noUserUpdateError');
    }

    let response = {
      id: data._id,
      idPlace: data.idPlace,
      username: data.username,
      duration: data.duration,
      creation: data.creation,
    };
    return response;
  });
}

const createUserUpdate = (UserUpdate) => {
  return UserUpdateModel.createUserUpdate(UserUpdate);
}

const updateUserUpdate = (id, UserUpdate) => {
  return UserUpdateModel.updateUserUpdate(id, UserUpdate);
}

const deleteUserUpdate = (id) => {
  return UserUpdateModel.deleteUserUpdate(id);
}

export default {
  // Controller des views
  getUserUpdates: (req, res) => {
    UserUpdates()
    .then((data) => {
      res.render('UserUpdate/userUpdates', { UserUpdates: data });
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getUserUpdate: (req, res) => {
    UserUpdate(req.params.id)
    .then((data) => {
      res.render('UserUpdate/userUpdate', { UserUpdate: data });
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getCreateUserUpdate: (req, res) => {
    PlaceModel.getPlaces()
    .then((data) => {
      res.render('UserUpdate/createUserUpdate', { places: data });
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  postCreateUserUpdate: (req, res) => {
    let UserUpdate = {
      username: req.body.username,
      idPlace: req.body.idPlace,
      duration: req.body.duration,
    };

    createUserUpdate(UserUpdate)
    .then((data) => {
      res.redirect('/userupdates');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getUpdateUserUpdate: (req, res) => {
    Promise.all([
      UserUpdate(req.params.id),
      PlaceModel.getPlaces(),
    ])
    .then((data) => {
      res.render('UserUpdate/updateUserUpdate', { UserUpdate: data[0], places: data[1] });
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  postUpdateUserUpdate: (req, res) => {
    let UserUpdate = {
      username: req.body.username,
      idPlace: req.body.idPlace,
      duration: req.body.duration,
    };

    updateUserUpdate(req.params.id, UserUpdate)
    .then((data) => {
      res.redirect('/userupdates');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getDeleteUserUpdate: (req, res) => {
    deleteUserUpdate(req.params.id)
    .then((data) => {
      res.redirect('/userupdates');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  // Controller des Apis
  getUserUpdatesApi: (req, res) => {
    UserUpdates()
    .then((data) => {
      res.send(data);
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getUserUpdateApi: (req, res) => {
    UserUpdate(req.params.id)
    .then((data) => {
      res.send(data);
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  postCreateUserUpdateApi: (req, res) => {
    let UserUpdate = {
      username: req.body.username,
      idPlace: req.body.idPlace,
      duration: req.body.duration,
    };

    createUserUpdate(UserUpdate)
    .then((data) => {
      res.send('ok');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  postUpdateUserUpdateApi: (req, res) => {
    let UserUpdate = {
      username: req.body.username,
      idPlace: req.body.idPlace,
      duration: req.body.duration,
    };

    updateUserUpdate(req.params.id, UserUpdate)
    .then((data) => {
      res.send('ok');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  postDeleteUserUpdateApi: (req, res) => {
    deleteUserUpdate(req.params.id)
    .then((data) => {
      res.send('ok');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },
};
