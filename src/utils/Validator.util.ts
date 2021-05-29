import { IVideo } from "../services/Opin.service";

export const validateFacebookVideo: Function = (url: string): string | undefined => {
    if (!url || (url.indexOf('facebook.com') < 0 && url.indexOf('fb.com') < 0)) {
        return 'Invalid Facebook Video';
    }
}

export const validateMatterportVideo: Function = (url: string): string | undefined => {
    if (!url || (url.indexOf('matterport.com') < 0)) {
        return 'Invalid Matterport Video';
    }
}

export const validateField: Function = (val: string): string | undefined => {
    if (!val || !val.trim()) {
        return 'Required field';
    }
}

const PHONE_NUM_REGEX = /^[0-9]{10,11}$/;
const NON_NUMERIC_REGEX = /[^0-9]/g;
export const validatePhone: Function = (val: string): string | undefined => {
    if (!val || !PHONE_NUM_REGEX.test(val.trim().replace(NON_NUMERIC_REGEX, ''))) {
        return 'Invalid phone';
    }
}

export const validateVideo: Function = (video: IVideo): string | undefined => {
    const url: string | undefined = video && video.url && video.url.toString();
    return validateVideoUrl(url);
}

export const validateVideoUrl: Function = (url: string): string | undefined => {
    if (validateVirtualUrl(url) && validateZoomVideo(url)) {
        return 'Invalid video URL';
    }
}

export const validateVirtualUrl: Function = (url: string): string | undefined => {
    if (validateFacebookVideo(url) && validateMatterportVideo(url) && /* validateVimeoVideo(url) && */ validateYouTubeVideo(url)) {
        return 'Invalid virtual tour URL';
    }
}

// export const validateVimeoVideo: Function = (url: string): string | undefined => {
//     if (!url || url.toLowerCase().indexOf('vimeo') < 0) {
//         return 'Invalid Vimeo Video';
//     }
// }

export const validateYouTubeVideo: Function = (url: string): string | undefined => {
    if (!url || url.toLowerCase().indexOf('youtu') < 0) {
        return 'Invalid YouTube Video';
    }
}

export const validateZoomVideo: Function = (url: string): string | undefined => {
    if (!url || url.toLowerCase().indexOf('zoom.us') < 0) {
        return 'Invalid Zoom Video';
    }
}
