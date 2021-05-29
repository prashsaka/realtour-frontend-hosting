export interface IUser {
    email: string;
    name: string;
    phone: string;
}

const LOCAL_STORAGE_USER: string = 'real-tour-user';

export const getUser = (): IUser => {
    const userString = localStorage.getItem(LOCAL_STORAGE_USER);
    if (userString) return JSON.parse(userString);
    return {
        email: '',
        name: '',
        phone: ''
    };
}

export const setUser = (user: IUser) => {
    localStorage.setItem(LOCAL_STORAGE_USER, JSON.stringify(user));
}