export type ResponseType<V> = Promise<V>
export type ResponseMapType<K extends string, V> = Promise<{ [P in K]: V }>

export type ResponseTypes<T> = Promise<T>

export type CustomErrors = {
  errors: {
    errorName: string[]
  }
}

export interface ListRequestType  {
  limit?: number
  offset?: number
}

export interface MemoType {
  id: number
  title: string
  memo: string
}