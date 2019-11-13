import React, { Component } from "react";
import { connect } from "react-redux";
import { getSinglePost, likePost, dislikePost } from "../../actions/posts";
import Lightbox from "react-image-lightbox";
import Error from "../layout/Error";
import "react-image-lightbox/style.css";
import PropTypes from "prop-types";

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
      created_on,
      gallery_image_1,
      gallery_image_2
    } = this.props.post;

    const images = [gallery_image_1, gallery_image_2];

    if (this.props.error.detail) {
      return <Error error={this.props.error.detail} />;
    } else {
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

                  <div className="col-lg-3 col-md-4 col-6">
                    <img
                      onClick={() => this.setState({ isOpen: true })}
                      className="img-fluid img-thumbnail"
                      src={gallery_image_1}
                      alt=""
                    />
                  </div>

                  <div className="col-lg-3 col-md-4 col-6">
                    <img
                      onClick={() => this.setState({ isOpen: true })}
                      className="img-fluid img-thumbnail"
                      src={gallery_image_2}
                      alt=""
                    />
                  </div>
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
                  Posted on {created_on} by {author}
                </div>
              </div>
            </div>
          </div>

          {isOpen && (
            <Lightbox
              mainSrc={images[photoIndex]}
              nextSrc={images[(photoIndex + 1) % images.length]}
              prevSrc={images[(photoIndex + images.length - 1) % images.length]}
              onCloseRequest={() => this.setState({ isOpen: false })}
              onMovePrevRequest={() =>
                this.setState({
                  photoIndex: (photoIndex + images.length - 1) % images.length
                })
              }
              onMoveNextRequest={() =>
                this.setState({
                  photoIndex: (photoIndex + 1) % images.length
                })
              }
            />
          )}
        </React.Fragment>
      );
    }
  }
}

const mapStateToProps = state => ({
  post: state.posts.post,
  error: state.posts.error
});
export default connect(
  mapStateToProps,
  { getSinglePost, likePost, dislikePost }
)(SinglePost);
