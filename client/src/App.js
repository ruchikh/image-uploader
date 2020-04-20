import React, { Component } from 'react';
import Notifications, { notify } from 'react-notify-toast';

import Spinner from './Spinner';
import Buttons from './Buttons';
import { API_URL } from './config';
import CropImage from './CropImage';
import './App.css'

const toastColor = {
  background: '#505050',
  text: '#fff'
}

export default class App extends Component {

  state = {
    loading: true,
    uploading: false,
    images: []
  }

  componentDidMount() {
    fetch(`${API_URL}/get-up`)
      .then(res => {
        if (res.ok) {
          return this.setState({ loading: false })
        }
        const msg = 'Something is went wrong with Heroku'
        this.toast(msg, 'custom', 2000, toastColor)
      })
  }

  toast = notify.createShowQueue()

  onChange = e => {
    const errs = []
    const files = Array.from(e.target.files)

    const formData = new FormData()
    const types = ['image/png', 'image/jpeg', 'image/gif']

    files.forEach((file, i) => {
      const image = new Image();
      image.src = window.URL.createObjectURL(file)

      image.onload = () => {
        const imageHeight = image.naturalHeight;
        const imageWidth = image.naturalWidth;

        if (imageHeight !== 1024 && imageWidth !== 1024) {
          errs.push(`'${file.name}' is not a 1024X1024 size`)
        }

        if (errs.length) {
          return errs.forEach(err => this.toast(err, 'custom', 2000, toastColor))
        }

        if (types.every(type => file.type !== type)) {
          errs.push(`'${file.type}' is not a supported format`)
        }

        formData.append(i, file)
        this.setState({ uploading: true })

        fetch(`${API_URL}/image-upload`, {
          method: 'POST',
          body: formData
        })
          .then(res => {
            if (!res.ok) {
              throw res
            }
            return res.json()
          })
          .then(images => {
            this.setState({
              uploading: false,
              images
            })
          })
          .catch(err => {
            err.json().then(e => {
              this.toast(e.message, 'custom', 2000, toastColor)
              this.setState({ uploading: false })
            })
          })
      }
    })

  }

  filter = id => {
    return this.state.images.filter(image => image.public_id !== id)
  }

  removeImage = id => {
    this.setState({ images: this.filter(id) })
  }

  onError = id => {
    this.toast('Oops, something went wrong', 'custom', 2000, toastColor)
    this.setState({ images: this.filter(id) })
  }

  render() {
    const { state, removeImage, onError, onChange } = this,
      { uploading, images } = state

    const content = () => {
      switch (true) {
        case uploading:
          return <Spinner />
        case images.length > 0:
          return <CropImage
            images={images}
            removeImage={removeImage}
            onError={onError}
          />
        default:
          return <Buttons onChange={onChange} />
      }
    }

    return (
      <div className='container'>
        <Notifications />
        <div className='buttons'>
          {content()}
        </div>
      </div>
    )
  }
}
