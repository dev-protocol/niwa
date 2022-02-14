import React from 'react'
import CheckBox from '../../components/CheckBox'

interface TermsCheckBoxProps {
  isChecked: boolean
  setAgreedToTerms: () => {}
}

const TermsCheckBox: React.FC<TermsCheckBoxProps> = ({ isChecked, setAgreedToTerms }) => {
  return (
    <div className="align-center my-md flex">
      <CheckBox
        name="TermsOfService"
        isChecked={isChecked}
        onChange={setAgreedToTerms}
        text="By using Niwa, I agree to the "
      />
      <a
        href="https://github.com/dev-protocol/niwa/blob/main/TERMS-AND-CONDITIONS.md"
        target="_blank"
        rel="noreferrer"
        style={{ marginLeft: '0.2rem' }}
        className="hs-link text-link"
      >
        Terms of Service
      </a>
    </div>
  )
}

export default TermsCheckBox
