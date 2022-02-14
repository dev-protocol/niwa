import React from 'react'
import styles from './MarkdownPage.module.scss' // Import regular stylesheet
import Card from '../../components/Card'

interface MarkdownPageProps {}

const MarkdownPage: React.FC<MarkdownPageProps> = ({ children }) => {
  return (
    <Card>
      <div className={styles.markdown}>{children}</div>
    </Card>
  )
}

export default MarkdownPage
