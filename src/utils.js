
export function formatTemp(val, unit){
    if (unit === '°F') {
        val = val * 9 / 5 + 32;
        val = Math.round(val);
        return `${val}°F`;
    }
    return `${val}°C`;
}

