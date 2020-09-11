import React, { useReducer, useEffect, useState } from 'react'
import axios from 'axios'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Pagination from '@material-ui/lab/Pagination';
import { useSelector, useDispatch } from 'react-redux';
import { fetch_action, fetch_movies__year, fetch_series } from './store/actions/actions';
import { Link, Redirect } from 'react-router-dom';
import history from './history'
import './main.scss'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));


function FetchingData() {
    // const [state, dispatch] = useReducer(reducer, initialState)
    const [page, setPage] = useState(1);
    const [value, setValue] = useState('movie');
    const [search, setSearch] = useState('pokemon');
    const { post, loading, totalResults, series_title, episodes, totalSeason, currentSeason } = useSelector(state => state.movie);
    const [year, setYear] = useState('');
    const movieDispatch = useDispatch();
    const [control, setControl] = useState(23);
    const [searchSeries, setSeries] = useState('Game of Thrones');
    const [season, setSeason] = useState(1);
    const [searchEpisode, setEpisode] = useState('');
    let newArray = []
    if (episodes != null) newArray = episodes.filter(episode => episode.Title.includes(searchEpisode))

    console.log(newArray)

    const options = {
        onRowClick: function (row) {
            console.log(typeof row.imdbID);
            if (typeof row.imdbID === 'string') {
                history.push(`/details/${control}`)
                setControl(row.imdbID)
                movieDispatch({ type: 'TITLE', payload: { title: row.imdbID } })
                localStorage.omdbID = row.imdbID;
            }
        },
        onRowDoubleClick: function (row) {

        }
    };

    useEffect(() => {
        movieDispatch(fetch_action(value, search, page));
    }, [value, search, page])
    useEffect(() => {
        movieDispatch(fetch_movies__year(search, page, year));
    }, [search, page, year])
    useEffect(() => {
        movieDispatch(fetch_series(searchSeries, season));
    }, [searchSeries, season])

    if (typeof control === 'string') return <Redirect to={`/details/${control}`} />

    console.log(value)
    return (
        <div>
            <select
                className="select-menu"
                value={value}
                onChange={e => setValue(e.currentTarget.value)} >
                <option className="select-option" value="movie">
                    Movie
                </option>
                <option value="series">Series</option>
            </select>
            <TextField variant="outlined" style={{ paddingLeft: "3px" }} label="Title" placeholder="Movie,series.." onChange={e => setSearch(e.target.value)} />
            <TextField variant="outlined" style={{ paddingLeft: "3px" }} label="Year" placeholder="For movies only.." onChange={e => setYear(e.target.value)} />
            <BootstrapTable data={post} scrollTop={'Bottom'}
                options={options}
                tableStyle={{ border: 'whitesmoke 1.5px solid', flex: 1 }}
                containerStyle={{}}
                bodyStyle={{ border: 'black 1px dashed', color: "#333" }}
            >
                <TableHeaderColumn width='1200' dataSort={true} className="header-col" dataField='Title' isKey>Name &#8645;</TableHeaderColumn>
                <TableHeaderColumn width='150' dataSort={true} className="header-col" dataField='Year'>Year &#8645;</TableHeaderColumn>
                <TableHeaderColumn width='150' dataSort={true} className="header-col" dataField='Type'>Type</TableHeaderColumn>
                <TableHeaderColumn width='150' dataSort={true} className="header-col" dataField='imdbID'>ImdbID</TableHeaderColumn>
            </BootstrapTable>
            <div style={{ flex: 1, float: "right" }}>
                <Pagination color="standard" count={Math.floor(totalResults / 10) + 1} page={page} onChange={(event, value) => setPage(value)} />
            </div>
            <br />
            <br />
            <span>Only for Episodes | (Default - Game of Thrones) </span>
            <br />
            <span><b>Chosen Series</b> : {series_title}</span>
            <br />
            <br />
            <TextField variant="outlined" label="Series" placeholder="Search for series" onChange={e => setSeries(e.target.value)} />
            <TextField variant="outlined" style={{ paddingLeft: "3px" }} label="Episode" placeholder="Episode of chosen series" onChange={e => setEpisode(e.target.value)} />
            <BootstrapTable data={newArray} scrollTop={'Bottom'}
                options={options}
                tableStyle={{ border: 'whitesmoke 1.5px solid', flex: 1 }}
                containerStyle={{}}
                bodyStyle={{ border: 'black 1px dashed', color: "#333" }}
            >
                <TableHeaderColumn width='1200' dataSort={true} className="header-col" dataField='Title' isKey>Title &#8645;</TableHeaderColumn>
                <TableHeaderColumn width='150' dataSort={true} className="header-col" dataField='Released'>Released Date &#8645;</TableHeaderColumn>
                <TableHeaderColumn width='150' dataSort={true} className="header-col" dataField='Episode'>Episode No</TableHeaderColumn>
                <TableHeaderColumn width='150' dataSort={true} className="header-col" dataField='imdbID'>ImdbID</TableHeaderColumn>
            </BootstrapTable>
            <div style={{ flex: 1, float: "right" }}>
                <span style={{ padding: "50%" }}>Seasons</span>
                <Pagination color="standard" count={Math.floor(totalSeason / 1) + 1} page={season} onChange={(event, value) => setSeason(value)} />
            </div>
        </div>
    )
}
export default FetchingData