const errorHandler = require('../../src/middleware/errorHandler');

describe('Error Handler Middleware', () => {
  let req, res, next;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(), // ✅ fix: chainable
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it('should send a 500 status and the error message for a generic error', () => {
    const error = new Error('Something went wrong on the server');
    errorHandler(error, req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: error.message,
      stack: expect.any(String),
    });
  });

  it('should send a custom status and the error message for a specified error', () => {
    const error = new Error('Not found');
    error.status = 404;
    errorHandler(error, req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: error.message,
      stack: expect.any(String),
    });
  });

  it('should use 500 status code if no status is specified', () => {
    const error = new Error('Database connection failed');
    errorHandler(error, req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: error.message,
      stack: expect.any(String),
    });
  });
});
