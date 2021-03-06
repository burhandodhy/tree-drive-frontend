import React, { Component } from "react";
import { connect } from "react-redux";
import { getPosts } from "../../actions/posts";
import PostCard from "../layout/PostCard";
import PostPagination from "../layout/PostPagination";
import Loader from "../common/Loader";
import { PropTypes } from "prop-types";

class Posts extends Component {
  constructor(props) {
    super(props);
    this.props.getPosts();
  }

  static propTypes = {
    posts: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired
  };

  paginatePost = (event, pageNo) => {
    event.preventDefault();
    this.props.getPosts(pageNo);
  };

  render() {
    if (!this.props.isLoading && Object.entries(this.props.posts).length > 0) {
      const { next, previous, current } = this.props.posts.pages;
      let html = this.props.posts.results.map((post, key) => {
        return <PostCard key={key} post={post} />;
      });

      return (
        <div className="">
          <div className="row justify-content-around">{html}</div>
          <PostPagination
            currentPage={current}
            previousPage={previous}
            nextPage={next}
            paginatePost={this.paginatePost}
          />
        </div>
      );
    } else {
      return <Loader />;
    }
  }
}

const mapStateToProps = state => ({
  posts: state.posts.all_posts,
  isLoading: state.posts.isLoading
});
export default connect(mapStateToProps, { getPosts })(Posts);
