declare interface Window {
    PasswordCredential: PasswordCredential;
}

declare interface Navigator {
    credentials: any;
}

declare interface Config {
    title: string;
    route: {
        singlePhoto: string;
    };
}
