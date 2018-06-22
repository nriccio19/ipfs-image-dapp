import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import Spinner from '../common/Spinner'
import ImageItem from './ImageItem'
import { getImages } from '../../actions/imageActions'

class Images extends Component {
  static propTypes = {
    getImages: PropTypes.func.isRequired,
    image: PropTypes.object.isRequired,
  }

  componentDidMount = () => {
    this.props.getImages()
  }

  render() {
    let { images, loading } = this.props.image
    let imageItems

    if (images === null || loading) {
      imageItems = <Spinner />
    } else {
      if (images.length > 0) {
        imageItems = images.map((image) => (
          <ImageItem key={image.ipfsHash} image={image} />
        ))
      } else {
        imageItems = <h4>No images found</h4>
      }
    }

    return (
      <div>
        <section className="jumbotron text-center">
          <div className="container">
            <h1 className="jumbotron-heading">Images</h1>
            <p className="lead text-muted">
              Upload images to IPFS and store the IPFS hash on the Ethereum
              Blockchain.
            </p>
            <p>
              <Link to="/uploadimage" className="btn btn-primary my-2">
                Upload Image
              </Link>
            </p>
          </div>
        </section>
        <div className="album py-5 bg-light">
          <div className="container">
            <div className="row">{imageItems}</div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  image: state.image,
})

export default connect(
  mapStateToProps,
  { getImages }
)(Images)
