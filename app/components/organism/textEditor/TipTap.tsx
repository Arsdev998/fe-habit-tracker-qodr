"use client";
import "./tiptap.css";
import { useState, useCallback } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Paragraph from "@tiptap/extension-paragraph";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import { IoLink } from "react-icons/io5";
import { MdLinkOff } from "react-icons/md";
import { FaBold, FaItalic } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // Import Shadcn Dropdown Menu

const TipTap = () => {
  const [linkUrl, setLinkUrl] = useState<string>("");
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false); // Manage dropdown state

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
      }),
      Paragraph,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
    ],
    content: "<p>Hello World! 🌎️</p>",
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-xl m-5 focus:outline-none",
      },
    },
    injectCSS: false,
  });

  const setLink = useCallback(() => {
    if (linkUrl ) {
      editor
        ?.chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: linkUrl })
        .run();
      setIsDropdownOpen(false); // Close the dropdown after setting the link
      setLinkUrl(""); // Clear the URL input after adding the link
    }
  }, [editor, linkUrl]);

  const endLinkAndContinue = useCallback(() => {
    // Set the link first
    if (linkUrl) {
      editor
        ?.chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: linkUrl })
        .run();
      setLinkUrl(""); // Clear the URL input after adding the link
    }

    // Unset link, ensuring no further text is part of the link
    editor?.chain().focus().unsetLink().run();
  }, [editor, linkUrl]);

  if(!editor){
    return null
  }

  console.log("Current Editor HTML:", editor.getHTML()); // Debug log to check editor content

  return (
    <div className="p-2 border-2 border-black md:w-[600px]">
      {/* Toolbar */}
      <div className="flex space-x-2 mb-4">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-2 py-1 border rounded-md text-sm font-medium transition-all duration-300 ${
            editor.isActive("bold")
              ? "bg-gray-300"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          <FaBold />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-2 py-1 border rounded-md text-sm font-medium transition-all duration-300 ${
            editor.isActive("italic")
              ? "bg-gray-300"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          <FaItalic />
        </button>

        {/* Dropdown Menu for Link */}
        <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
          <DropdownMenuTrigger className="px-2 py-1 border rounded-md text-sm font-medium bg-blue-500 text-white hover:bg-blue-600 transition-all duration-300">
            <IoLink />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Insert Link</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <input
                type="text"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="Enter URL"
                className="p-2 border rounded-md w-full"
                onClick={(e) => e.stopPropagation()} // Prevent dropdown from closing
              />
            </DropdownMenuItem>
            <DropdownMenuItem>
              <button
                onClick={setLink}
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Insert Link
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Unset Link Button */}
        <button
          onClick={endLinkAndContinue}
          className="px-2 py-1 border rounded-md text-sm font-medium bg-red-500 text-white hover:bg-red-600 transition-all duration-300"
        >
          <MdLinkOff />
        </button>
      </div>

      {/* Editor */}
      <div className="border rounded-md p-4 bg-white shadow-md">
        <EditorContent
          editor={editor}
          className="prose prose-sm sm:prose lg:prose-xl focus:outline-none"
        />
      </div>
    </div>
  );
};

export default TipTap;
