import React from 'react'
import { FaRegCopy } from 'react-icons/fa'

interface CopyButtonProps {
  textToCopy: string
}

const CopyButton: React.FC<CopyButtonProps> = ({ textToCopy }) => {
  const copyToClipboard = () => navigator.clipboard.writeText(textToCopy)

  return (
    <button className="active:text-success" onClick={copyToClipboard}>
      <FaRegCopy />
    </button>
  )
}

export default CopyButton
