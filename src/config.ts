export const SERVER_PORT: number = parseInt(
  process.env.SERVER_PORT || '3333',
  10
);
export const CLIENT_PORT: number = parseInt(
  process.env.SERVER_PORT || '8080',
  10
);
export const BASE_MEDIA_DIR = process.env.MEDIA_DIR || 'D:\\movies';

export const TV_SERIES = 'D:\\movies\\friends';
export const MOVIES = 'D:\\movies\\The Hangover';

export const CATEGORIES: Map<string, string> = new Map();

CATEGORIES.set('tv_series', 'D:\\movies\\friends');
CATEGORIES.set('movies', 'D:\\movies\\The Hangover');
