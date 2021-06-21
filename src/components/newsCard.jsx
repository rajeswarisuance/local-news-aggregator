import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  media: {
    height: 140
  }
});
export default function NewsCard({ article }) {
  const classes = useStyles();
  return (
    <Card
      className={classes.root}
      onClick={() => (window.location.href = article.url)}
    >
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={article.image}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {article.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {article.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

// class NewsCard extends Component {
//   state = {
//     value: this.props.value
//   };
//   render() {
//     const { article } = this.props.value;
//     return (
//       <div style={{ border: "1px solid black" }}>
//         {this.props.value.content}

//         {/* <Grid container>
//           <Grid item style={{ background: randomColor() }}></Grid>
//         </Grid> */}
//       </div>
//     );
//   }
// }

// export default NewsCard;
