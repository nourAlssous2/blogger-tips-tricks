'use client'

const defaultOptions = {
    dateStyle: 'medium',
    timeStyle: 'short'
};

export default function ConvertToLocalDate({ date, lang, options = defaultOptions }) {
    const dateText = new Date(date).toLocaleString(lang, options);
    return <>{dateText}</>;
}