import React from "react";
import video from "/hm.mp4"


export function Video() {
    return (
      <video loop={true} controls={false} muted autoPlay={true}>
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    )
  }