const express = require('express')
const cloudinary = require('cloudinary')
const formData = require('express-form-data')
const cors = require('cors')
const { CLIENT_ORIGIN } = require('./config')

const app = express()

cloudinary.config({
  cloud_name: your_cloud_name,
  api_key: your_cloud_key,
  api_secret: your_cloud_secret,
})

app.use(cors({
  origin: CLIENT_ORIGIN
}))

app.use(formData.parse())

app.get('/get-up', (req, res) => res.send('👌'))

app.post('/image-upload', (req, res) => {

  const values = Object.values(req.files)
  const promises = values.map(image => cloudinary.uploader.upload(image.path))

  Promise
    .all(promises)
    .then(results => res.json(results))
    .catch((err) => res.status(400).json(err))
})

app.listen(8080, () => console.log('👍'))