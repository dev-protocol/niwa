import React, { useEffect, useState } from 'react'
import BackButton from '../../components/BackButton'
import DPLTitleBar from '../../components/DPLTitleBar'
import AppGridItem from './AppGridItem'
import { UndefinedOr } from '@devprotocol/util-ts'
import Card from '../../components/Card'

interface AppsPageProps {}

export type AppItem = {
  name: string
  url: string
  description: string
  logoUrl: string
}

const AppsPage: React.FC<AppsPageProps> = () => {
  const [apps, setApps] = useState<AppItem[]>([])
  const [error, setError] = useState<UndefinedOr<string>>()

  useEffect(() => {
    fetchAppsList()
  }, [])

  const fetchAppsList = async () => {
    try {
      const res = await fetch('https://raw.githubusercontent.com/dev-protocol/niwa/main/dapps.json')
      const appsList: AppItem[] = await res.json()
      setApps(appsList)
    } catch (error) {
      setError(String(error))
      console.error('error fetching apps list: ', error)
    }
  }

  return (
    <div>
      <BackButton title="Home" path="/" />
      <DPLTitleBar title="Apps using Dev Protocol" className="mb-md" />
      <div className="grid grid-cols-1 gap-sm sm:grid-cols-2">
        {apps.map(app => (
          <AppGridItem key={app.url} title={app.name} url={app.url} description={app.description} logo={app.logoUrl} />
        ))}
      </div>
      {error && (
        <Card>
          <p className="text-red">{error}</p>
        </Card>
      )}
    </div>
  )
}

export default AppsPage
