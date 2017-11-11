import ApiInterface from '../apiInterface';

test('ApiInterface constructor sets jwt, double cookie, and host', () => {
  const mockJwt = 'mockJwt';
  const mockDoubleCookie = 'mockDoubleCookie';
  const mockHost = 'mockHost';
  const apiInterface = new ApiInterface(mockJwt, mockDoubleCookie, mockHost);
  expect(apiInterface.jwt).toEqual(mockJwt);
  expect(apiInterface.doubleCookie).toEqual(mockDoubleCookie);
  expect(apiInterface.host).toEqual(mockHost);
});

test('ApiInterface.prepareDefaultRequest returns a properly constructed request object', () => {
  const mockJwt = 'mockJwt';
  const mockDoubleCookie = 'mockDoubleCookie';
  const mockHost = 'mockHost';
  const mockBodyData = { hasProperties: 'mockBodyData' };
  const mockMethod = 'GET';
  const mockDefaultRequest = {
    method: mockMethod,
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const mockSetAuthorizationHeader = (headers, jwt) => {
    expect(headers).toEqual(mockDefaultRequest.headers);
    expect(jwt).toEqual(mockJwt);
    return headers;
  };
  const mockSetBodyData = (request, body, method, doubleCookie) => {
    expect(request).toEqual(mockDefaultRequest);
    expect(body).toEqual(mockBodyData);
    expect(method).toEqual(mockMethod);
    expect(doubleCookie).toEqual(mockDoubleCookie);
    return request;
  };
  const apiInterface = new ApiInterface(mockJwt, mockDoubleCookie, mockHost);
  const request = apiInterface.prepareDefaultRequest(mockMethod, mockBodyData, mockSetAuthorizationHeader, mockSetBodyData);
  expect(request).toEqual(mockDefaultRequest);
});

test('ApiInterface.setAuthorizationHeader will return a bearer token if jwt is set, otherwise default', () => {
  const mockJwt = 'mockJwt';
  const mockDoubleCookie = 'mockDoubleCookie';
  const mockHost = 'mockHost';
  const apiInterface = new ApiInterface(mockJwt, mockDoubleCookie, mockHost);
  const mockHeader = { hasProperties: 'mockHeader' };
  const mockExpectedHeader = {
    ...mockHeader,
    Authorization: `Bearer: ${mockJwt}`,
  };

  expect(apiInterface.setAuthorizationHeader(mockHeader, mockJwt)).toEqual(mockExpectedHeader);
  expect(apiInterface.setAuthorizationHeader(mockHeader, undefined)).toEqual(mockHeader);
});

test('ApiInterface.setDoubleCookie will add the double_cookie to the body if it is specified', () => {
  const mockJwt = 'mockJwt';
  const mockDoubleCookie = 'mockDoubleCookie';
  const mockHost = 'mockHost';
  const mockBodyData = { hasProperties: 'mockBodyData' };
  const mockExpectedBodyData = {
    ...mockBodyData,
    double_cookie: mockDoubleCookie,
  };
  const apiInterface = new ApiInterface(mockJwt, mockDoubleCookie, mockHost);
  expect(apiInterface.setDoubleCookie(mockBodyData, mockDoubleCookie)).toEqual(mockExpectedBodyData);
  expect(apiInterface.setDoubleCookie(mockBodyData, undefined)).toEqual(mockBodyData);
});

test('ApiInterface.setBodyData will attach body data to the request object if the method is of type POST', () => {
  const mockJwt = 'mockJwt';
  const mockDoubleCookie = 'mockDoubleCookie';
  const mockHost = 'mockHost';
  const apiInterface = new ApiInterface(mockJwt, mockDoubleCookie, mockHost);
  const mockRequestData = { hasProperties: 'mockRequestData' };
  const mockBodyData = { hasProperties: 'mockBodyData' };
  const mockExpectedRequestData = {
    ...mockRequestData,
    body: mockBodyData,
  };
  const mockSetDoubleCookie = (bodyData, doubleCookie) => {
    expect(bodyData).toEqual(mockBodyData);
    expect(doubleCookie).toEqual(mockDoubleCookie);
    return bodyData;
  };
  expect(apiInterface.setBodyData(mockRequestData, mockBodyData, 'POST', mockDoubleCookie, mockSetDoubleCookie)).toEqual(mockExpectedRequestData);
  expect(apiInterface.setBodyData(mockRequestData, mockBodyData, 'GET', mockDoubleCookie, mockSetDoubleCookie)).toEqual(mockRequestData);
});
