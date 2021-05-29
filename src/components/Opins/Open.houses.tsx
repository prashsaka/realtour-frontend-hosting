import React from 'react';
import { IOpin, IOpenHouse } from '../../services/Opin.service';
import { getDisplayDate, getDisplayTime } from '../../utils/DisplayUtils';
import { validateVideoUrl } from '../../utils/Validator.util';

const OpenHouses: React.FC<any> = (props: any) => {

    const pin: IOpin = props.pin;

    const getNextOpenHouseTimes = (): JSX.Element => {
        const now: number = Date.now();
        let nextOpenHouseTimes: JSX.Element[] = [];
        pin.idxOpenHouses = (pin.idxOpenHouses || []).filter((o: IOpenHouse) => now < Date.parse(o.endDateTime) && !validateVideoUrl(o.url));
        if (pin.idxOpenHouses.length) {
            const count: number = Math.min(pin.idxOpenHouses.length, 3);
            for (let counter = 0; counter < count; counter++) {
                const openHouse: IOpenHouse = pin.idxOpenHouses[counter];
                nextOpenHouseTimes.push(
                    <div key={ `$open-house-${counter}` } className='open-houses text-left'>
                        { getDisplayDate(openHouse.startDateTime) } { `${ getDisplayTime(openHouse.startDateTime) } - ${ getDisplayTime(openHouse.endDateTime) }` }
                    </div>
                );
            }
            return <><div className='small'>Upcoming Virtual Open Houses</div>{ nextOpenHouseTimes }</>;
        } else {
            return <div className='small'>No Upcoming Virtual Open Houses</div>;
        }
    }

    return getNextOpenHouseTimes();
}

export default OpenHouses;
