export const RecentProject = (function () {

    let recentProject;

    function set(value) {
        recentProject = value;
    }

    function get() {
        return recentProject;
    }

    return {
        set,
        get
    };

})();