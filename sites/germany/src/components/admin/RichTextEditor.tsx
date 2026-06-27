"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";

interface Props {
  value: string;
  onChange: (html: string) => void;
}

export default function RichTextEditor({ value, onChange }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({ openOnClick: false }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  const btn = (action: () => void, label: string, active?: boolean) => (
    <button
      type="button"
      onClick={action}
      className={`px-2 py-1 rounded text-sm border transition ${
        active ? "bg-gray-800 text-white border-gray-800" : "border-gray-300 hover:border-gray-500"
      }`}
    >
      {label}
    </button>
  );

  if (!editor) return null;

  return (
    <div className="border border-gray-300 rounded-xl overflow-hidden">
      <div className="flex flex-wrap gap-1 p-2 border-b border-gray-200 bg-gray-50">
        {btn(() => editor.chain().focus().toggleBold().run(), "B", editor.isActive("bold"))}
        {btn(() => editor.chain().focus().toggleItalic().run(), "I", editor.isActive("italic"))}
        {btn(() => editor.chain().focus().toggleHeading({ level: 2 }).run(), "H2", editor.isActive("heading", { level: 2 }))}
        {btn(() => editor.chain().focus().toggleHeading({ level: 3 }).run(), "H3", editor.isActive("heading", { level: 3 }))}
        {btn(() => editor.chain().focus().toggleBulletList().run(), "• List", editor.isActive("bulletList"))}
        {btn(() => editor.chain().focus().toggleOrderedList().run(), "1. List", editor.isActive("orderedList"))}
        {btn(() => editor.chain().focus().toggleCodeBlock().run(), "</>", editor.isActive("codeBlock"))}
        {btn(() => {
          const url = window.prompt("URL:");
          if (url) editor.chain().focus().setLink({ href: url }).run();
        }, "Link")}
      </div>
      <EditorContent
        editor={editor}
        className="prose max-w-none p-4 min-h-[300px] focus:outline-none"
      />
    </div>
  );
}
