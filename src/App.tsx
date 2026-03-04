import "./index.css"
import { Route, Routes } from "react-router-dom"
import Edit from "./Pages/Edit"
import NewNote from "./Pages/New"
import NoteList from "./Pages/NoteList"
import uselocalStorage from "../hooks/useLocalStorage"
import { useMemo } from "react"

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
  const addTag = (tag: Tag) => {
    setTags(prev => [...prev, tag])
  }
  return (
    <Routes>
    <Route path="/" element={<NoteList availableTags={tags} notes={noteWithTags} />} />
      <Route path="/new" element={<NewNote onSubmit={onCreateNote} onAddTag={addTag} availableTags={tags}/>} />

      <Route path="*" element={<div className="text-center bg-blue-500 h-screen flex align-center justify-center items-center">Page Not Found</div>} />

      <Route path="/:id">
      <Route index element={<div>Home</div>} />
      <Route path="edit" element={<Edit/>} />
      </Route>
      
    </Routes>
   
  )
}

export default App
