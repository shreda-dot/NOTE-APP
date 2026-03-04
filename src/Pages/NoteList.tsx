import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import type { Note, Tag } from "../App";

type NoteListProps = {
  availableTags: Tag[];
  notes: Note[];
};
type SimplifiedNote = {
  tags: Tag[];
  title: string;
  id: string;
};

const NoteList = ({ availableTags, notes }: NoteListProps) => {
  const [Selectedtags, setSelectedTags] = React.useState<Tag[]>([]);
  const [title, setTitle] = React.useState("");
  const filterNote = useMemo(() => {
    return notes.filter((note) => {
      return (
        (title === "" ||
          note.title.toLowerCase().includes(title.toLowerCase())) &&
        (Selectedtags.length === 0 ||
          Selectedtags.every((tag) =>
            note.tags.some((noteTag) => noteTag.id === tag.id),
          ))
      );
    });
  }, [title, Selectedtags, notes]);

  return (
    <>
      <div className="mb-5 p-5 font-bold text-gray-700 flex align-center justify-center items-center">
        <h1 className="font-bold">Notes</h1>
        <div className="ml-auto flex align-center justify-center items-center">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300">
            <Link to="/new" className="text-white no-underline">
              Create Note
            </Link>
          </button>
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors duration-300 ml-2">
            <Link to="/edit" className="text-white no-underline">
              Edit Note
            </Link>
          </button>
        </div>
      </div>
      <form>
        <div className="form-row flex gap-4 mb-4 p-4">
          <div className="form-group w-full ">
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-bold text-gray-700"
            >
              TITLE
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="form-group w-full">
            <label
              htmlFor="tags"
              className="mb-2 block text-sm font-bold text-gray-700"
            >
              TAGS
            </label>
            <ReactSelect
              id="tags"
              value={Selectedtags.map((tag) => ({
                label: tag.label,
                value: tag.id,
              }))}
              onChange={(tags) => {
                setSelectedTags(
                  tags.map((tag) => ({ label: tag.label, id: tag.value })),
                );
              }}
              options={availableTags.map((tag) => {
                return { label: tag.label, value: tag.id };
              })}
              isMulti
              className="w-full"
              // Ensure the select height matches your inputs
              styles={{
                control: (base) => ({
                  ...base,
                  borderColor: "#bfdbfe",
                  padding: "2px",
                }),
              }}
            />
          </div>
        </div>
      </form>
      {/* card that will carry the new note that is been created */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filterNote.map((note) => (
          <div key={note.id} className="h-full">
            <NoteCard id={note.id} title={note.title} tags={note.tags} />
          </div>
        ))}
      </div>
    </>
  );
};
const NoteCard = ({ id, title, tags }: SimplifiedNote) => {
  return (
    <Link
      to={`/${id}`}
      className="
        group block h-full min-h-[120px] rounded-lg border border-gray-200 
        p-4 md:p-6 
        text-center no-underline text-inherit
        transition-all duration-200
        hover:shadow-lg hover:-translate-y-1 hover:border-blue-300
      "
    >
      <div className="flex h-full flex-col items-center justify-center gap-3">
        {/* Title with Line Clamp to prevent UI breaking */}
        <span
          className="
            font-bold leading-tight text-gray-800
            text-base sm:text-lg
            line-clamp-2 break-words
          "
        >
          {title}
        </span>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap justify-center gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag.id}
                className="
                  inline-block truncate rounded-full
                  bg-blue-100 px-2.5 py-0.5
                  text-[10px] sm:text-xs
                  font-semibold text-blue-700
                "
              >
                {tag.label}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
};
export default NoteList;
