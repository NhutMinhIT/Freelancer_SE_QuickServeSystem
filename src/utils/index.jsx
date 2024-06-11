import moment from 'moment';

export const formatAnyDate = (date) => {
    return date ? moment(date).format('DD/MM/YYYY') : null;
}