import { userAtom } from "../state"
import { useRecoilState } from "recoil"

export const useAuthState = () => {
  const [user, setUser] = useRecoilState(userAtom)

  return [user, setUser]
}
