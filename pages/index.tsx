import { unsplash } from "../util"
import { NextPage } from "next"
import type { Image } from "../types"
import { DisplayImage, Layout } from "../components"
import styles from "../views/dashboard/index.module.scss"

interface P {
  photos: Image[]
  count: number
}

const Index: NextPage<P> = ({ photos, count }) => {
  const routePrefix = "detail"

  return (
    <Layout>
      <div className={styles.container}>
        {photos?.map((image: Image, key) => (
          <DisplayImage image={image} key={image.id} href={`${routePrefix}/${image.id}`} />
        ))}
      </div>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const params = {
    page: 1,
    perPage: 30
  }
  const data = (await unsplash.photos.list(params)).response
  const count = data.total
  const photos = data.results

  return { props: { photos, count } }
}

export default Index
