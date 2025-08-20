require('dotenv/config');
require('@testing-library/jest-dom');
const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
global.setImmediate = jest.useRealTimers;