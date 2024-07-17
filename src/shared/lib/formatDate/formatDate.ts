import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import localizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

// ago/soon(in)
export function timeFromNow(date: string | Date | undefined): string {
    const parsedDate = dayjs(date);
    if (!parsedDate.isValid()) {
        return 'Invalid date';
    }
    return parsedDate.fromNow();
}

// DD/MM/YYYY
export function formatDate(date: string | Date | undefined): string {
    const parsedDate = dayjs(date);
    if (!parsedDate.isValid()) {
        return 'Invalid date';
    }
    return parsedDate.format('DD/MM/YYYY');
}

// HH:MM AM/PM
export function formatTime(date: string | Date | undefined): string {
    const parsedDate = dayjs(date);
    if (!parsedDate.isValid()) {
        return 'Invalid date';
    }
    return parsedDate.format('hh:mm A');
}