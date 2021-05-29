import axios, { AxiosResponse } from 'axios';
import { IUser } from './User.service';
import { IVideo } from './Opin.service';

// NOTE: NOT YET FULLY IMPLEMENTED.

/*
// const SERVER_URL = 'http://localhost:5000/realtour/us-central1/app';
const SERVER_URL = 'https://us-central1-realtour.cloudfunctions.net/app';

const _action = (action: string, data: IAdUserActionPayload): Promise<any> => {
    return axios
        .post(`${SERVER_URL}/ad-action`, { action, ...data })
        .catch((err: any) => {
            console.error(err);
            throw err;
        });
};

const _find = (cityId: string, id: string): Promise<IAd> => {
    return axios
        .post(`${SERVER_URL}/ad-find`, { cityId, id })
        .then((res: AxiosResponse<any>) => {
            return res && res.data;
        })
        .catch((err: any) => {
            console.error(err);
            throw err;
        });
};

const _search = (cityId: string, search: IAdSearch): Promise<IAd[]> => {

    return axios
        .post(`${SERVER_URL}/ad-search`, { cityId, ...search })
        .then((res: AxiosResponse<any>) => {
            return res && res.data;
        })
        .catch((err: any) => {
            console.error(err);
            throw err;
        });
};

export interface IAd {
    email: string;
    facts: any;
    hashtags: string[];
    adId: number;
    link?: URL;
    name: string;
    phone: string;
    pictures: URL[];
    remarks: string;
    socialMedia: {
        facebook?: URL;
        instagram?: URL;
        twitter?: URL;
    }
    sortId: string;
    status: string;
    streetName: string;
    streetNo: string;
    suite?: string;
    text?: string;
    video: IVideo;
    website: URL;
    zip: string;
};

export interface IAdSearch {
    hashtags?: string[];
    lastId?: string;
    zip?: string;
};

export interface IAdUserActionPayload {
    adId: string;
    user: IUser;
    notes?: string;
};

/* Fetch * /
export const getAd = (cityId: string, id: string): Promise<IAd> => _find(cityId, id);
export const getAds = (cityId: string, search: IAdSearch): Promise<IAd[]> => _search(cityId, search);
*/
