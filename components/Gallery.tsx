import Image from 'next/image'
import React from 'react'

const Gallery = ({productMedia}: {productMedia: string []}) => {
  return (
    <div className='flex flex-col gap-3 max-w-[500px]'>
      <Image src={productMedia[0]} alt="product" width={500} height={500} className='w-96 h-96 rounded-lg shadow-lg object-cover'/>
    </div>
  )
}

export default Gallery