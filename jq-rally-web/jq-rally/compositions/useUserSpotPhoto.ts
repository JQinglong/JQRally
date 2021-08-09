import { reactive, useContext } from '@nuxtjs/composition-api'
import { CreateUserSpotPhotoRequest, UpdateUserSpotPhotoRequest, UserSpotPhotoListRequest } from '@/api/userSpotPhotoRepository'
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

  const getList = async (payload: UserSpotPhotoListRequest = {}) => {
    const list = await $repository.userSpotPhoto.getList(payload)

    // console.log('memos', memos)
    state.resourceList = list.results
    state.resourceCount = list.count
  }

  const createData = async (payload: CreateUserSpotPhotoRequest) => {
    try {
      const response = await $repository.userSpotPhoto.create(payload)

      // eslint-disable-next-line no-console
      console.log('userSpotPhoto.create response', response)
      if (response) {
        await getList()
        return response
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('userSpotPhoto.create error', error)
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
