import React, { useEffect, useState } from 'react'

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Pagination from '@material-ui/lab/Pagination';
import { useSelector, useDispatch } from 'react-redux';
import { fetch_action, fetch_movies__year, fetch_series } from './store/actions/actions';
import { Redirect } from 'react-router-dom';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import NativeSelect from '@material-ui/core/NativeSelect';
import history from './history'
import './main.scss'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(3),
    },
}));

function FetchingData() {
    // const [state, dispatch] = useReducer(reducer, initialState)
    const [page, setPage] = useState(1);
    const [value, setValue] = useState('movie');
    const [search, setSearch] = useState('pokemon');
    const { post, totalResults, series_title, episodes, totalSeason } = useSelector(state => state.movie);
    const [year, setYear] = useState('');
    const movieDispatch = useDispatch();
    const [control, setControl] = useState(23);
    const [searchSeries, setSeries] = useState('Game of Thrones');
    const [season, setSeason] = useState(1);
    const [searchEpisode, setEpisode] = useState('');
    let newArray = []
    if (episodes != null) newArray = episodes.filter(episode => episode.Title.includes(searchEpisode))
    const classes = useStyles();

    const options = {
        onRowClick: function (row) {

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

    return (

        <div className="main-container">     
            <div className="main-header">
                <FormControl id="select" variant="outlined" className={classes.formControl}>
                    <InputLabel htmlFor="outlined-age-native-simple">Category</InputLabel>
                    <Select
                        native
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        label="Category"
                    >
                        <option aria-label="None" value="" />
                        <option value="">Movie</option>
                        <option value="series">Series</option>
                    </Select>
                </FormControl>
                <span className="header-inputs"><TextField variant="outlined" style={{ paddingLeft: "3px" }} label="Title" placeholder="Movie,series.." onChange={e => setSearch(e.target.value)} /></span>
                <span className="header-inputs"><TextField variant="outlined" style={{ paddingLeft: "3px" }} label="Year" placeholder="For movies only.." onChange={e => setYear(e.target.value)} /></span>
            </div>
            <div className="table-container">
                <BootstrapTable data={post} scrollTop={'Bottom'}
                    options={options}
                    bodyStyle={{ textAlign: "none" }}
                >
                    <TableHeaderColumn dataSort={true} dataField='Title' isKey>Name &#8645;</TableHeaderColumn>
                    <TableHeaderColumn dataSort={true} dataField='Year'>Year &#8645;</TableHeaderColumn>
                    <TableHeaderColumn dataSort={true} dataField='Type'>Type</TableHeaderColumn>
                    <TableHeaderColumn dataSort={true} dataField='imdbID'>ImdbID</TableHeaderColumn>
                </BootstrapTable>
                <div style={{ flex: 1, float: "right" }}>
                    <Pagination color="standard" count={Math.floor(totalResults / 10) + 1} page={page} onChange={(event, value) => setPage(value)} />
                </div>
            </div>
            <br />
            <br />
            <span className="series-header"><b>Chosen Series</b> : {series_title}</span>
            <br />
            <br />
            <div className="main-header">
                <span className="header-inputs"><TextField variant="outlined" label="Series" placeholder="Search for series" onChange={e => setSeries(e.target.value)} /></span>
                <span className="header-inputs"><TextField variant="outlined" style={{ paddingLeft: "3px" }} label="Episode" placeholder="Episode of chosen series" onChange={e => setEpisode(e.target.value)} /></span>
            </div>
            <div className="table-container">
                <BootstrapTable data={newArray} scrollTop={'Bottom'}
                    options={options}
                >
                    <TableHeaderColumn dataSort={true} dataField='Title' isKey>Title &#8645;</TableHeaderColumn>
                    <TableHeaderColumn dataSort={true} dataField='Released'>Released Date &#8645;</TableHeaderColumn>
                    <TableHeaderColumn dataSort={true} dataField='Episode'>Episode No</TableHeaderColumn>
                    <TableHeaderColumn dataSort={true} dataField='imdbID'>ImdbID</TableHeaderColumn>
                </BootstrapTable>

                <div style={{ float: "right" }}>
                    <span style={{ padding: "50%" }}>Seasons</span>
                    <Pagination color="standard" count={Math.floor(totalSeason / 1) + 1} page={season} onChange={(event, value) => setSeason(value)} />
                </div>
            </div>
            <div style={{ clear: "both" }}></div>
        </div>
    )
}
export default FetchingData