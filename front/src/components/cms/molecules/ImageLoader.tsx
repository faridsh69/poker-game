import { useRef, useState } from 'react'

import { Skeleton } from '@mui/material'

import classNames from 'classnames'

export const ImageLoader = (props: any) => {
  const { src, alt, className, width, height, loadingColor } = props

  const imageRef = useRef(null)

  const [isLoadingImage, setIsLoadingImage] = useState<boolean>(true)

  const handleLoadImage = () => {
    setIsLoadingImage(false)
  }

  return (
    <div
      className={classNames('image-loader', className)}
      style={{ height: height, width: width, backgroundColor: loadingColor }}
    >
      {isLoadingImage && (
        <Skeleton
          animation='wave'
          variant='rectangular'
          className='image-loader-skeleton'
          height={height}
          width={width}
        />
      )}
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        className={classNames('image-loader-img', isLoadingImage && 'image-loader-isloading')}
        onLoad={handleLoadImage}
        height={height}
        width={width}
      />
    </div>
  )
}
