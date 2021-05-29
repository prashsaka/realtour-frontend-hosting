/**
 * Checks whether the user is viewing the app on a phone or not.
 * @returns true if the user is viewing on a phone, else false.
 */
export const isMobile: Function = (): boolean => window.screen.width < 768;

/**
 * Converts the given date in ISO format to easy to read format.
 *
 * @param iso date in ISO format.
 * @returns String in the format such as: Sat May 29 2021
 */
export const getDisplayDate: Function = (iso: string): string => {
    const display: Date = new Date(iso);
    return `${ display.toDateString() }`;
};

/**
 * Converts the given date and time in ISO format to easy to read format.
 *
 * @param iso date and time in ISO format.
 * @returns String in the format such as: Sat May 29 2021 12:30 PM
 */
 export const getDisplayTime: Function = (iso: string): string => {
    const display: Date = new Date(iso);
    const hours: number = display.getHours() === 0 ? 12 : display.getHours() > 12 ? display.getHours() - 12 : display.getHours();
    const minutes: string = display.getMinutes() < 10 ? `0${display.getMinutes()}` : `${display.getMinutes()}`;
    return `${ hours }:${ minutes } ${ display.getHours() < 12 ? 'AM' : 'PM' }`;
};