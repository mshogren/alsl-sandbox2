import '@ungap/global-this';
import * as reactfire from 'reactfire';
import { preloadSDKs, preloadData } from './preload';

test('preloads firebase SDKs', () => {
  reactfire.preloadFirestore = jest.fn();
  reactfire.preloadAuth = jest.fn();
  preloadSDKs();
  expect(reactfire.preloadFirestore).toHaveBeenCalled();
  expect(reactfire.preloadAuth).toHaveBeenCalled();
});

test('preloads firebase data', async () => {
  reactfire.preloadUser = jest.fn();
  await preloadData();
  expect(reactfire.preloadUser).toHaveBeenCalled();
});
