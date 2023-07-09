import { FC, FormEvent } from 'react'
import useStore from '../store'
import { useMutateNote } from '../hooks/useMutateNote'
import { supabase } from '../utils/supabase'
import { Spinner } from './Spinner'

export const NoteForm: FC = () => {
    const { editedNote } = useStore()
    const update = useStore((state) => state.updateEditedNote)
    const { createNoteMutation, updateNoteMutation } = useMutateNote()
    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (editedNote.id === '') {
            createNoteMutation.mutate({
                title: editedNote.title,
                content: editedNote.content,
                user_id: supabase.auth.user()?.id,
            })
        } else {
            updateNoteMutation.mutate({
                id: editedNote.id,
                title: editedNote.title,
                content: editedNote.content,
            })
        }
    }
    if (createNoteMutation.isLoading || updateNoteMutation.isLoading) <Spinner />
    return (
        <form onSubmit={submitHandler}>
            <div>
                <input
                    value={editedNote.title}
                    onChange={(e) => update({ ...editedNote, title: e.target.value })}
                    type="text"
                    placeholder="Your title"
                    className="my-2 rounded border border-gray-300 px-3 py-2 text-sm placeholder-gray-500 focus:border-indigo-500 focus:outline-none"
                />
            </div>
            <div>
                <textarea
                    value={editedNote.content}
                    onChange={(e) => update({ ...editedNote, content: e.target.value })}
                    placeholder="Your content"
                    cols={50}
                    rows={10}
                    className="my-2 rounded border border-gray-300 px-3 py-2 text-sm placeholder-gray-500 focus:border-indigo-500 focus:outline-none"
                />
            </div>
            <div className="my-2 flex justify-center">
                <button
                    type="submit"
                    className="ml-2 rounded bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                >
                    {editedNote.id ? 'Update' : 'Create'}
                </button>
            </div>
        </form>
    )
}
