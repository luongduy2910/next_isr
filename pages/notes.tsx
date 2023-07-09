import { GetStaticProps, NextPage } from 'next'
import React from 'react'
import { supabase } from '../utils/supabase'
import { Layout } from '../components/layout'
import { DocumentTextIcon, LogoutIcon } from '@heroicons/react/solid'
import { Note } from '../types/types'
import { NoteItem } from '../components/NoteItem'
import { NoteForm } from '../components/NoteForm'

export const getStaticProps: GetStaticProps = async () => {
  console.log('ISR involked - note page')
  const { error, data: notes } = await supabase
    .from('notes')
    .select('*')
    .order('created_at', { ascending: true })
  if (error) throw new Error(error.message)
  return {
    props: { notes },
    revalidate: false,
  }
}

type Props = {
  notes: Note[]
}

const Notes: NextPage<Props> = ({ notes }) => {
  const signOut = () => {
    supabase.auth.signOut()
  }
  return (
    <Layout title="Notes">
      <LogoutIcon
        className="h-6 w-6 cursor-pointer text-blue-500"
        onClick={signOut}
      />
      <DocumentTextIcon className="h-8 w-8 text-blue-500" />
      <NoteForm />
      {notes.map((note) => (
        <NoteItem
          key={note.id}
          id={note.id}
          title={note.title}
          content={note.content}
          user_id={note.user_id}
        />
      ))}
    </Layout>
  )
}

export default Notes
