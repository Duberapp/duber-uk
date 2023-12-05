import Image from 'next/image'
import React from 'react'

const ImageLeft = (props) => {
  return (
    <div className="grid md:grid-cols-2 grid-flow-row-dense md:space-x-10 justify-items-center items-center text-center md:text-left">
      <div className="w-72 order-last md:order-first">
        <Image
        alt="Map of UK"
        src={props.image}
        width={350}
        height={426}
        />
      </div>
      <div className="max-w-xs text-navyBlue">
          <p className="text-xl uppercase font-bold">{props.title}</p>
          <p className="md:mt-8 mt-4 pb-5 md:pb-0 text-sm font-normal">{props.description}</p>
      </div>
    </div>
  )
}

export default ImageLeft