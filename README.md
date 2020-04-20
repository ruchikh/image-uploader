## Getting Started

```
git clone https://github.com/ruchikh/image-uploader.git
cd image-uploader/client
npm i && npm start
// open new terminal
cd image-uploader/server
npm i && npm run dev
```

#### To run this project you need a Cloudinary account. 
You can sign up with Cloudinary [here](https://cloudinary.com/users/register/free).  Afterwards you will need to plug your keys into a *.env* file that needs to be created as well. 

```shell
// server/.env
CLOUD_NAME=your_cloud_name
API_KEY=your_cloud_key
API_SECRET=your_cloud_secret
```