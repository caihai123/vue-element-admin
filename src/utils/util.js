/* 处理请求的参数 */
export function buildParams(parameters) {
    var urlSearchParams = new URLSearchParams();
    for (var key in parameters) {
        if (undefined === parameters[key] || null === parameters[key]) {
            continue;
        }
        if (typeof parameters[key] === "string") {
            urlSearchParams.append(key, parameters[key]);
        } else {
            urlSearchParams.append(key, parameters[key]);
        }
    }
    return urlSearchParams;
}