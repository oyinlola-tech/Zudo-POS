export interface ICommand<TInput, TOutput> {
  execute(input: TInput): Promise<TOutput>
}

export interface IQuery<TInput, TOutput> {
  execute(input: TInput): Promise<TOutput>
}

export interface IService {
  commands: Record<string, ICommand<unknown, unknown>>
  queries: Record<string, IQuery<unknown, unknown>>
}
