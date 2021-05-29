import axios, { AxiosResponse } from 'axios';
import { IAgent } from './Agent.service';
import { IUser } from './User.service';

// const SERVER_URL = 'http://localhost:5000/realtour/us-central1/app';
const SERVER_URL = 'https://us-central1-realtour.cloudfunctions.net/app';

const _find = (cityId: string, listingId: string): Promise<IOpin> => {
    return axios
        .post(`${SERVER_URL}/find`, { cityId, listingId })
        .then((res: AxiosResponse<any>) => {
            return res && res.data;
        })
        .catch((err: any) => {
            console.error(err);
            throw err;
        });
};

const _search = (cityId: string, search: IOpinSearch): Promise<IOpin[]> => {

    return axios
        .post(`${SERVER_URL}/search`, { cityId, ...search })
        .then((res: AxiosResponse<any>) => {
            return res && res.data;
        })
        .catch((err: any) => {
            console.error(err);
            throw err;
        });
};

const _update = (cityId: string, data: IAgentActionPayload): Promise<void> => {
    return axios
        .post(`${SERVER_URL}/update`, { cityId, ...data })
        .then((res: AxiosResponse<any>) => {
            return res && res.data;
        })
        .catch((err: any) => {
            console.error(err);
            throw err;
        });
};

const _action = (action: string, data: IBuyerActionPayload): Promise<any> => {
    return axios
        .post(`${SERVER_URL}/action`, { action, ...data })
        .catch((err: any) => {
            console.error(err);
            throw err;
        });
}

export interface IVideo {
    url: URL;
};

export interface IAgentActionPayload {
    listingId: string;
    agent: IAgent;
    videos: IVideo[];
};

export interface IBuyerActionPayload {
    listingId: string;
    user: IUser;
    notes?: string;
    startDateTime?: string;
};

export interface IOpenHouse {
    endDateTime: string;
    startDateTime: string;
    type: 'In-person' | 'Virtual';
    url?: URL;
};

export interface IVirtualTour {
    url: URL;
}

export interface ICalendar extends IBuyerActionPayload { };
export interface IHeart extends IBuyerActionPayload { };
export interface IMail extends IBuyerActionPayload { };
export interface IText extends IBuyerActionPayload { };

export interface IOpin {
    baths: number;
    beds: number;
    facts: any;
    hashtags: string[];
    idxOpenHouses: IOpenHouse[];
    idxVirtualTours: IVirtualTour[];
    listingId: string;
    openHouses: IOpenHouse[];
    pictures: URL[];
    price: number;
    remarks: string;
    sortId: string;
    sqft: number;
    status: 'ACT' | 'BOM' | 'CTG' | 'EXT' | 'NEW' | 'PCG' | 'RAC';
    streetName: string;
    streetNo: string;
    unitNumber?: string;
    videos: IVideo[];
    zip: string;
};

export interface IOpinSearch {
    baths?: number;
    beds?: number;
    hashtags?: string[];
    maxPrice?: number;
    minPrice?: number;
    maxSqft?: number;
    minSqft?: number;
    lastId?: string;
    types?: string[],
    zip?: string;
};

/* Update */
export const updateListing = (cityId: string, data: IAgentActionPayload): Promise<void> => _update(cityId, data);

/* Fetch */
export const getListing = (cityId: string, listingId: string): Promise<IOpin> => _find(cityId, listingId);
export const getListings = (cityId: string, search: IOpinSearch): Promise<IOpin[]> => _search(cityId, search);

/* Actions */
export const calendarAction = (calendar: ICalendar): Promise<void> => _action('calendar', calendar);
export const heartAction = (heart: IHeart): Promise<void> => _action('heart', heart);
export const mailAction = (mail: IMail): Promise<void> => _action('mail', mail);
export const textAction = (text: IText): Promise<void> => _action('text', text);
