import { provide, inject, InjectionKey, reactive, toRefs } from '@vue/composition-api'

export type UserType = {
  uid?:string,
  displayName:string,
  email:string,
  photoURL:string,
}

export type ErrorType = {
  state:number
  message:string
}
export type GlobalStateType = {
  user:UserType,
  error?:ErrorType
}

export const useGlobalState = () => {
  const globalState = reactive<GlobalStateType>({
    user: {
      uid: '',
      displayName: '',
      email: '',
      photoURL: ''
    }
  })

  const setUserState = (state: UserType) => {
    globalState.user.uid = state.uid
    globalState.user.email = state.email
    globalState.user.photoURL = state.photoURL
    globalState.user.displayName = state.displayName
  }

  const cleanUserState = () => {
    globalState.user = {
      uid: '',
      displayName: '',
      email: '',
      photoURL: ''
    }
  }
  return {
    ...toRefs(globalState),
    setUserState,
    cleanUserState
  }
}

type StateType = ReturnType<typeof useGlobalState>

export const GlobalStateKey:InjectionKey<StateType> = Symbol('GlobalState')
export const ErrorStateKey: InjectionKey<ErrorType> = Symbol('ErrorState')

export const provideGlobalState = () => {
  provide(GlobalStateKey, useGlobalState())
}

export const injectGlobalState = () => {
  const state = inject(GlobalStateKey)
  if (!state) {
    throw new Error('Unable to install User State')
  }
  return state
}
