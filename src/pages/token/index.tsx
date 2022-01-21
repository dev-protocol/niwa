import { UndefinedOr } from '@devprotocol/util-ts'
import { FunctionComponent, useState } from 'react'
import { useParams } from 'react-router-dom'
import PageHeader from '../../components/PageHeader'

interface TokenProps {}

const Token: FunctionComponent<TokenProps> = () => {
  const { hash } = useParams()
  const [error, _setError] = useState<UndefinedOr<string>>()

  return (
    <div>
      <PageHeader title={hash ?? ''} />
      {error && <div className="text-red-500">{error}</div>}
    </div>
  )
}

export default Token
