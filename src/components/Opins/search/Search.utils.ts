
export const setIfValueIsDifferent: Function = (value: any, event: any, fn: Function): void => {
    const targetValue: string = (event.target?.value === undefined ? event.trim : event.target?.value)?.trim();
    if (value === targetValue) return;
    if (!value && !targetValue) return;
    fn(targetValue);
};

export const setIfValuesAreDifferent: Function = (values: any[], event: any, index: number, fn: Function): void => {
    const targetValue: string = (event.target?.value === undefined ? event.trim : event.target?.value)?.trim() || '';
    if (values[index] === targetValue) return;
    values[index] = targetValue;
    fn([ ...values ]);
};
