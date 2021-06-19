import React, { Component } from "react";
import { getNews } from "../api";
import Select from "react-select";
import TextField from "@material-ui/core/TextField";

import "./news.css";
import NewsCard from "./newsCard";
// import * as data from "../language";
class NewsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      lang: null,
      articles: []
    };
    this.fetchNews = this.fetchNews.bind(this);
  }
  componentDidMount() {
    // this.fetchNews();
  }
  fetchNews() {
    getNews(this.state.search, this.state.lang.value).then(articles => {
      console.log(articles);
      this.setState({ articles });
    });
  }
  handleInputChange = event => {
    this.setState({ search: event.target.value });
  };
  handleSelectChange = lang => {
    this.setState({ lang });
  };
  handleSubmit = event => {
    console.log(this.state.search);
    console.log(this.state.lang);
    this.fetchNews();
    event.preventDefault();
  };
  render() {
    const { lang, articles } = this.state;
    return (
      <div>
        {/* <Select
          placeholder="Language"
          className="select"
          value={lang}
          onChange={this.handleSelectChange}
          options={languages}
          defaultValue={{ label: "English", value: "en" }}
        /> */}

        <div id="cover">
          <form>
            <div className="tb">
              <div className="td">
                <input type="text" placeholder="Search" required />
              </div>
              <div className="td" id="s-cover">
                <button type="submit">
                  <div id="s-circle"></div>
                  <span></span>
                </button>
              </div>
            </div>
          </form>
        </div>

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
        {articles.map(article => (
          <NewsCard key={article.url} value={article} />
        ))}
      </div>
    );
  }
}

export default NewsComponent;
