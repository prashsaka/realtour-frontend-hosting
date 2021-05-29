import { IOpenHouse, IOpin, IVideo, IVirtualTour } from "../../services/Opin.service";
import { validateVideoUrl, validateVirtualUrl } from "../../utils/Validator.util";

export const getLiveOpenHouse: Function = (pin: IOpin): IOpenHouse | undefined => {
    const now: number = Date.now();
    if (pin.idxOpenHouses && pin.idxOpenHouses.length) {
        return pin.idxOpenHouses
            .filter((o: IOpenHouse) => now >= Date.parse(o.startDateTime) && now <= Date.parse(o.endDateTime))
            .find((o: IOpenHouse) => !validateVideoUrl(o.url))
    }
};

export const getLatestVideo: Function = (pin: IOpin): URL | undefined => {
    if (!pin.videos || !pin.videos.length) return;
    const nextVideo: IVideo | undefined = pin.videos.find((v: IVideo) => ((v && v.url) || v).toString().charAt(0) !== '~');
    return nextVideo && nextVideo.url;
}

export const getVirtualTourVideos: Function = (pin: IOpin): IVirtualTour[] => {
    if (pin.idxVirtualTours && pin.idxVirtualTours.length) {
        return pin.idxVirtualTours.filter((v: IVirtualTour) => !validateVirtualUrl(v && v.url));
    }
    if (pin.idxOpenHouses && pin.idxOpenHouses.length) {
        const openHouse: IOpenHouse | undefined = pin.idxOpenHouses.find((o: IOpenHouse) => !validateVirtualUrl(o.url));
        if (openHouse && openHouse.url) {
            return [{ url: openHouse.url }];
        }
    }
    return [];
};