import React, { Component } from "react";
// import { Grid } from "@material-ui/core";
// import randomColor from "randomcolor";

class NewsCard extends Component {
  state = {
    value: this.props.value
  };
  render() {
    console.log(this.props);
    return <div>Article</div>;
  }
}

export default NewsCard;
