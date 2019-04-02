export default {
  get: jest.fn(() => Promise.resolve({ data: {data: [{id: 1}]} })),
  post: jest.fn(() => Promise.resolve({ data: {} })),
};
