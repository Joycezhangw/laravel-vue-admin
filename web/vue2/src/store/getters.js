const getters = {
    userInfo: state => state.user.userInfo,
    token: state => state.user.token,
    routes: state => state.permission.routes,
    permission: state => state.permission.permission,
    menuGroup: state => state.permission.menuGroup,
    appInfo: state => state.app.appInfo,
    browser: state => state.app.browser,
    menuCollapse: state => state.app.collapse
};
export default getters;