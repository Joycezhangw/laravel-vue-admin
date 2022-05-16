/**
 * 由于env环境变量在vite中只能是string且在node环境下无法使用
 * 将env环境变量处理下，使node环境下，可以使用
 * @param {*} envOptions 
 * @returns 
 */
export function wrapperEnv(envOptions) {
    if (!envOptions) return {}
    const ret = {}
    for (const key in envOptions) {
        let val = envOptions[key]
        if (['true', 'false'].includes(val)) {
            val = val === 'true'
        }
        if (['VITE_PORT'].includes(key)) {
            val = +val
        }
        if (key === 'VITE_PROXY' && val) {
            try {
                val = JSON.parse(val.replace(/'/g, '"'))
            } catch (error) {
                val = ''
            }
        }
        ret[key] = val
        if (typeof key === 'string') {
            process.env[key] = val
        } else if (typeof key === 'object') {
            process.env[key] = JSON.stringify(val)
        }
    }
    return ret
}