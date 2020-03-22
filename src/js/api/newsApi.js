import ERRORS from '../constants/errorMessages';

class NewsApi {
  constructor(props) {
    this.url = props.newsUrl;
  }

  async getNews(searchString, timeSpan) {
    const dateNow = new Date();
    const dateFrom = new Date(dateNow.getTime() - timeSpan);
    const dateToStr = `${dateNow.getFullYear()}-${dateNow.getMonth() + 1}-${dateNow.getDate()}`;
    const dateFromStr = `${dateFrom.getFullYear()}-${dateFrom.getMonth() + 1}-${dateFrom.getDate()}`;
    const url = `${this.url}&q='${encodeURI(searchString)}'&from=${dateFromStr}&to=${dateToStr}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw ERRORS.badSearchQuery;
      }
      let data = await response.json();
      data = data.articles.map((article) => ({
        date: new Date(Date.parse(article.publishedAt)),
        title: article.title,
        text: article.description,
        image: article.urlToImage,
        source: article.source.name,
        link: article.url,
        keyword: searchString,
      }));
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default NewsApi;
