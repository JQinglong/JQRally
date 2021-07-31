import { NuxtAxiosInstance } from '@nuxtjs/axios'
import {
  UserType as ResourceType,
  ResponseType,
  ResponseTypes,
  CustomErrors,
  ListRequestType
} from '@/types'
import { LIMIT_LIST_ITEM } from '@/constants'

type Id = ResourceType['id']
const res = 'user'

// 追加フィルタが必要な場合は独自にinterface定義する
// export interface ListRequest {
//   limit?: number
//   offset?: number
//   ministry?: string
//   person?: string
// }

// Pick 第1引数から第2引数以降で指定したkey値とその値で構成されたObjectを返す。
// PickではなくOmmit
export type CreateUserRequest = Omit<
ResourceType,
  'id'
>
export type UpdateUserPayload = Partial<CreateUserRequest>
export type UpdateUserRequest = {
  payload: UpdateUserPayload
  id: Id
}

type Response = ResponseType<ResourceType>
type ListResponse = ResponseTypes<{count: number, next: ResourceType[], previous: ResourceType[], results: ResourceType[] }>

export const userRepository = (axios: NuxtAxiosInstance) => ({
  get (id: Id): Response {
    return axios.$get(`/${res}/${id}`)
  },

  getList ({
    limit = LIMIT_LIST_ITEM,
    offset = 0
  }: ListRequestType = {}): ListResponse {
    const defaultParam = {
    }

    return axios.$get(`/${res}/`, {
      params: { ...defaultParam, limit, offset }
    })
  },
  create (payload: CreateUserRequest): Response | CustomErrors {
    return axios.$post(`/${res}/`, payload)
  },
  update (request: UpdateUserRequest): Response | CustomErrors {
    return axios.$put(`/${res}/${request.id}/`, request.payload)
  },
  delete (id: Id) {
    return axios.$delete(`/${res}/${id}/`)
  }

})

export type UserRepository = ReturnType<typeof userRepository>
