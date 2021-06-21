import React, { Component } from "react";
import { getNews, getHeadlines } from "../api";
import TextField from "@material-ui/core/TextField";
import "../styles/news.css";
import NewsCard from "./newsCard";
class NewsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      articles: []
    };
    this.fetchNews = this.fetchNews.bind(this);
    this.fetchHeadlines = this.fetchHeadlines.bind(this);
  }
  componentDidMount() {
    this.fetchHeadlines();
  }
  componentDidUpdate(prevProps) {
    const { search } = this.state;
    if (prevProps.language.value !== this.props.language.value) {
      search ? this.fetchNews() : this.fetchHeadlines();
    }
  }
  fetchHeadlines() {
    getHeadlines(this.props.language.value).then(articles => {
      console.log(articles);
      this.setState({ articles });
    });
  }
  fetchNews() {
    getNews(this.state.search, this.props.language.value).then(articles => {
      console.log(articles);
      this.setState({ articles });
    });
  }
  handleInputChange = event => {
    this.setState({ search: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.fetchNews();
  };
  render() {
    const { articles } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="searchbox">
          <TextField
            id="filled-basic"
            variant="filled"
            size="small"
            label="Search"
            value={this.state.search}
            onChange={this.handleInputChange}
          />
          <input type="submit" value="Submit" />
        </form>
        <div className="newslists">
          {/* change map to forEach  */}
          {(articles || []).map(article => (
            <NewsCard key={article.url} article={article} />
          ))}
        </div>
      </div>
    );
  }
}

export default NewsComponent;
