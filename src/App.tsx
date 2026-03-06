import "./index.css"
import { Route, Routes } from "react-router-dom"
import Edit from "./Pages/Edit"
import NewNote from "./Pages/New"
import NoteList from "./Pages/NoteList"
import uselocalStorage from "../hooks/useLocalStorage"
import { useMemo } from "react"
import NotFound from "./Pages/NotFound"
import { NoteLayout } from "./Layout/NoteLayout"
import { Note } from "./Pages/Notes"

export type Note = {
  id: string;
} & NoteData

 export type NoteData = {
  title: string;
  body: string;
  tags: Tag[];
}
export type RawNote = {
  id: string;
} & RawNoteData

export type RawNoteData = {
  title: string;
  body: string;
  tagIds: string[];
}
export type Tag = {
  id: string;
  label: string;
}
const App = () => {
  const [notes, setNotes] = uselocalStorage<RawNote[]>("NOTES", []);
  const [tags, setTags] = uselocalStorage<Tag[]>("TAGS", []);
  const noteWithTags = useMemo(() => {
    return notes.map(note => {
      return {...note, tags: tags.filter(tag => note.tagIds.includes(tag.id))}
    })
  }, [notes, tags])
  function onCreateNote({tags, ...data}: NoteData) {
    setNotes(prevNotes => {
      return[...prevNotes, { ...data, id: crypto.randomUUID(), tagIds: tags.map(tag => tag.id) }]

    })
  }
  // update note function
   function onUpdateNote(id: string, { tags, ...data }: NoteData) {
    setNotes(prevNotes => {
      return prevNotes.map(note => {
        if (note.id === id) {
          return { ...note, ...data, tagIds: tags.map(tag => tag.id) }
        } else {
          return note
        }
      })
    })
  }
  
  // delete note function
  function onDeleteNote(id: string) {
    setNotes(prevNotes => {
      return prevNotes.filter(note => note.id !== id)
    })
  }

  const addTag = (tag: Tag) => {
    setTags(prev => [...prev, tag])
  }
  // delete update Tag function
   function updateTag(id: string, label: string) {
    setTags(prevTags => {
      return prevTags.map(tag => {
        if (tag.id === id) {
          return { ...tag, label }
        } else {
          return tag
        }
      })
    })
  }
  // delete tag function
  function deleteTag(id: string) {
    setTags(prevTags => {
      return prevTags.filter(tag => tag.id !== id)
    })
  }

  return (
    <Routes>
    <Route path="/" element={<NoteList availableTags={tags} notes={noteWithTags} onDeleteTag={deleteTag} onUpdateTag={updateTag} />} /> 
    
      <Route path="/new" element={<NewNote onSubmit={onCreateNote} onAddTag={addTag} availableTags={tags}/>} />

     

      <Route path="/:id" element={<NoteLayout notes={noteWithTags} />} >
      <Route index element={<Note onDelete={onDeleteNote} />}/>
       <Route
            path="edit"
            element={
              <Edit
                onSubmit={onUpdateNote}
                onAddTag={addTag}
                availableTags={tags}
              />
            }
          />
      </Route>
        <Route path="*" element={<NotFound />} />
    </Routes>
   
  )
}

export default App
