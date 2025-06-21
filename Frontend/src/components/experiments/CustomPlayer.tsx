import React from 'react'
import ReactPlayer from 'react-player'

interface Theory {
  title: string
  content: string
}

interface Props {
  videoUrl: string
  theory?: Theory
}

const CustomVideoPlayer: React.FC<Props> = ({ videoUrl, theory }) => (
  <div className="space-y-6">
    <div className="aspect-video w-full bg-black rounded-lg overflow-hidden">
      <ReactPlayer
        url={videoUrl}
        controls
        width="100%"
        height="100%"
        config={{ youtube: { playerVars: { modestbranding: 1, rel: 0 } } }}
      />
    </div>

    {theory && (
      <div className="prose max-w-none">
        <h3>{theory.title}</h3>
        <p>{theory.content}</p>
      </div>
    )}
  </div>
)

export default CustomVideoPlayer
