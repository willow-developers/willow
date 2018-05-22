import { WINDOW_SIZE_WIDTH, WINDOW_SIZE_HEIGHT } from './types';

export const screenResizeWidth = (width) => ({ type: WINDOW_SIZE_WIDTH, screenWidth: width });
export const screenResizeHeight = (height) => ({ type: WINDOW_SIZE_HEIGHT, screenHeight: height });