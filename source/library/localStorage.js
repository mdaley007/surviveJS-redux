export default {
    get(key) {
        try {
            return JSON.parse(localStorage.getItem(key))
        }
        catch(error) {
            return null
        }
    },
    set(key, value) {
        localStorage.setItem(key, JSON.stringify(value))
    }
}
