import NoteForm from "../components/NoteForm"
import type { NoteData, Tag } from "../App";
type NewNoteProps = {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
}


const TestingWaters = ({onSubmit, onAddTag, availableTags} : NewNoteProps) => {
  return (
    <div className="mb-5 p-5 font-bold text-gray-700">
     <h1 className="font-bold"> 
      New  Note 

     </h1>
      <NoteForm onSubmit={onSubmit} onAddTag={onAddTag} availableTags={availableTags}/>
      
    </div>
  )
}

export default TestingWaters
