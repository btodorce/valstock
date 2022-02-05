import { useEffect, useState } from "react"
import { Image } from "../types"
import { useUnsplash } from "../providers/Unsplash/UnsplashProvider"

export const useFindOnePhoto = (id: string) => {
  const unsplash = useUnsplash()
  const [photo, setPhoto] = useState<Image>()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  if (!unsplash) {
    setError(true)
  }

  useEffect(() => {
    if (id) {
      setIsLoading(true)
      unsplash.photos
        .get({ photoId: id })
        .then((p) => p.response)
        .then((data) => {
          setPhoto(data)
          setIsLoading(false)
        })
        .catch((error) => {
          console.error(error)
          setError(true)
        })
    }

    if (!id) {
      setIsLoading(true)
    }
  }, [id, unsplash.photos])

  return {
    photo: photo,
    loading: isLoading,
    error: error
  }
}

export default useFindOnePhoto
