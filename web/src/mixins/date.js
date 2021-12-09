import dayjs from 'dayjs';

export default {
  filters: {
    date (val) {
      return dayjs(val).format('YYYY-MM-DD')
    }
  },
}
