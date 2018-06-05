export default function (resources) {
    return {
        data() {
            let initData = {
                remoteDataLoading: 0,
                remoteErrors: {}
            }
            for (const key in resources) {
                initData[key] = null
                initData.remoteErrors[key] = null
            }
            return initData
        },
        computed: {
            remoteDataBusy() {
                return this.$data.remoteDataLoading !== 0
            },

            hasRemoteErrors() {
                return Object.keys(this.$data.remoteErrors).some(
                    key => this.$data.remoteErrors[key]
                )
            },
        },
        methods: {
            fetchResource(key, url) {
                this.$data.remoteDataLoading++;
                this.$data.remoteErrors[key] = null;

                return this.$fetch(url)
                    .then(d => {
                        this.$data[key] = d
                        this.$data.remoteDataLoading--
                    })
                    .catch(e => {
                        this.$data.remoteErrors[key] = e
                        this.$data.remoteDataLoading--
                    })
            },
        },
        created() {
            for (const key in resources) {
                let url = resources[key]
                // If the value is a function
                // We watch its result
                if (typeof url === 'function') {
                    this.$watch(url, (val) => {
                        this.fetchResource(key, val)
                    }, {
                        immediate: true,
                    })
                } else {
                    this.fetchResource(key, url)
                }
            }
        },
    }
}
