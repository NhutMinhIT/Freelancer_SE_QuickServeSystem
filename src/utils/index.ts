import moment from 'moment';

export const formatAnyDate = (date: string | Date | null | undefined): string | null => {
  return date ? moment.utc(date).format('DD-MM-YYYY') : null;
}

export const formatMMDDYYYYDate = (date: Date | null | undefined): string | null => {
    return date ? moment(date).format('MM-DD-YYYY') : null;
}

export const formatNumberWithDots = (number: number | null | undefined): string | null => {
    if (number === null || number === undefined) {
      return null;
    }
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };