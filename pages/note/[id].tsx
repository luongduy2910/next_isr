import { GetStaticPaths, GetStaticProps } from 'next'
import { FC } from 'react'
import { supabase } from '../../utils/supabase'
import { Layout } from '../../components/layout'
import { Note } from '../../types/types'
import { CommentItem } from '../../components/CommentItem'
import { CommentForm } from '../../components/CommentForm'
import Link from 'next/link'
import { ChevronDoubleLeftIcon } from '@heroicons/react/solid'

const getAllNoteIds = async () => {
    const { data: ids } = await supabase.from('notes').select('id')
    return ids!.map(id => {
        return {
            params: {
                id: String(id.id)
            }
        }
    })

}

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = await getAllNoteIds()
    return {
        paths,
        fallback: 'blocking'
    }
}


export const getStaticProps: GetStaticProps = async (ctx) => {
    console.log('ISR invoked - detailed page')
    const { data: note } = await supabase
        .from('notes')
        .select('* , comments(*)')
        .eq('id', ctx.params?.id)
        .single()
    return {
        props: {
            note
        },
        revalidate: false
    }
}

type StaticProps = {
    note: Note
}

const NotePage: FC<StaticProps> = ({ note }) => {
    return (
        <Layout title='NoteDetail'>
            <p className='text-3xl font-semibold text-blue-500'>{note.title}</p>
            <div className='m-8 rounded-lg p-4 shadow-lg'>
                <p>{note.content}</p>
            </div>
            <ul className='my-2'>
                {note.comments?.map(commnent =>
                    <CommentItem
                        key={commnent.id}
                        id={commnent.id}
                        content={commnent.content}
                        user_id={commnent.user_id}
                    />
                )}
            </ul>
            <CommentForm noteId={note.id} />
            <Link href={'/notes'} prefetch={false}>
                <ChevronDoubleLeftIcon className='my-3 h-6 w-6 cursor-pointer text-blue-500' />
            </Link>
        </Layout>
    )
}

export default NotePage
