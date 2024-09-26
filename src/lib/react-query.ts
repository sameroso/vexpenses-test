import { UseMutationOptions } from "@tanstack/react-query";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type QueryConfig<T extends (...args: any[]) => unknown> = Omit<
  ReturnType<T>,
  "queryKey"
>;

export type ApiFnReturnType<
  FnType extends (...args: unknown[]) => Promise<unknown>
> = Awaited<ReturnType<FnType>>;

export type MutationConfig<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  MutationFnType extends (...args: any[]) => Promise<any>
> = UseMutationOptions<
  ApiFnReturnType<MutationFnType>,
  Error,
  Parameters<MutationFnType>[0]
>;
