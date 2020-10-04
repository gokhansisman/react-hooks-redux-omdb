
export const fetch_action = (value, search, page) => {
    return dispatch => {
        return fetch(`http://www.omdbapi.com/?s=${search}&type=${value}&apikey=ff53e103&page=${page}`)
            .then(res => res.json())
            .then(json => {
                dispatch({
                    type: 'FETCH_SUCCESS', payload: {
                        post: json.Search,
                        totalResults: json.totalResults,
                        isLoading: true
                    }

                })
            })
    }
}

export const fetch_movies__year = (search, page, year) => {
    return dispatch => {
        return fetch(`http://www.omdbapi.com/?s=${search}&type=movie&y=${year}&apikey=ff53e103&page=${page}`)
            .then(res => res.json())
            .then(json => {
                dispatch({
                    type: 'FETCH_SUCCESS', payload: {
                        post: json.Search,
                        totalResults: json.totalResults,
                        isLoading: true
                    }

                })
            })
    }
}

export const fetch_series = (searchSeries, season) => {
    console.log(typeof searchSeries)
    if(searchSeries==='') {
        searchSeries='Game of Thrones'
    }
    return dispatch => {
        return fetch(`http://www.omdbapi.com/?t=${searchSeries}&type=series&Season=${season}&apikey=ff53e103`)
            .then(res => res.json())
            .then(json => {
                dispatch({
                    type: 'FETCH_SERIES', payload: {
                        series_title: json.Title,
                        episodes: json.Episodes,
                        totalSeason: json.totalSeasons,
                        currentSeason: json.Season
                    }

                })
            })
    }
}


export const getDetails__byID = (id) => {
    return dispatch => {
        return fetch(`http://www.omdbapi.com/?i=${id}&apikey=ff53e103`)
            .then(res => res.json())
            .then(json => {
                dispatch({
                    type: 'FETCH_DETAILS', payload: {
                        actors: json.Actors,
                        director: json.Director,
                        poster: json.Poster,
                        rated: json.Rated,
                        ratings: json.Ratings,
                        released: json.Released,
                        runtime: json.Runtime,
                        title: json.Title,
                        type: json.Type,
                        writer: json.Writer,
                        year: json.Year,
                        imdbID: json.imdbID,
                        imdbRating: json.imdbRating,
                        imdbVotes: json.imdbVotes
                    }
                })
            })
    }
}

