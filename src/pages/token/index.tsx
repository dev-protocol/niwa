import { UndefinedOr } from '@devprotocol/util-ts'
import { FunctionComponent, useState } from 'react'
import { useParams } from 'react-router-dom'
import DPLTitleBar from '../../components/DPLTitleBar'

interface TokenProps {}

const Token: FunctionComponent<TokenProps> = () => {
  const { hash } = useParams()
  const [error, _setError] = useState<UndefinedOr<string>>()

  return (
    <div>
      <DPLTitleBar title={hash ?? ''} />
      {error && <div className="text-red-500">{error}</div>}
    </div>
  )
}

export default Token
