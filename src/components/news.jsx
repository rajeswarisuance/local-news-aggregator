import React, { Component } from "react";
import { getNews } from "../api";
import Select from "react-select";
import "./news.css";
import NewsCard from "./newsCard";
const languages = [
  { label: "Arabic", value: "ar" },
  { label: "German", value: "de" },
  { label: "Greek", value: "el" },
  { label: "English", value: "en" },
  { label: "Spanish", value: "es" },
  { label: "French", value: "fr" },
  { label: "Hebrew", value: "he" },
  { label: "Hindi", value: "hi" },
  { label: "Italian", value: "it" },
  { label: "Japanese", value: "ja" },
  { label: "Malayalam", value: "ml" },
  { label: "Marathi", value: "mr" },
  { label: "Dutch", value: "nl" },
  { label: "Norwegian", value: "no" },
  { label: "Portuguese", value: "pt" },
  { label: "Romanian", value: "ro" },
  { label: "Russian", value: "ru" },
  { label: "Swedish", value: "sv" },
  { label: "Tamil", value: "ta" },
  { label: "Telugu", value: "te" },
  { label: "Ukrainian", value: "uk" },
  { label: "Chinese", value: "zh" }
];

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
      <div className="searchbox">
        <form onSubmit={this.handleSubmit}>
          <label>
            Search:
            <input
              type="text"
              value={this.state.search}
              onChange={this.handleInputChange}
            />
          </label>
          <Select
            placeholder="Select language"
            className="select"
            value={lang}
            onChange={this.handleSelectChange}
            options={languages}
            defaultValue={{ label: "English", value: "en" }}
          />
          <input type="submit" value="Submit" />
        </form>
        {articles.map(article => (
          <NewsCard key={article.title} value={article} />
        ))}
      </div>
    );
  }
}

export default NewsComponent;
