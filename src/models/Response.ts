export type Response<TResult> = {
  message: string;
  result: TResult | any;
  success: boolean;
  error: Error | any;
};
