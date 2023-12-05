import Link from 'next/link';
import React from 'react'

const CallToAction = (props) => {
  return (

    <Link href={props.buttonLink}>
      <button className="bg-primaryTeal hover:bg-navyBlue p-8 w-64 h-12 flex items-center justify-center text-color font-semibold text-white text-lg rounded-md mx-auto md:mx-0">
        {props.buttonName}
      </button>
    </Link>
  );
}

export default CallToAction