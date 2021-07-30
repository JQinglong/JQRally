import { reactive, useContext } from '@nuxtjs/composition-api'
import { CreateEventSpotRequest, UpdateEventSpotRequest } from '@/api/eventSpotRepository'
import { EventSpotType as ResourceType, ListRequestType } from '@/types'
// import MemoKey from '~/store/memo-key';
import { defaultEventSpotItem as defaultItem } from '@/compositions/util/const'

type ResourcePayload = Required<CreateEventSpotRequest>
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

export default function useEventSpot () {
  const { $repository } = useContext()

  const createState = reactive<CreateState>(initCreateState)
  // const state = reactive<State>(initState)
  const state = reactive<State>({
    resourceData: defaultItem,
    resourceList: [],
    resourceCount: 0
  })
  const getData = async (id: ResourceType['id']) => {
    const data = await $repository.eventSpot.get(id)
    // console.log('memoid', memoid)
    // console.log('getMemo', memoData)

    state.resourceData = data
  }

  const getList = async (payload: ListRequestType = {}) => {
    const list = await $repository.eventSpot.getList(payload)

    // console.log('memos', memos)
    state.resourceList = list
    state.resourceCount = list.length
  }

  const createData = async (payload: CreateEventSpotRequest) => {
    const response = await $repository.eventSpot.create(payload)

    // console.log('createMemo response', response)
    if (response) {
      await getList()
      return response
    }

    return false
  }

  const updateData = async (payload: UpdateEventSpotRequest) => {
    const data = await $repository.eventSpot.update(payload)

    if (data) {
      return data
    }

    return false
  }

  const deleteData = async (id: ResourceType['id']) => {
    await $repository.eventSpot.delete(id)
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
