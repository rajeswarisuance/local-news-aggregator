export async function getHeadlines(lang) {
  const url = `https://gnews.io/api/v4/top-headlines?lang=${lang}&token=${process.env.REACT_APP_NEWS_KEY}`;
  const headlines = await fetch(url).then(response => response.json());
  return headlines.articles;
}

export async function getNews(search, lang) {
  const url = `https://gnews.io/api/v4/search?q=${search}&lang=${lang}&sortby&token=${process.env.REACT_APP_NEWS_KEY}`;
  const result = await fetch(url).then(response => response.json());
  return result.articles;
}

export async function getWeather(latitude, longitude) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_WEATHER_KEY}&units=metric`;
  const weatherDetails = await fetch(url).then(weather => weather.json());
  return weatherDetails;
}
export async function getIcon(icon) {
  const url = `https://openweathermap.org/img/w/${icon}.png`;
  const weatherIcon = await fetch(url);
  return weatherIcon;
}
