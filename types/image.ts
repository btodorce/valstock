export type Image = {
    alt_description: string;
    color: string;
    created_at: string;
    description: string;
    id: string;
    links: {
        self: string;
        html: string;
        download: string;
        download_location: string;
    };
    promoted_at: string;
    updated_at: string;
    urls: {
        raw: string;
        full: string;
        regular: string;
        small: string;
        thumb: string;
    };
    width: number;
    height: number;
    user: User;
};

type User = {
    first_name: string;
    last_name: string;
    id: string;
};
export type Photo = {
    album: string;
    photo: Image;
};
