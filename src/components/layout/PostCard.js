import React from "react";

function PostCard(props) {
 
  return (
    <div className="card mb-4 col-5">
      <img className="card-img-top" src={props.post.feature_image} alt="" />
      <div className="card-body">
        <h2 className="card-title">{props.post.title}</h2>
        <p className="card-text">{props.post.content}</p>
        <a href={"#/blog/" + props.post.id} className="btn btn-primary">
          Read More →
        </a>
      </div>
      <div className="card-footer text-muted">
        Posted on {props.post.created} by {props.post.author}
      </div>
    </div>
  );
}

export default PostCard;
