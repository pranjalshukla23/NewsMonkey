import { Component } from "react";

const NewsItem = ({
  title,
  description,
  newsUrl,
  imageUrl,
  author,
  date,
  source,
}) => {
  return (
    <div className="my-3 position-relative">
      <span
        className="translate-middle badge rounded-pill bg-danger"
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          zIndex: 100,
        }}
      >
        {source.name}
      </span>
      <div className="card">
        <div className="card-body">
          <img src={imageUrl} className="card-img-top" alt="..." />
          <h5 className="card-title">{title}...</h5>
          <p className="card-text">{description}...</p>
          <p className="card-text">
            <small className="text-muted">
              By {author} on {new Date(date).toUTCString()}
            </small>
          </p>
          <a href={newsUrl} target="_blank" className="btn btn-primary btn-sm">
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;