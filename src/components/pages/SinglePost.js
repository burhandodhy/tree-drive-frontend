import React, { Component } from "react";
import { connect } from "react-redux";
import { getSinglePost, likePost, dislikePost } from "../../actions/posts";
import Lightbox from "react-image-lightbox";
import Error from "../layout/Error";
import "react-image-lightbox/style.css";
import PropTypes from "prop-types";
import Loader from "../common/Loader";

class SinglePost extends Component {
 
  static propTypes = {
    post: PropTypes.object.isRequired,
    error: PropTypes.object.isRequired,
    getSinglePost: PropTypes.func.isRequired,
    dislikePost: PropTypes.func.isRequired,
    likePost: PropTypes.func.isRequired
  };

  state = {
    photoIndex: 0,
    isOpen: false,
    images: []
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getSinglePost(id);
  }

  likePost = () => {
    const { id } = this.props.match.params;
    this.props.likePost(id);
  };

  dislikePost = () => {
    const { id } = this.props.match.params;
    this.props.dislikePost(id);
  };

  render() {
    const { photoIndex, isOpen } = this.state;

    const {
      title,
      feature_image,
      author,
      content,
      created,
      gallery
    } = this.props.post; 
    
    if (!this.props.isLoading && Object.entries(this.props.post).length > 0) {
      if (this.props.error.detail) {
        return <Error error={this.props.error.detail} />;
      } else {
        const gallery_html = gallery.map((val, index) => {
          return (
            <div className="col-lg-3 col-md-4 col-6" key={index}>
              <img
                onClick={() => this.setState({ isOpen: true })}
                className="img-fluid img-thumbnail"
                src={val.image}
                alt=""
              />
            </div>
          );
        });
        return (
          <React.Fragment>
            <div className="row">
              <div className="col-md-12">
                <h2 className="card-title my-4">{title}</h2>

                <div className="card mb-4">
                  <img className="card-img-top" src={feature_image} alt="" />
                  <div className="card-body">
                    <p className="card-text">{content}</p>
                  </div>

                  <div className="card-body row text-center text-lg-left">
                    <div className="col-md-12">
                      <h4 className="font-weight-light text-center text-lg-left my-4 mb-0">
                        Gallery
                      </h4>
                    </div>
                    {gallery_html}
                  </div>
                  <hr className="my-4"></hr>

                  <div className="row justify-content-around my-4">
                    <button
                      type="button"
                      className="col-md-2 btn btn-outline-success"
                      onClick={this.likePost}
                    >
                      Like
                    </button>
                    <button
                      type="button"
                      className="col-md-2 btn btn-outline-danger"
                      onClick={this.dislikePost}
                    >
                      Dislike
                    </button>
                  </div>

                  <div className="card-footer text-muted">
                    Posted on {created} by {author}
                  </div>
                </div>
              </div>
            </div>

            {isOpen && (
              <Lightbox
                mainSrc={gallery[photoIndex].image}
                nextSrc={gallery[(photoIndex + 1) % gallery.length].image}
                prevSrc={
                  gallery[(photoIndex + gallery.length - 1) % gallery.length]
                    .image
                }
                onCloseRequest={() => this.setState({ isOpen: false })}
                onMovePrevRequest={() =>
                  this.setState({
                    photoIndex:
                      (photoIndex + gallery.length - 1) % gallery.length
                  })
                }
                onMoveNextRequest={() =>
                  this.setState({
                    photoIndex: (photoIndex + 1) % gallery.length
                  })
                }
              />
            )}
          </React.Fragment>
        );
      }
    } else {
      return <Loader />;
    }
  }
}

// const mapStateToProps = state => ({
//   post: state.posts.post,
//   error: state.posts.error,
//   isLoading: state.posts.isLoading
// });

const mapStateToProps = state => {
  return {
    post: state.posts.post,
      error: state.posts.error,
      isLoading: state.posts.isLoading
  };
};

export default connect(mapStateToProps, {
  getSinglePost,
  likePost,
  dislikePost
})(SinglePost);
