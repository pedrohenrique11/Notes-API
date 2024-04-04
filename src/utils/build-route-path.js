export function buildRotesPath() {
    const routeParamsRegex = /:([a-zA-Z]+)/g;
    const paramsWithParams = path.replaceAll(routeParamsRegex, '(?<$1>[a-z0-9\-_]+)');

    const pathRegex = new RegExp(`^${paramsWithParams}(?<query>\\?(.*))?$`)

    return pathRegex
}