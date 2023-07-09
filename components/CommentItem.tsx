import { FC, useState, useEffect } from 'react'
import { Comment } from '../types/types'
import { useMutateComment } from '../hooks/useMutateComment'
import useStore from '../store'
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid'
import { supabase } from '../utils/supabase'
import { Spinner } from './Spinner'

export const CommentItem: FC<Omit<Comment, 'created_at' | 'note_id'>> = ({ id, content, user_id }) => {
    const [userId, setuserId] = useState<string | undefined>('')
    const { deleteCommentMutation } = useMutateComment()
    const update = useStore(state => state.updateEditedComment)
    useEffect(() => {
        setuserId(supabase.auth.user()?.id)
    }, [])
    if (deleteCommentMutation.isLoading) <Spinner />
    return (
        <li>
            <span className='font-extrabold text-lg'>{content}</span>
            {userId === user_id && (
                <div className='float-right ml-20 flex'>
                    <PencilAltIcon
                        onClick={() => {
                            update({ content, id })
                        }}
                        className='mx-1 w-6 h-6 text-blue-500 cursor-pointer'
                    />
                    <TrashIcon
                        onClick={() => {
                            deleteCommentMutation.mutate(id)
                        }}
                        className='w-6 h-6 text-blue-500 cursor-pointer'
                    />
                </div>
            )}
        </li>
    )
}
