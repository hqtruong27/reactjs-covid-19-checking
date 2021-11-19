const UrlExtension = {
    /**
     * append more params for current url
     * @param {String} name key param
     * @param {String} value value of key param
     * @param {String} searchParams current search params
     */
    append: (name, value, searchParams) => {
        const search = searchParams ?? window.location.search
        const query = new URLSearchParams(search)
        if (name && value) {
            query.set(name, value)
        }

        const currentUrl = window.location.pathname + '?' + query.toString()
        window.history.pushState(null, '', currentUrl)
    },

    /**
     *
     * @param {string} name name param
     */
    get: (name, searchParams) => {
        const search = searchParams ?? window.location.search
        const query = new URLSearchParams(search)
        if (name && name === typeof String)
            return query.get(name)

        return undefined
    },
    /**
     *
     * @param {Array<string> | string} names names of params
     * @param {string} searchParams param
     * @returns object with key
     */
    find: (names, searchParams) => {
        const search = searchParams ?? window.location.search
        const query = new URLSearchParams(search)
        let result = {}
        if (names) {
            if (Array.isArray(names)) {
                for (const name of names) {
                    if (query.has(name)) {
                        result[name] = query.get(name)
                    }

                }
            } else {
                if (names instanceof String) {
                    if (query.has(names))
                        result[names] = query.get(names)
                }
            }
        }

        return result
    },
}

export default UrlExtension;