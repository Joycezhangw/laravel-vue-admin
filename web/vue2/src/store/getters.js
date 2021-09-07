const getters = {
    userInfo: state => state.user.userInfo,
    token: state => state.user.token,
    routes: state => state.router.routes,
    permission: state => state.router.permission,
    menuGroup: state => state.router.menuGroup,
    appInfo: state => state.app.appInfo,
    browser: state => state.app.browser,
    menuCollapse: state => state.app.collapse
};
export default getters;