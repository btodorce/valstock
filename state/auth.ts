import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();
export const userAtom = atom({
    key: "user",
    default: {
        me: null,
    },
    effects_UNSTABLE: [persistAtom],
});
