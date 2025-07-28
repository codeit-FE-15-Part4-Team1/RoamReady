import ky from 'ky';

export const activityClient = ky.create({
  prefixUrl: process.env.API_BASE_URL,
});
