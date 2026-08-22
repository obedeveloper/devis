import { getRequestEvent, query } from '$app/server';
import { env } from '$env/dynamic/private';

export const getOrigin = query(() => env.ORIGIN || getRequestEvent().url.origin);
