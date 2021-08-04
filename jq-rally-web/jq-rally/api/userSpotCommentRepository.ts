import { NuxtAxiosInstance } from '@nuxtjs/axios'
import {
  UserSpotCommentType as ResourceType,
  ResponseType,
  ResponseTypes,
  CustomErrors,
  ListRequestType
} from '@/types'
import { LIMIT_LIST_ITEM } from '@/constants'

type Id = ResourceType['id']
const res = 'user_spot_comment'

// 追加フィルタが必要な場合は独自にinterface定義する
export interface UserSpotCommentListRequest {
  limit?: number
  offset?: number
  spot?: string
  search?: string
  ordering?: string
}

// Pick 第1引数から第2引数以降で指定したkey値とその値で構成されたObjectを返す。
// PickではなくOmmit
export type CreateUserSpotCommentRequest = Omit<
ResourceType,
  'id'
>
export type UpdateUserSpotCommentPayload = Partial<CreateUserSpotCommentRequest>
export type UpdateUserSpotCommentRequest = {
  payload: UpdateUserSpotCommentPayload
  id: Id
}

type Response = ResponseType<ResourceType>
type ListResponse = ResponseTypes<{count: number, next: ResourceType[], previous: ResourceType[], results: ResourceType[] }>

export const userSpotCommentRepository = (axios: NuxtAxiosInstance) => ({
  get (id: Id): Response {
    return axios.$get(`/${res}/${id}`)
  },

  getList ({
    limit = LIMIT_LIST_ITEM,
    offset = 0
  }: UserSpotCommentListRequest = {}): ListResponse {
    const defaultParam = {
    }

    return axios.$get(`/${res}/`, {
      params: { ...defaultParam, limit, offset }
    })
  },
  create (payload: CreateUserSpotCommentRequest): Response | CustomErrors {
    return axios.$post(`/${res}/`, payload)
  },
  update (request: UpdateUserSpotCommentRequest): Response | CustomErrors {
    return axios.$put(`/${res}/${request.id}/`, request.payload)
  },
  delete (id: Id) {
    return axios.$delete(`/${res}/${id}/`)
  }

})

export type UserSpotCommentRepository = ReturnType<typeof userSpotCommentRepository>
