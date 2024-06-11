import moment from 'moment';

export const formatAnyDate = (date: Date | null | undefined): string | null => {
    return date ? moment(date).format('DD/MM/YYYY') : null;
}