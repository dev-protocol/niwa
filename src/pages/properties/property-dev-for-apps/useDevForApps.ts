import { UndefinedOr } from '@devprotocol/util-ts'
import { useState, Dispatch, SetStateAction, ChangeEvent, useEffect } from 'react'
import { usePropertyOutlet } from '..'
import { useProvider } from '../../../context/walletContext'
import { isError, strapiEndpoint } from '../../../utils/utils'

type PropertyLinks = {
  github?: string
  twitter?: string
  website?: string
}

export type ImageFormat = {
  url: string
  width: number
  height: number
  hash: string
  name: string
  mime: string
  size: number
}

export type Image = ImageFormat & {
  id: number
  formats?: {
    thumbnail: ImageFormat
    small: ImageFormat
    medium: ImageFormat
    large: ImageFormat
  }
}

export type NullableImage = Image | null

export interface StrapiProperty {
  id: number
  address: string
  name: string
  description: string
  cover_image: NullableImage
  avatar: NullableImage
  links?: PropertyLinks
  error?: string
}

const postProperty = (
  signMessage: string,
  signature: string,
  address: string,
  propertyAddress: string,
  name?: string,
  description?: string,
  links?: PropertyLinks
): Promise<StrapiProperty> =>
  fetch(`${strapiEndpoint}/properties`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify({
      name,
      description,
      links,
      account_address: address,
      address: propertyAddress,
      signature,
      signMessage
    })
  }).then(res => res.json())

export const useDevForApps = () => {
  const [error, setError] = useState<UndefinedOr<string>>()
  const [isValid, setIsValid] = useState(false)
  const [description, setDescription] = useState('')
  const [coverImage, setCoverImage] = useState<UndefinedOr<File>>()
  const [avatar, setAvatar] = useState<UndefinedOr<File>>()
  const [gitHubLink, setGitHubLink] = useState('')
  const [twitterLink, setTwitterLink] = useState('')
  const [websiteLink, setWebsiteLink] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { ethersProvider } = useProvider()
  const [propertyAddress, setPropertyAddress] = useState<UndefinedOr<string>>()
  const { propertyDetails } = usePropertyOutlet()

  const handleFile = async (e: ChangeEvent<HTMLInputElement>, cb: Dispatch<SetStateAction<UndefinedOr<File>>>) => {
    const files = e.currentTarget.files
    if (!files || (files && files.length <= 0)) {
      setError('No File Found')
      return
    }
    const file = files[0]
    console.log(file)
    cb(file)
  }

  useEffect(() => {
    validate()
  }, [description, coverImage, avatar, gitHubLink, twitterLink, websiteLink])

  const validate = () => {}

  const callback = async () => {
    if (!ethersProvider) {
      return
    }

    if (!propertyAddress) {
      return
    }

    try {
      setIsLoading(true)

      const links = {
        github: gitHubLink,
        twitter: twitterLink,
        website: websiteLink
      }
      const message = `create property: ${propertyDetails?.propertyName}, ${description}`
      // const { signature, message: signedMessage } = await signWithCache(web3, signMessage)
      // if (!signature || !signedMessage) {
      //   return
      // }

      const signer = ethersProvider.getSigner()
      const signature = await signer.signMessage(message)
      const walletAddress = await signer.getAddress()

      console.log('property details are: ', propertyDetails)

      const data = await postProperty(
        message,
        signature,
        walletAddress,
        propertyAddress,
        propertyDetails?.propertyName,
        description,
        links
      )
        .then(result => {
          if (result.error) {
            // message.error({ content: result.error, key })
            return
          }
          // mutate()
          // message.success({ content: 'success update property data', key })
          return result
        })
        .catch(err => {
          // message.error({ content: err.message, key })
          return Promise.reject({})
        })

      setIsLoading(false)

      return data
    } catch (error) {
      setError(isError(error) ? error.message : `${error}`)
    }
  }
  return {
    update: callback,
    validate,
    error,
    gitHubLink,
    setGitHubLink,
    twitterLink,
    setTwitterLink,
    websiteLink,
    setWebsiteLink,
    avatar,
    setAvatar,
    handleFile,
    coverImage,
    setCoverImage,
    description,
    setDescription,
    isValid,
    isLoading,
    setPropertyAddress
  }
}
