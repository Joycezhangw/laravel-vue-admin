import { ref } from 'vue'

export function useRequest(service, options) {

    //初始化响应数据
    const loading = ref(false);//是否正在执行
    const error = ref(null);//抛出的异常
    const data = ref({});

    const DefaultOptions = {
        manual: false,
        onSuccess: () => { },
        onError: () => { },
        onFinally: () => { },
        defaultParams: {},
    }

    const finalOptions = { ...DefaultOptions, ...options };

    const {
        manual,
        onSuccess,
        onError,
        onFinally,
        defaultParams
    } = finalOptions;

    //设置loading状态
    const setLoadingState = (value) => {
        loading.value = value;
    }

    let promiseService = async (args) => new Promise((resolve, reject) => {
        service(args).then(resolve).catch(reject)
    })

    function _run(args) {
        setLoadingState(true);
        return promiseService(args).then(res => {
            onSuccess(res, args);
            data.value = res;
            return res;
        }).catch(err => {
            error.value = err;
            onError(err, args);
        }).finally(() => {
            setLoadingState(false);
            onFinally();
        })
    }

    let run = _run;

    //是否手动执行，默认flase。即在初始化自动执行 service
    if (!manual) {
        run(defaultParams)
    }

    return {
        loading,
        data,
        run,
        error
    }
}