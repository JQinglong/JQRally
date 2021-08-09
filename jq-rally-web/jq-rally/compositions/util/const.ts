import { MemoType, EventType, EventSpotType, UserType, EventUserType, UserSpotType, UserSpotPhotoType, UserSpotCommentType } from '@/types'

export const defaultMemoItem: MemoType = {
  id: 0,
  title: '',
  memo: ''
}

export const defaultEventItem: EventType = {
  id: '',
  name: '',
  eventImg: ''
}

export const defaultEventSpotItem: EventSpotType = {
  id: '',
  event: defaultEventItem,
  name: '',
  description: '',
  spotImg: '',
  address: '',
  latitude: 0,
  longitude: 0,
  stampImg: ''
}

// export const defaultUserItem: UserType = {
//   id: '',
//   name: '',
//   mail: '',
//   comment: ''
// }
export const defaultUserItem: UserType = {
  id: '3cd8251f-fff4-4b4f-b430-63e4a5e19d2d',
  name: '金野',
  mail: 'konnokiyotaka@gmail.com',
  comment: ''
}

export const defaultEventUserItem: EventUserType = {
  id: '',
  event: defaultEventItem,
  user: defaultUserItem
}

export const defaultUserSpotItem: UserSpotType = {
  id: '',
  user: defaultUserItem,
  event: defaultEventItem,
  spot: defaultEventSpotItem,
  stamp: ''
}

export const defaultUserSpotPhotoItem: UserSpotPhotoType = {
  id: '',
  user: defaultUserItem,
  event: defaultEventItem,
  spot: defaultEventSpotItem,
  visit_date: null,
  photo: null
}

export const defaultUserSpotCommentItem: UserSpotCommentType = {
  id: '',
  user: defaultUserItem,
  event: defaultEventItem,
  spot: defaultEventSpotItem,
  visit_date: null,
  comment: ''
}
