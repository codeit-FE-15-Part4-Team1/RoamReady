import ky from 'ky';

const prefixUrl =
  typeof window === 'undefined'
    ? process.env.API_BASE_URL
    : process.env.NEXT_PUBLIC_API_BASE_URL;

export const activityClient = ky.create({
  prefixUrl,
});
