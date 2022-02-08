import React from 'react'

interface StepsCardProps {
  label?: string
  media?: string
  mediaAlt?: string
}

const StepsCard: React.FC<StepsCardProps> = ({ label, media, mediaAlt }) => {
  return (
    <div>
      {media && <img src={media} alt={mediaAlt} />}
      <h3 className="font-bold text-center">{label}</h3>
    </div>
  )
}

export default StepsCard
