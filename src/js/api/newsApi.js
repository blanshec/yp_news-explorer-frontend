import ERRORS from "../constants/errorMessages";

class NewsApi {
  constructor(props) {
    this.url = props.newsUrl;
  }

  getNews(searchString, timeSpan) {
    const dateNow = new Date();
    const dateFrom = new Date(dateNow.getTime() - timeSpan);
    const dateToStr = `${dateNow.getFullYear()}-${dateNow.getMonth() + 1}-${dateNow.getDate()}`;
    const dateFromStr = `${dateFrom.getFullYear()}-${dateFrom.getMonth() + 1}-${dateFrom.getDate()}`;
    const url = `${this.url}&q='${encodeURI(searchString)}'&from=${dateFromStr}&to=${dateToStr}`;

    return fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error(ERRORS.newsSearchQueryError);
        }
        return res.json();
      })
      .then((data) => {
        return data.articles.map((article) => {
          return {
            date: new Date(Date.parse(article.publishedAt)),
            title: article.title,
            text: article.description,
            image: article.urlToImage,
            source: article.source.name,
            link: article.url,
            keyword: searchString,
          }
        });
      })
      .catch(() => { });
  }
}

export default NewsApi;
