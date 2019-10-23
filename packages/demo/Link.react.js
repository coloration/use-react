import React, { useState } from 'react'

const STATUS = {
  HOVERED: 'hovered',
  NORMAL: 'normal'
}

export default function (props) {

  const [className, setClassName] = useState(STATUS.NORMAL)

  return (
    <a 
      className={className}
      href={props.page || '#'}
      onMouseEnter={() => setClassName(STATUS.HOVERED)}
      onMouseLeave={() => setClassName(STATUS.NORMAL)}
    >
      {props.children}
    </a>
  )
}

