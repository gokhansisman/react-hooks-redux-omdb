const initialState = {
  loading: true,
  error: '',
  post: null,
  totalResults: null,
  id: null,
  series_title: null,
  episodes: null,
  totalSeason: null,
  currentSeason: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return {
        ...state,
        loading: action.payload.isLoading,
        post: action.payload.post,
        totalResults: action.payload.totalResults,
        error: ''
      }
    case 'FETCH_ERROR':
      return {
        ...state,
        loading: false,
        post: {},
        error: 'Wrong!'
      }
    case 'FETCH_SERIES':
      return {
        ...state,
        loading: true,
        series_title: action.payload.series_title,
        episodes: action.payload.episodes,
        totalSeason: action.payload.totalSeason,
        currentSeason: action.payload.currentSeason
      }
    default:
      return state
  }
}

export default reducer;