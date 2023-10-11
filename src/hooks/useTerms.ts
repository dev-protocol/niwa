import { useEffect, useState } from 'react'
import { TERMS_OF_SERVICE_URL } from '../const'

/**
 * Fetches the terms and conditions from the TERMS_OF_SERVICE_URL const
 */
export const useTerms = () => {
  const [terms, setTerms] = useState('')

  const fetchTerms = async () => {
    const response = await fetch(TERMS_OF_SERVICE_URL)
    const terms = await response.text()
    setTerms(terms)
  }

  useEffect(() => {
    fetchTerms()
  }, [])

  return { terms }
}
