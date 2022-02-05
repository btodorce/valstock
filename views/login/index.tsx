import { NextPage } from "next"
import styles from "./index.module.scss"
import { LoginForm, Layout } from "../../components"
import { useTranslation } from "../../hooks"
import Image from "next/image"
import camera from "../../public/camera.svg"

const Index: NextPage = () => {
  const { _ } = useTranslation()

  return (
    <Layout footer={true}>
      <LoginForm>
        <h3 className={styles.headerText}>{_("login.header.join-our-stock-community")}</h3>
        <h3 className={styles.label}>{_("login.header.download-free-photos")}</h3>
      </LoginForm>
      <div className={styles.imageWrapper}>
        <Image className={styles.nonInteractable} src={camera} alt="camera" />
      </div>
    </Layout>
  )
}
export default Index
