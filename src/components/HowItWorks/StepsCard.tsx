import React from 'react'

interface StepsCardProps {
  label?: string
  media?: string
  mediaAlt?: string
}

const StepsCard: React.FC<StepsCardProps> = ({ label, media, mediaAlt }) => {
  return (
    <div className="steps-card">
      {media && <img src={media} alt={mediaAlt} className="steps-card__media" />}
      <h3>{label}</h3>
    </div>
  )
}

export default StepsCard
