const { validateUser } = require('../../src/validators/userValidator');

// ✅ helpers (only declare once)
const mockRequest = (body) => ({ body });
const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnThis();
  res.json = jest.fn();
  return res;
};

describe('User Validator', () => {
  it('should fail if username is missing', () => {
    const req = mockRequest({ password: '123456' });
    const res = mockResponse();
    const next = jest.fn();

    validateUser(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Username is required',
    });
  });

  it('should pass if username and password are provided', () => {
    const req = mockRequest({ username: 'john', password: '123456' });
    const res = mockResponse();
    const next = jest.fn();

    validateUser(req, res, next);

    expect(next).toHaveBeenCalled();
  });
});
