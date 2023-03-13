

export const isDayTime = () => {
    const hours = new Date().getHours()
    const isDayTime = hours > 6 && hours < 20;
    return isDayTime;
}

// if not work

export const isDay = () => {
    return (Date.now() + 60000 * new Date().getTimezoneOffset() + 21600000) % 86400000 / 3600000 > 12;
}
