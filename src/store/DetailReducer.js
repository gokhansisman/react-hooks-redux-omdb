const initialState = {
  loading: true,
  actors: null,
  director: null,
  poster: null,
  rated: null,
  ratings: null,
  released: null,
  runtime: null,
  title: null,
  type: null,
  writer: null,
  year: null,
  imdbID: null,
  imdbRating: null,
  imdbVotes: null,
  redirectTitle: null,
  id: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_DETAILS':
      return {
        ...state,
        actors: action.payload.actors,
        director: action.payload.director,
        poster: action.payload.poster,
        ratings: action.payload.ratings,
        released: action.payload.released,
        runtime: action.payload.runtime,
        title: action.payload.title,
        type: action.payload.type,
        writer: action.payload.writer,
        year: action.payload.year,
        imdbID: action.payload.imdbID,
        imdbRating: action.payload.imdbRating,
        imdbVotes: action.payload.imdbVotes
      }
    case 'FETCH_ERROR':
      return {
        ...state,
        loading: false,
        post: {},
        error: 'Wrong!'
      }
    case 'TITLE':
      return {
        ...state,
        id: action.payload.title
      }
    default:
      return state
  }
}

export default reducer;