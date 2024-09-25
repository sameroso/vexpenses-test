export type QueryConfig<T extends (...args: unknown[]) => unknown> = Omit<
  ReturnType<T>,
  'queryKey' | 'queryFn'
>;