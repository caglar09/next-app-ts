import type { ConfigurationTypes, BASE_URL_TYPE, PagePropTypes } from "./type";

export const BASE_URL: BASE_URL_TYPE = process?.env?.BASE_URL as string;
export const ENV: ConfigurationTypes = {};

export const PageProps: PagePropTypes = {
  _start: Number(process?.env?.PAGE_INDEX),
  limit: Number(process?.env?.PAGE_COUNT),
};
