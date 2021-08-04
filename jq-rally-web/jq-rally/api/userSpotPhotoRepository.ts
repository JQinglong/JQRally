import { NuxtAxiosInstance } from '@nuxtjs/axios'
import {
  UserSpotPhotoType as ResourceType,
  ResponseType,
  ResponseTypes,
  CustomErrors,
  ListRequestType
} from '@/types'
import { LIMIT_LIST_ITEM } from '@/constants'

type Id = ResourceType['id']
const res = 'user_spot_photo'

// 追加フィルタが必要な場合は独自にinterface定義する
export interface UserSpotPhotoListRequest {
  limit?: number
  offset?: number
  spot?: string
  search?: string
  ordering?: string
}

// Pick 第1引数から第2引数以降で指定したkey値とその値で構成されたObjectを返す。
// PickではなくOmmit
export type CreateUserSpotPhotoRequest = Omit<
ResourceType,
  'id'
>
export type UpdateUserSpotPhotoPayload = Partial<CreateUserSpotPhotoRequest>
export type UpdateUserSpotPhotoRequest = {
  payload: UpdateUserSpotPhotoPayload
  id: Id
}

type Response = ResponseType<ResourceType>
type ListResponse = ResponseTypes<{count: number, next: ResourceType[], previous: ResourceType[], results: ResourceType[] }>

export const userSpotPhotoRepository = (axios: NuxtAxiosInstance) => ({
  get (id: Id): Response {
    return axios.$get(`/${res}/${id}`)
  },

  getList ({
    limit = LIMIT_LIST_ITEM,
    offset = 0
  }: UserSpotPhotoListRequest = {}): ListResponse {
    const defaultParam = {
    }

    return axios.$get(`/${res}/`, {
      params: { ...defaultParam, limit, offset }
    })
  },
  create (payload: CreateUserSpotPhotoRequest): Response | CustomErrors {
    return axios.$post(`/${res}/`, payload)
  },
  update (request: UpdateUserSpotPhotoRequest): Response | CustomErrors {
    return axios.$put(`/${res}/${request.id}/`, request.payload)
  },
  delete (id: Id) {
    return axios.$delete(`/${res}/${id}/`)
  }

})

export type UserSpotPhotoRepository = ReturnType<typeof userSpotPhotoRepository>
