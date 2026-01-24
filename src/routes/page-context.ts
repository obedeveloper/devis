import { createContext } from 'svelte';
import type { PageData } from './$types';

export const [getPageContext, setPageContext] = createContext<PageData>();
