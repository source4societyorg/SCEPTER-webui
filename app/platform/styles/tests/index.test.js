import { breakpoints, heightsInViewWidths } from '../index';

test('breakpoints cover the correct aspect ratios', () => {
  expect(breakpoints).toEqual([
    '(max-aspect-ratio: 9/19)',
    '(min-aspect-ratio: 9/15) and (max-aspect-ratio: 3/4)',
    '(min-aspect-ratio: 4/3) and (max-aspect-ratio: 6/4)',
    '(min-aspect-ratio: 6/4) and (max-aspect-ratio: 19/9)',
    '(min-aspect-ratio: 19/9) and (max-aspect-ratio: 19/8)',
  ]);
});

test('heightsInViewWidths reflect the proper ratio proportion according to aspect ratio order', () => {
  expect(heightsInViewWidths).toEqual([177.8, 216.67, 133.33, 75, 56.25, 46.15]);
});
