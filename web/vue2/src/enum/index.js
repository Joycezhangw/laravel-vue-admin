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
        let constantItem = constantInfo[constantName];
        return constantItem.find((item) => (item.value == value)).label;
    }

    Enum.getValueByLabel = function () {

    }

    Vue.prototype.$enum = Enum
}
export default EnumConstant;