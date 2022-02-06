import { atom, useRecoilState, useResetRecoilState } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();
export const albumsAtom = atom({
    key: "albums",
    default: [],
    effects_UNSTABLE: [persistAtom]
});
