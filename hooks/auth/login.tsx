export async function login<T>(
    loginFn: (id: string, password: string) => T
): Promise<T | null> {
    let result: T;

    try {
        const credential = await navigator.credentials.get({ password: true });
        if (credential instanceof PasswordCredential) {
            result = loginFn(credential.id, credential.password);
        }
    } catch {
        result = null;
    }

    return result;
}
export default login;
