// setup-jest.ts - No location mock

// Zone.js mock
(global as any).Zone = {
  __symbol__: (name: string) => `__zone_symbol__${name}`,
  current: {
    get: (key: string) => undefined,
    run: (fn: () => any) => fn(),
    runTask: (fn: () => any) => fn(),
  },
};

// Mock requestAnimationFrame
global.requestAnimationFrame = jest.fn((callback) => setTimeout(callback, 0));
global.cancelAnimationFrame = jest.fn();

// Browser mocks
Object.defineProperty(window, 'CSS', { value: null });

Object.defineProperty(window, 'getComputedStyle', {
  value: () => ({
    getPropertyValue: () => '',
  }),
});

Object.defineProperty(document, 'doctype', {
  value: '<!DOCTYPE html>',
});

// Mock localStorage
Storage.prototype.getItem = jest.fn();
Storage.prototype.setItem = jest.fn();
Storage.prototype.removeItem = jest.fn();
Storage.prototype.clear = jest.fn();

// Mock matchMedia
window.matchMedia = jest.fn().mockReturnValue({
  matches: false,
  addListener: jest.fn(),
  removeListener: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
});

// Note: We're NOT mocking window.location here
// We'll handle it in the test file if needed

// Reduce console noise
jest.spyOn(console, 'warn').mockImplementation(() => {});
jest.spyOn(console, 'error').mockImplementation(() => {});