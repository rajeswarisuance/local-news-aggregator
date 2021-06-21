const apiToken = "53d40ad6a6655fadcf3e4a83a1cb4ba2";
const weather_api_key = "403f30534d6f69169bd1916b21e47810";

export async function getHeadlines(lang) {
  const url = `https://gnews.io/api/v4/top-headlines?lang=${lang}&token=${apiToken}`;
  const headlines = await fetch(url).then(response => response.json());
  return headlines.articles;
}

export async function getNews(search, lang) {
  const url = `https://gnews.io/api/v4/search?q=${search}&lang=${lang}&sortby&token=${apiToken}`;
  const result = await fetch(url).then(response => response.json());
  return result.articles;
}

export async function getWeather(latitude, longitude) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weather_api_key}&units=metric`;
  const weatherDetails = await fetch(url).then(weather => weather.json());
  return weatherDetails;
}
export async function getIcon() {
  const url = `https://openweathermap.org/img/w/04n.png`;
  const weatherIcon = await fetch(url).then(weather => weather.json());
  return weatherIcon;
}
