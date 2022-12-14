// config/jest/setupTests.js
import "@testing-library/jest-dom/extend-expect";

window.matchMedia = (query) => ({
  matches: false,
  media: query,
  onchange: null,
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
  addListener: jest.fn(),
  removeListener: jest.fn(),
  setupFilesAfterEnv: ["./config/jest/setupTests.js"],
});

Object.defineProperty(URL, "createObjectURL", {
  writable: true,
  value: jest.fn(),
});