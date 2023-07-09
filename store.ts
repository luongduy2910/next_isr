import create from 'zustand'
import { EditedComment, EditedNote } from './types/types'

type State = {
  editedNote: EditedNote
  editedComment: EditedComment
  updateEditedNote: (payload: EditedNote) => void
  updateEditedComment: (payload: EditedComment) => void
  resetEditedNote: () => void
  resetEditedComment: () => void
}

const useStore = create<State>((set, _) => ({
  editedNote: { id: '', content: '', title: '' },
  editedComment: { id: '', content: '' },
  updateEditedNote: (payload) =>
    set({
      editedNote: {
        id: payload.id,
        content: payload.content,
        title: payload.title,
      },
    }),
  resetEditedNote: () =>
    set({
      editedNote: {
        id: '',
        content: '',
        title: '',
      },
    }),
  updateEditedComment: (payload) =>
    set({
      editedComment: {
        id: payload.id,
        content: payload.content,
      },
    }),
  resetEditedComment: () =>
    set({
      editedComment: {
        id: '',
        content: '',
      },
    }),
}))

export default useStore
