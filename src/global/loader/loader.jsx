import React from 'react'
import './loader.scss'

function SmallLoader({height}) {
  return (
    <div className="main" style={{height: height || '100vh'}}>
    <span className="loader"></span>
    </div>
  )
}

export default SmallLoader