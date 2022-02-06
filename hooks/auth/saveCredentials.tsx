export const saveCredentials = (
    username: string,
    password: string
): Promise<CredentialType | null> => {
    let result: Promise<CredentialType | null>;
    if (window !== undefined) {
        const isSupported = !!(
            navigator?.credentials?.preventSilentAccess &&
            window?.PasswordCredential
        );
        if (isSupported) {
            const cred = new PasswordCredential({
                iconURL: undefined,
                id: username,
                name: username ?? undefined,
                password
            });
            try {
                result = navigator.credentials.store(cred);
            } catch {
                result = null;
            }
        } else {
            result = null;
        }
    }

    return result;
};
export default saveCredentials;
