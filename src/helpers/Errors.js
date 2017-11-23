// Liste des erreurs que l'API peut renvoyer

const list = {
  noPlacesError: {
    code: 500,
    error: 'noPlacesError',
    error_description: 'La base ne contient pas de place'
  },
  noPlaceError: {
    code: 500,
    error: 'noPlaceError',
    error_description: 'Cette place n\'existe pas'
  },
  noUserUpdatesError: {
    code: 500,
    error: 'noUserUpdatesError',
    error_description: 'La base ne contient pas de UserUpdate'
  },
  noUserUpdateError: {
    code: 500,
    error: 'noUserUpdateError',
    error_description: 'Ce UserUpdate n\'existe pas'
  },
};

export default (err) => {
  if (err instanceof Error && err.message){
    return list[err.message] ? list[err.message] : { code: 500, error: 'UnknownError', error_description: 'Unknown error' };
  } else {
    return list[err] ? list[err] : { code: 500, error: 'UnknownError', error_description: 'Unknown error' };
  }
};