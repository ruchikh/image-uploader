import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { Image, Transformation, CloudinaryContext } from 'cloudinary-react';

import { imageData } from './data/cropImageData';

export default props =>
    props.images.map((image, i) =>
        <div key={i} className='fadein imageblock'>
            <div
                onClick={() => props.removeImage(image.public_id)}
                className='delete'
            >
                <FontAwesomeIcon icon={faTimesCircle} size='2x' />
            </div>
            {imageData && imageData.map((img, i) =>
                <CloudinaryContext cloudName="dzfc5mcvy" className="cropimage" key={i}>
                    <div className="title">Size {img.height} X {img.width}</div>
                    <Image
                        publicId={image.public_id}
                        onError={() => props.onError(image.public_id)}
                    >
                        <Transformation height={img.height} gravity="faces" width={img.width} crop="fill" />
                    </Image>
                </CloudinaryContext>
            )}
        </div>
    )