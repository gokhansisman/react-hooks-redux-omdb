import React, {  useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getDetails__byID } from './store/actions/actions';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        maxWidth: 400,
    },
    media: {
        height: 400,
    },
});


function Details() {
    const classes = useStyles();
    const { actors, title, poster, director, runtime, type, imdbRating, writer } = useSelector(state => state.detail);
    const { id } = useSelector(state => state.detail);
    const movieDispatch = useDispatch();

    useEffect(() => {
        movieDispatch(getDetails__byID(id || localStorage.omdbID));
    }, [])

    return (
        <div style={{
            textAlign: "-webkit-center"
        }}>
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={poster}
                        title={title}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {title}
                        </Typography>
                        <Typography variant="body2" style={{ border: '#333 1px dashed' }} color="textSecondary" component="p">
                            Director : {director}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Time : {runtime}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Type : {type}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Actors : {actors}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            IMDB Point : {imdbRating}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Writer/s : {writer}
                    </Typography>
                </CardActions>
            </Card>
        </div >
    )
}
export default Details