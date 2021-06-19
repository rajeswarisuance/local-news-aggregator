import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import randomColor from "randomcolor";

class NewsCard extends Component {
  state = {
    value: this.props.value
  };
  render() {
    const { article } = this.props.value;
    return (
      <div>
        <Grid container>
          <Grid item style={{ background: randomColor() }}>
            ok
            {this.props.value.title}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default NewsCard;
