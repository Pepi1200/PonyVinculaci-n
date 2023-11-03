import React from 'react';

const VideoPlayer = ({ videoURL }) => {
  return (
    <div>
      <video controls width="355" height="200">
        <source src={`../../Videos/${videoURL}`} type="video/mp4" />
        Tu navegador no soporta la reproducción de videos.
      </video>
    </div>
  );
};

export default VideoPlayer;
