import React from 'react'
import { Video } from './video'

function VideoScreen() {
  return (
    <div className='videoScreen' style={{width: '100%', objectFit: 'cover', height: "100%"}}>
        <Video />
    </div>
  )
}

export default VideoScreen