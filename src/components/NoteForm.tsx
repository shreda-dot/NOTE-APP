import React from "react";
import CreatableSelect from "react-select/creatable";
import { Link } from "react-router-dom";
import type { NoteData } from "../App";
import type { Tag } from "../App";
import { useNavigate } from "react-router-dom";

type NoteFormProps = {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
} & Partial<NoteData>;
const NoteForm = ({
  onSubmit,
  onAddTag,
  availableTags,
  title = "",
  body = "",
  tags = [],
}: NoteFormProps) => {
  const titleRef = React.useRef<HTMLInputElement>(null);
  const bodyRef = React.useRef<HTMLTextAreaElement>(null);
  const [Selectedtags, setSelectedTags] = React.useState<Tag[]>(tags);
  const Navigate = useNavigate();
  const handlesubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title: titleRef.current!.value || "",
      body: bodyRef.current!.value || "",
      tags: Selectedtags,
    });
    Navigate("..");
  };

  return (
    <form className="mt-10 flex flex-col gap-6" onSubmit={handlesubmit}>
      {/* Top Row: Title and Tags */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="form-group w-full">
          <label
            htmlFor="title"
            className="mb-2 block text-sm font-bold text-gray-700"
          >
            TITLE
          </label>
          <input
            id="title"
            ref={titleRef}
            required
            type="text"
            className="rounded border border-blue-300 p-2 w-full outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter note title"
            defaultValue={title}
          />
        </div>

        <div className="form-group w-full">
          <label
            htmlFor="tags"
            className="mb-2 block text-sm font-bold text-gray-700"
          >
            TAGS
          </label>
          <CreatableSelect
            id="tags"
            onCreateOption={(label) => {
              const newTag = { id: crypto.randomUUID(), label };
              onAddTag(newTag);
              setSelectedTags((prev) => [...prev, newTag]);
            }}
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

      {/* Bottom Row: Body (Full Width) */}
      <div className="form-group w-full">
        <label
          htmlFor="body"
          className="mb-2 block text-sm font-bold text-gray-700"
        >
          BODY
        </label>
        <textarea
          id="body"
          required
          ref={bodyRef}
          className="rounded border border-blue-300 p-2 w-full outline-none focus:ring-2 focus:ring-blue-400 min-h-[300px]"
          placeholder="Start typing your note..."
          rows={15}
          defaultValue={body}
        />
      </div>

      {/* Optional: Form Actions */}
      <div className="flex justify-end gap-2">
        <button
          type="submit"
          className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Save Note
        </button>
        <Link to="..">
          <button
            type="button"
            className="border cursor-pointer border-gray-300 px-4 py-2 rounded hover:bg-gray-50"
          >
            Cancel
          </button>
        </Link>
      </div>
    </form>
  );
};

export default NoteForm;
