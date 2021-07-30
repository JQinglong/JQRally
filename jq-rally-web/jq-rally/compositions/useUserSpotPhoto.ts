import { reactive, useContext } from '@nuxtjs/composition-api'
import { CreateUserSpotPhotoRequest, UpdateUserSpotPhotoRequest } from '@/api/userSpotPhotoRepository'
import { UserSpotPhotoType as ResourceType, ListRequestType } from '@/types'
// import MemoKey from '~/store/memo-key';
import { defaultUserSpotPhotoItem as defaultItem } from '@/compositions/util/const'

type ResourcePayload = Required<CreateUserSpotPhotoRequest>
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

export default function useUserSpotPhoto () {
  const { $repository } = useContext()

  const createState = reactive<CreateState>(initCreateState)
  // const state = reactive<State>(initState)
  const state = reactive<State>({
    resourceData: defaultItem,
    resourceList: [],
    resourceCount: 0
  })
  const getData = async (id: ResourceType['id']) => {
    const data = await $repository.userSpotPhoto.get(id)
    // console.log('memoid', memoid)
    // console.log('getMemo', memoData)

    state.resourceData = data
  }

  const getList = async (payload: ListRequestType = {}) => {
    const list = await $repository.userSpotPhoto.getList(payload)

    // console.log('memos', memos)
    state.resourceList = list
    state.resourceCount = list.length
  }

  const createData = async (payload: CreateUserSpotPhotoRequest) => {
    const response = await $repository.userSpotPhoto.create(payload)

    // console.log('createMemo response', response)
    if (response) {
      await getList()
      return response
    }

    return false
  }

  const updateData = async (payload: UpdateUserSpotPhotoRequest) => {
    const data = await $repository.userSpotPhoto.update(payload)

    if (data) {
      return data
    }

    return false
  }

  const deleteData = async (id: ResourceType['id']) => {
    await $repository.userSpotPhoto.delete(id)
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
