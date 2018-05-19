import { WINDOW_SIZE } from './types';

export const screenResize = (width) => ({ type: WINDOW_SIZE, screenWidth: width });
