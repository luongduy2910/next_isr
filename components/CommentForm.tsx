import { FC, FormEvent } from 'react'
import useStore from '../store'
import { supabase } from '../utils/supabase'
import { useMutateComment } from '../hooks/useMutateComment'
import { Spinner } from './Spinner'

export const CommentForm: FC<{ noteId: string }> = ({ noteId }) => {
    const { editedComment } = useStore()
    const update = useStore(state => state.updateEditedComment)
    const { createCommentMutation, updateCommentMutation } = useMutateComment()
    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (editedComment.id === '') {
            createCommentMutation.mutate({
                content: editedComment.content,
                user_id: supabase.auth.user()?.id,
                note_id: noteId
            })
        } else {
            updateCommentMutation.mutate({
                id: editedComment.id,
                content: editedComment.content,
            })
        }
    }
    if (createCommentMutation.isLoading || updateCommentMutation.isLoading) <Spinner />
    return (
        <form onSubmit={submitHandler}>
            <input
                onChange={e => update({ ...editedComment, content: e.target.value })}
                value={editedComment.content}
                type='text'
                placeholder='Your text'
                className='px-3 py-2 rounded border border-gray-500 text-sm placeholder-gray-500 focus:border-indigo-500 focus:outline-none'
            />
            <button
                type='submit'
                className='bg-indigo-600 ml-2 px-3 py-2 hover:bg-indigo-700 text-white font-medium'
            >
                {editedComment.id ? 'Update' : 'Send'}

            </button>
        </form>
    )
}
