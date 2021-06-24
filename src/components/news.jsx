import React, { Component } from "react";
import { getNews, getHeadlines } from "../api";
import "../styles/news.css";
import NewsCard from "./newsCard";
import SearchIcon from "@material-ui/icons/Search";
class NewsComponent extends Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.submitRef = React.createRef();
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
  handleKeyDown = e => {
    if (e.key === "Enter") this.fetchNews();
  };

  render() {
    const { articles } = this.state;
    return (
      <div>
        <div className="search_div">
          <form onSubmit={this.handleSubmit} className="search">
            <input
              placeholder="Search"
              value={this.state.search}
              onChange={this.handleInputChange}
              ref={this.inputRef}
              onKeyDown={this.handleKeyDown}
              required
            />
            <button type="submit">
              <SearchIcon />
            </button>
          </form>
        </div>
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
