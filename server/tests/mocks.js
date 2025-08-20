const mockRequest = (body = {}, params = {}, query = {}, user = {}) => ({
  body,
  params,
  query,
  user,
});

const mockResponse = () => {
  const res = {};
  res.status = jest.fn(() => res);
  res.json = jest.fn(() => res);
  return res;
};

module.exports = {
  mockRequest,
  mockResponse,
};