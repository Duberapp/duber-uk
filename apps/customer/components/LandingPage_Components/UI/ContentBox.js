import React from 'react'

const ContentBox = (props) => {
  return (
    <div className="flex shrink-0 items-start rounded-xl bg-white p-4 shadow-lg">
            <div>
              <h2 className="font-semibold">{props.title}</h2>
              <p className="mt-2 text-sm font-normal">{props.description}</p>
            </div>
          </div>
  )
}

export default ContentBox;