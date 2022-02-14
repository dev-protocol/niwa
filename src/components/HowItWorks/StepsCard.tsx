import React from 'react'

interface StepsCardProps {
  label?: string | React.ReactElement
  media?: string
  mediaAlt?: string
}

const StepsCard: React.FC<StepsCardProps> = ({ label, media, mediaAlt }) => {
  return (
    <div>
      {media && <img src={media} alt={mediaAlt} />}
      <h3 className="text-center font-bold">{label}</h3>
    </div>
  )
}

export default StepsCard
