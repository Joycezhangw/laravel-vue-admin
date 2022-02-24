const EnumConstant = {};
EnumConstant.install = function (Vue, options) {

    /**
   * 根据枚举值获取描述
   * @param {*} constantName 枚举名
   * @param {*} value          枚举值
   * @returns
   */
    const constantInfo = options.enumInfo || {}
    const Enum = {}

    /**
     * 获取全部键值枚举
     * @param {*} constantName 
     * @returns 
     */
    Enum.getMap = function (constantName) {
        if (!Object.prototype.hasOwnProperty.call(constantInfo, constantName)) {
            return []
        }
        return constantInfo[constantName]
    }

    /**
     * 根据枚举值获取描述
     * @param {*} constantName 
     * @param {*} value 
     * @returns 
     */
    Enum.getLabelByValue = function (constantName, value) {

        if (!Object.prototype.hasOwnProperty.call(constantInfo, constantName)) {
            return ''
        }
        let constantItem = constantInfo[constantName]
        for (let item in constantItem) {
            if (constantItem[item].value === parseInt(value)) {
                return constantItem[item].label
            }
        }
    }

    Enum.getValueByLabel = function () {

    }

    Vue.prototype.$enum = Enum
}
export default EnumConstant;