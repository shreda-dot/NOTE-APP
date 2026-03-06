import { Link, useNavigate } from "react-router-dom"
import { useNote } from "../Layout/NoteLayout"
import ReactMarkdown from "react-markdown"

type NoteProps = {
  onDelete: (id: string) => void
}

export function Note({ onDelete }: NoteProps) {
  const note = useNote()
  const navigate = useNavigate()

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Header Section (The "Row") */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{note.title}</h1>
          
          {/* Tags Section (The "Stack") */}
          {note.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {note.tags.map(tag => (
                <span 
                  key={tag.id} 
                  className="px-2 py-1 bg-blue-600 text-white text-xs font-semibold rounded truncate max-w-[150px]"
                >
                  {tag.label}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Buttons Section (The "Stack") */}
        <div className="flex flex-wrap items-center gap-3">
          <Link to={`/${note.id}/edit`}>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded transition-colors">
              Edit
            </button>
          </Link>
          
          <button
            onClick={() => {
              onDelete(note.id)
              navigate("/")
            }}
            className="px-4 py-2 border border-red-500 text-red-500 hover:bg-red-50 font-medium rounded transition-colors"
          >
            Delete
          </button>

          <Link to="/">
            <button className="px-4 py-2 border border-gray-400 text-gray-600 hover:bg-gray-100 font-medium rounded transition-colors">
              Back
            </button>
          </Link>
        </div>
      </div>

      {/* Markdown Content Section */}
      <div className="prose prose-slate max-w-none border-t pt-6">
        <ReactMarkdown>{note.body}</ReactMarkdown>
      </div>
    </div>
  )
}