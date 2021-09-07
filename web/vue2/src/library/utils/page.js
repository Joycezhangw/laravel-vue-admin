import config from '@/config/env'
export default function getPageTitle(pageTitle) {
    if (pageTitle) {
        return `${pageTitle} - ${config.appName}`
    }
    return `${config.appName}`
}