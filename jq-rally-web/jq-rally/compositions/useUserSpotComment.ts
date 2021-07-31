import { reactive, useContext } from '@nuxtjs/composition-api'
import { CreateUserSpotCommentRequest, UpdateUserSpotCommentRequest } from '@/api/userSpotCommentRepository'
import { UserSpotCommentType as ResourceType, ListRequestType } from '@/types'
// import MemoKey from '~/store/memo-key';
import { defaultUserSpotCommentItem as defaultItem } from '@/compositions/util/const'

type ResourcePayload = Required<CreateUserSpotCommentRequest>
type CreateState = ResourcePayload
type State = {
  resourceData: ResourceType
  resourceList: ResourceType[]
  resourceCount: number
}

const initCreateState = defaultItem
// const initState = {
//   event: defaultItem
// }

export default function useUserSpotComment () {
  const { $repository } = useContext()

  const createState = reactive<CreateState>(initCreateState)
  // const state = reactive<State>(initState)
  const state = reactive<State>({
    resourceData: defaultItem,
    resourceList: [],
    resourceCount: 0
  })
  const getData = async (id: ResourceType['id']) => {
    const data = await $repository.userSpotComment.get(id)
    // console.log('memoid', memoid)
    // console.log('getMemo', memoData)

    state.resourceData = data
  }

  const getList = async (payload: ListRequestType = {}) => {
    const list = await $repository.userSpotComment.getList(payload)

    // console.log('memos', memos)
    state.resourceList = list.results
    state.resourceCount = list.count
  }

  const createData = async (payload: CreateUserSpotCommentRequest) => {
    const response = await $repository.userSpotComment.create(payload)

    // console.log('createMemo response', response)
    if (response) {
      await getList()
      return response
    }

    return false
  }

  const updateData = async (payload: UpdateUserSpotCommentRequest) => {
    const data = await $repository.userSpotComment.update(payload)

    if (data) {
      return data
    }

    return false
  }

  const deleteData = async (id: ResourceType['id']) => {
    await $repository.userSpotComment.delete(id)
    await getList()
  }
  return {
    createState,
    state,
    getData,
    getList,
    createData,
    updateData,
    deleteData
  }
}
