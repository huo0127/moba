export default {
  computed: {
    uploadUrl () {
      return process.env.VUE_APP_API_URL + '/upload'
    },
  },
  methods: {
    getAuthHeaders () {
      return {
        Authorization: `Bearer ${localStorage.token || ''}`,
      }
    },
  },
}
