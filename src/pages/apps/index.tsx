import React from 'react'
import BackButton from '../../components/BackButton'
import DPLTitleBar from '../../components/DPLTitleBar'
import AppGridItem from './AppGridItem'
import StakesSocial from '../../img/Stakes-social.svg'
import UZomia from '../../img/uzomia.svg'

interface AppsPageProps {}

const AppsPage: React.FC<AppsPageProps> = () => {
  return (
    <div>
      <BackButton title="Home" path="/" />
      <DPLTitleBar title="Apps using Dev Protocol" className="mb-md" />
      <div className="grid grid-cols-1 gap-sm sm:grid-cols-2">
        <AppGridItem
          title="Stakes Social"
          url="https://stakes.social"
          description="Explore projects and support your favorite creators"
          logo={StakesSocial}
        />
        <AppGridItem
          title="μ-zomia"
          url="https://mzomia.social/"
          description="μ-zomia is a platform and community for people who love music, people who are involved in music, and people who want to support it to support each other."
          logo={UZomia}
        />
      </div>
    </div>
  )
}

export default AppsPage
