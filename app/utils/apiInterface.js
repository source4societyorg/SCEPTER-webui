import { request } from '@source4society/scepter-ui-utilities';
import { isNotEmpty, valueOrDefault } from '@source4society/scepter-utility-lib';
import configuration from 'configuration.json';
const stage = process.env.NODE_ENV;
const host = configuration.environments[stage].gateway;

class ApiInterface {

  constructor(jwt, doubleCookie, injectedHost) {
    this.jwt = jwt;
    this.doubleCookie = doubleCookie;
    this.host = valueOrDefault(injectedHost, host);
  }

  prepareDefaultRequest(injectedMethod, injectedBody, injectedSetAuthorizationHeader, injectedSetBodyData, injectedJwt, injectedDoubleCookie) {
    const body = valueOrDefault(injectedBody, {});
    const method = valueOrDefault(injectedMethod, 'GET');
    const jwt = valueOrDefault(injectedJwt, this.jwt);
    const doubleCookie = valueOrDefault(injectedDoubleCookie, this.doubleCookie);
    const setAuthorizationHeader = valueOrDefault(injectedSetAuthorizationHeader, this.setAuthorizationHeader);
    const setBodyData = valueOrDefault(injectedSetBodyData, this.setBodyData);
    let requestData = {
      method,
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    request.headers = setAuthorizationHeader(requestData.headers, jwt);
    requestData = setBodyData(requestData, body, method, doubleCookie);
    return requestData;
  }

  setAuthorizationHeader(injectedHeaders, jwt) {
    const headers = injectedHeaders;
    if (isNotEmpty(jwt)) {
      headers.Authorization = `Bearer: ${jwt}`;
    }
    return headers;
  }

  setDoubleCookie(injectedBodyData, doubleCookie) {
    const bodyData = injectedBodyData;
    if (isNotEmpty(doubleCookie)) {
      bodyData.double_cookie = doubleCookie;
    }
    return bodyData;
  }

  setBodyData(injectedRequestData, injectedBodyData, method, doubleCookie, injectedSetDoubleCookie) {
    const requestData = injectedRequestData;
    const setDoubleCookie = valueOrDefault(injectedSetDoubleCookie, this.setDoubleCookie);
    let bodyData = injectedBodyData;
    if (method !== 'GET') {
      bodyData = setDoubleCookie(bodyData, doubleCookie);
      requestData.body = bodyData;
    }
    return requestData;
  }
}

export default ApiInterface;
