import React, { useState } from 'react'
import { ReactComponent as TermsAndConditions } from '../../../TERMS-AND-CONDITIONS.md'
import styles from '../markdown-page/MarkdownPage.module.scss' // Import regular stylesheet
import HSButton from '../../components/HSButton'

interface TermsModalProps {
  visible: boolean
  onConfirm: () => {}
}

const TermsModal: React.FC<TermsModalProps> = ({ onConfirm, visible }) => {
  const [acceptEnabled, setAcceptEnabled] = useState(false)

  const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const target = e.target as HTMLDivElement
    const bottom = target.scrollHeight - target.scrollTop === target.clientHeight
    if (bottom) {
      setAcceptEnabled(true)
    }
  }

  return visible ? (
    <div
      id="terms-modal"
      className="fixed flex justify-center items-center top-0 left-0 right-0 z-50 h-[calc(100%-1rem)] max-h-full w-full overflow-y-auto overflow-x-hidden p-4 md:inset-0 bg-black bg-opacity-10"
      onClick={() => (visible = false)}
    >
      <div className="relative max-h-full w-full max-w-2xl">
        <div className="relative rounded-lg bg-white shadow">
          <div className="content h-72 overflow-y-scroll p-4" onScroll={handleScroll}>
            <div className={styles.markdown}>
              <TermsAndConditions />
            </div>
          </div>

          <div className="flex items-center space-x-2 rounded-b border-t border-gray-200 p-6 dark:border-gray-600">
            <HSButton isDisabled={!acceptEnabled} onClick={onConfirm} type="filled">
              I Accept
            </HSButton>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div></div>
  )
}

export default TermsModal
