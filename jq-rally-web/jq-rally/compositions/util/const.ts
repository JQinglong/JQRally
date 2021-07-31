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

export const defaultUserItem: UserType = {
  id: '',
  name: '',
  mail: '',
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
  stamp: '',
  visitDate: new Date(),
  photo: ''
}

export const defaultUserSpotCommentItem: UserSpotCommentType = {
  id: '',
  user: defaultUserItem,
  event: defaultEventItem,
  spot: defaultEventSpotItem,
  stamp: '',
  visitDate: new Date(),
  comment: ''
}
