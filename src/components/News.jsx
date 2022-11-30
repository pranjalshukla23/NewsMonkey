import { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  //runs first
  //constructor(props) {
  //  super(props);
  //  console.log("hello");
  //  this.state = {
  //    articles: [],
  //    loading: false,
  //    page: 1,
  //    totalResults: 0,
  //  };
  //
  //  document.title = `${props.category} - NewsMonkey`;
  //}

  const updateNews = async (pageNo) => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${pageNo}&pageSize=${props.pageSize}`;

    setLoading(true);

    let data = await fetch(url);

    props.setProgress(50);

    let parsedData = await data.json();

    setLoading(false);
    setTotalResults(parsedData.totalResults);

    props.setProgress(100);

    return parsedData;
  };

  const getNews = async () => {
    const parsedData = await updateNews(page);

    setArticles(parsedData.articles);
    setTotalResults(Number.parseInt(parsedData.totalResults));
    setLoading(false);
  };
  //runs after the render method
  useEffect(() => {
    getNews();
  }, []);

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&category=${props.category}&apiKey=21f1ab7314a64814bd9b16e88f2b4105&page=${
      page + 1
    }&pageSize=${props.pageSize}`;

    setPage(page + 1);

    setLoading(true);

    let data = await fetch(url);

    let parsedData = await data.json();

    setLoading(false);

    setArticles(articles.concat(parsedData.articles));

    setTotalResults(parsedData.totalResults);

    return parsedData;
  };

  //renders the UI
  return (
    <div className="container my-3">
      <h1
        className="text-center"
        style={{
          margin: "90px",
        }}
      >
        NewsMonkey - Top Headlines
      </h1>
      {loading && <Spinner />}
      <div className="row">
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
        />

        <div className="container"></div>
        {articles.map((article) => {
          return (
            <div key={article.url} className="col-md-4">
              <NewsItem
                title={article.title ? article.title : ""}
                description={article.description ? article.description : ""}
                imageUrl={
                  article.urlToImage
                    ? article.urlToImage
                    : "https://images.indianexpress.com/2022/11/Leo-I-pr112822-lores.jpg"
                }
                newsUrl={article.url}
                author={article.author ? article.author : "unknown"}
                date={article.publishedAt}
                source={article.source ? article.source : ""}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
  totalResults: 0,
  apiKey: "21f1ab7314a64814bd9b16e88f2b4105",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  totalResults: PropTypes.number,
  apiKey: PropTypes.string,
};

export default News;