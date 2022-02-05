import { Layout } from "../components"
import { NextPage } from "next"
import { useRouter } from "next/router"
import { useAuth } from "../providers"

export const LogoutPage: NextPage = () => {
  const { logout } = useAuth()
  const router = useRouter()

  logout().then(() => router.push("/"))

  return (
    <Layout>
      <h2>U have successfully logged out</h2>
    </Layout>
  )
}

export default LogoutPage
