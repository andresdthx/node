import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function MediaCard(props) {

const {product} = props;
  const classes = useStyles();

  return (
    <Grid item md={4} key={product.name}>
        <Card>
            <CardActionArea>
                <CardMedia
                    component="img"
                    image={product.image}
                    title={product.name}
                ></CardMedia>
            </CardActionArea>
            <CardContent>
                {/* <Typography> */}
                    {product.name}
                {/* </Typography> */}
            </CardContent>
        </Card>
    </Grid>
  );
}
