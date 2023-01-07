import { BASE_URL } from "@/config";
import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    // const {} = getState() as RootState;
    const accessToken = "";

    if (accessToken) {
      headers.set("authorization", `Bearer ${accessToken}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshResult = await baseQuery("token/refresh/", api, extraOptions);

    if (refreshResult.data) {
      // api.dispatch(tokenUpdated({ accessToken: refreshResult.data as string }));

      // retry the initial query
      result = await baseQuery(args, api, extraOptions);
    } else {
      // api.dispatch(logout());
    }
  }
  return result;
};

export const api = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Posts", "Post", "Comments"],
  endpoints: () => ({}),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
});
