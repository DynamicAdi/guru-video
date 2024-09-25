import React from "react";
import video from "/hm.mp4"


export function Video() {
    return (
      <video autoPlay loop playsInline controls={false} preload="none">
        <source src={'/hm.mp4'} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    )
  }