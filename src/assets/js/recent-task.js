export const RecentTask = (function() {

    let recentTask;

    function set(value) {
        recentTask = value;
    }

    function get() {
        return recentTask;
    }

    return {
        set,
        get
    }
})();