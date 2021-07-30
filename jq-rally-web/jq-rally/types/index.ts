export type ResponseType<V> = Promise<V>
export type ResponseMapType<K extends string, V> = Promise<{ [P in K]: V }>

export type ResponseTypes<T> = Promise<T>

export type CustomErrors = {
  errors: {
    errorName: string[]
  }
}

export interface ListRequestType {
  limit?: number
  offset?: number
}

export interface MemoType {
  id: number
  title: string
  memo: string
}

export interface EventType {
  id: string
  name: string
}

export interface EventSpotType {
  id: string
  event: EventType
  name: string
  description: string
  address: string
  latitude: number
  longitude: number
  stampImg: string
}

export interface UserType {
  id: string
  name: string
  mail: string
  comment: string
}

export interface EventUserType {
  id: string
  event: EventType
  user: UserType
}

export interface UserSpotType {
  id: string
  user: UserType
  event: EventType
  spot: EventSpotType
  stamp: string
}

export interface UserSpotPhotoType {
  id: string
  user: UserType
  event: EventType
  spot: EventSpotType
  stamp: string
  visitDate: Date
  photo: string
}

export interface UserSpotCommentType {
  id: string
  user: UserType
  event: EventType
  spot: EventSpotType
  stamp: string
  visitDate: Date
  comment: string
}
