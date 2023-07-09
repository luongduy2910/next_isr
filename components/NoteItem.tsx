import { FC, useState, useEffect } from 'react'
import { Note } from '../types/types'
import useStore from '../store'
import { supabase } from '../utils/supabase'
import { useMutateNote } from '../hooks/useMutateNote'
import { Spinner } from './Spinner'
import Link from 'next/link'
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid'

export const NoteItem: FC<Omit<Note, 'created_at' | 'note_id' | 'comments'>> = ({ id, content, title, user_id }) => {
    const [userId, setUserId] = useState<string | undefined>('')
    const update = useStore(state => state.updateEditedNote)
    const { deleteNoteMutation } = useMutateNote()
    useEffect(() => {
        setUserId(supabase.auth.user()?.id)
    }, [])
    if (deleteNoteMutation.isLoading) <Spinner />
    return (
        <li className='my-3'>
            <Link href={`/note/${id}`} prefetch={false} className='hover:text-pink-600'>
                {title}
            </Link>
            {userId === user_id && (
                <div className='float-right ml-20 flex'>
                    <PencilAltIcon
                        onClick={() => {
                            update({
                                id,
                                title,
                                content
                            })
                        }}
                        className='nx-1 h-5 w-5 cursor-pointer text-blue-500'
                    />
                    <TrashIcon
                        onClick={() => {
                            deleteNoteMutation.mutate(id)
                        }}
                        className='h-5 w-5 cursor-pointer text-blue-500'
                    />
                </div>
            )}
        </li>
    )
}
