import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import FormField from '../../../components/Form'
import HSButton from '../../../components/HSButton'
import { useDevForApps } from './useDevForApps'

interface PropertyDevForAppsProps {}

const PropertyDevForApps: React.FC<PropertyDevForAppsProps> = () => {
  const { hash } = useParams()
  const {
    update,
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
    setPropertyAddress
  } = useDevForApps()

  useEffect(() => {
    setPropertyAddress(hash)
  }, [hash, setPropertyAddress])

  return (
    <>
      <div className="grid grid-cols-1 gap-sm">
        <FormField
          label="Description"
          id="address"
          required={true}
          value={description}
          onChange={val => setDescription(val)}
          placeholder="Enter a description for your property"
        />
      </div>
      <div className="mb-md grid grid-cols-1 gap-sm md:grid-cols-2">
        <FormField
          label="Twitter Link"
          id="twitter-link"
          value={twitterLink}
          onChange={val => setTwitterLink(val)}
          placeholder=""
        />
        <FormField
          label="GitHub Link"
          id="github-link"
          value={gitHubLink}
          onChange={val => setGitHubLink(val)}
          placeholder=""
        />
        <FormField
          label="Website Link"
          id="website-link"
          value={websiteLink}
          onChange={val => setWebsiteLink(val)}
          placeholder=""
        />

        {/* grid break */}
        <div></div>

        <div className="mb-2 flex flex-col">
          <span className="font-bold">Avatar</span>
          <div className="float-left">
            <label htmlFor="avatar-selector">
              {!avatar && (
                <div className="float-left cursor-pointer rounded bg-blue-500 px-4 py-2 text-white shadow">
                  Select File
                </div>
              )}
              {avatar && <img className="w-12" src={URL.createObjectURL(avatar)} />}
            </label>
          </div>
          <input id="avatar-selector" className="hidden" type="file" onChange={e => handleFile(e, setAvatar)} />
        </div>
        <div className="mb-2 flex flex-col">
          <span className="font-bold">Cover Image</span>
          <div className="float-left">
            <label htmlFor="cover-image-selector">
              {!coverImage && (
                <div className="float-left cursor-pointer rounded bg-blue-500 px-4 py-2 text-white shadow">
                  Select File
                </div>
              )}
              {coverImage && <img src={URL.createObjectURL(coverImage)} />}
            </label>
          </div>
          <input
            id="cover-image-selector"
            className="hidden"
            type="file"
            onChange={e => handleFile(e, setCoverImage)}
          />
        </div>
      </div>
      <div className="self-end">
        <HSButton context="submit" type="filled" isDisabled={!isValid} onClick={update}>
          Preview
        </HSButton>
      </div>
      {error && (
        <div className="">
          <span>{error}</span>
        </div>
      )}
    </>
  )
}

export default PropertyDevForApps
