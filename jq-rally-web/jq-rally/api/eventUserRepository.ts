import { NuxtAxiosInstance } from '@nuxtjs/axios'
import {
  EventUserType as ResourceType,
  ResponseType,
  ResponseTypes,
  CustomErrors,
  ListRequestType
} from '@/types'
import { LIMIT_LIST_ITEM } from '@/constants'

type Id = ResourceType['id']
const res = 'event_user'

// 追加フィルタが必要な場合は独自にinterface定義する
export interface EventUserListRequest {
  limit?: number
  offset?: number
  event?: string
  search?: string
  ordering?: string
}

// Pick 第1引数から第2引数以降で指定したkey値とその値で構成されたObjectを返す。
// PickではなくOmmit
export type CreateEventUserRequest = Omit<
ResourceType,
  'id'
>
export type UpdateEventUserPayload = Partial<CreateEventUserRequest>
export type UpdateEventUserRequest = {
  payload: UpdateEventUserPayload
  id: Id
}

type Response = ResponseType<ResourceType>
type ListResponse = ResponseTypes<{count: number, next: ResourceType[], previous: ResourceType[], results: ResourceType[] }>

export const eventUserRepository = (axios: NuxtAxiosInstance) => ({
  get (id: Id): Response {
    return axios.$get(`/${res}/${id}`)
  },

  getList ({
    limit = LIMIT_LIST_ITEM,
    offset = 0,
    event = '',
    search = '',
    ordering = 'id'
  }: EventUserListRequest = {}): ListResponse {
    const defaultParam = {
    }

    return axios.$get(`/${res}/`, {
      params: { ...defaultParam, limit, offset, event, search, ordering }
    })
  },
  create (payload: CreateEventUserRequest): Response | CustomErrors {
    return axios.$post(`/${res}/`, payload)
  },
  update (request: UpdateEventUserRequest): Response | CustomErrors {
    return axios.$put(`/${res}/${request.id}/`, request.payload)
  },
  delete (id: Id) {
    return axios.$delete(`/${res}/${id}/`)
  }

})

export type EventUserRepository = ReturnType<typeof eventUserRepository>
