import { NextPage } from "next";
import styles from "./index.module.scss";
import { LoginForm, Layout } from "../../components";
import { useTranslation } from "../../hooks";
import Image from "next/image";
import camera from "../../public/camera.svg";
import { useAuth } from "../../providers";
import { useCallback, useEffect } from "react";

const Index: NextPage = () => {
    const { _ } = useTranslation();
    const { login } = useAuth();

    useEffect(() => {
        if ("credentials" in navigator) {
            if (navigator.credentials.preventSilentAccess) {
                navigator.credentials
                    .get({
                        password: true
                    })
                    .then(credential => {
                        if (credential instanceof PasswordCredential) {
                            login(credential.name, credential.password);
                        }
                    });
            }
        }
    }, [login]);

    const HandleLogin = (username: string, password: string) =>
        login(username, password);

    return (
        <Layout footer={true}>
            <LoginForm onLogin={HandleLogin}>
                <h3 className={styles.headerText}>
                    {_("login.header.join-our-stock-community")}
                </h3>
                <h3 className={styles.label}>
                    {_("login.header.download-free-photos")}
                </h3>
            </LoginForm>
            <div className={styles.imageWrapper}>
                <Image
                    className={styles.nonInteractable}
                    src={camera}
                    alt="camera"
                />
            </div>
        </Layout>
    );
};
export default Index;
