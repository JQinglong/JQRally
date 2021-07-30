import { reactive, useContext } from '@nuxtjs/composition-api'
import { CreateEventUserRequest, UpdateEventUserRequest } from '@/api/eventUserRepository'
import { EventUserType as ResourceType, ListRequestType } from '@/types'
// import MemoKey from '~/store/memo-key';
import { defaultEventUserItem as defaultItem } from '@/compositions/util/const'

type ResourcePayload = Required<CreateEventUserRequest>
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

export default function useEventUser () {
  const { $repository } = useContext()

  const createState = reactive<CreateState>(initCreateState)
  // const state = reactive<State>(initState)
  const state = reactive<State>({
    resourceData: defaultItem,
    resourceList: [],
    resourceCount: 0
  })
  const getData = async (id: ResourceType['id']) => {
    const data = await $repository.eventUser.get(id)
    // console.log('memoid', memoid)
    // console.log('getMemo', memoData)

    state.resourceData = data
  }

  const getList = async (payload: ListRequestType = {}) => {
    const list = await $repository.eventUser.getList(payload)

    // console.log('memos', memos)
    state.resourceList = list
    state.resourceCount = list.length
  }

  const createData = async (payload: CreateEventUserRequest) => {
    const response = await $repository.eventUser.create(payload)

    // console.log('createMemo response', response)
    if (response) {
      await getList()
      return response
    }

    return false
  }

  const updateData = async (payload: UpdateEventUserRequest) => {
    const data = await $repository.eventUser.update(payload)

    if (data) {
      return data
    }

    return false
  }

  const deleteData = async (id: ResourceType['id']) => {
    await $repository.eventUser.delete(id)
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
