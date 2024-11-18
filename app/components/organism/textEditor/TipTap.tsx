"use client";
import "./tiptap.css";
import { useState, useCallback } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Paragraph from "@tiptap/extension-paragraph";
import ListItem from "@tiptap/extension-list-item";
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
import Heading from "@tiptap/extension-heading";
import { TbH1, TbH2, TbH3 } from "react-icons/tb";
import { Button } from "@/components/ui/button";
import {
  usePostNotificationMutation,
  usePostNotificationToAllUserMutation,
} from "@/app/lib/redux/api/notificationApi";
import { toast } from "sonner";
import { FaList, FaSpinner } from "react-icons/fa6";
import { useGetAllUserQuery } from "@/app/lib/redux/api/userApi";
import { Checkbox } from "@/components/ui/checkbox";
import Select from "react-select";
import { UserType } from "@/app/lib/types";

const TipTap = () => {
  const [linkUrl, setLinkUrl] = useState<string>("");
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false); // Manage dropdown state
  const [selectedUsers, setSelectedUsers] = useState<UserType[]>([]);
  const [sendToAll, setSendToAll] = useState<boolean>(false);
  const [postNotif, { isLoading }] = usePostNotificationToAllUserMutation();
  const [postNotifUser, { isLoading: isLoadingUser }] = usePostNotificationMutation();
  const { data: users, isLoading: userLoad } = useGetAllUserQuery();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Heading.configure({
        levels: [1, 2, 3],
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
      }),
      Paragraph,
      ListItem,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
    ],
    content: "",
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-xl m-5 focus:outline-none",
      },
    },
    injectCSS: false,
  });

  const setLink = useCallback(() => {
    if (linkUrl) {
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

  if (!editor) {
    return null;
  }

  const content = editor.getHTML();
  const userOption = users?.map((user: UserType) => ({
    value: user.id,
    label: user.name,
  }));

  const onSubmit = async () => {
    try {
      if (sendToAll) {
        await postNotif({
          message: content,
        });
      } else {
        const promisess = selectedUsers.map(async (user) => {
          postNotifUser({
            userId: user.value,
            message: content,
          });
        });
        await Promise.all(promisess);
      }
      editor.commands.clearContent(); 
      toast.success("Notifikasi terkirim");
    } catch (error) {
      toast.error("Internal Server Error");
    }
  };

  return (
    <section>
      <div className="flex flex-col gap-4 md:flex-row md:items-center mb-2">
        <label className="flex items-center gap-2 pr-3 border-black border-r-2">
          <Checkbox
            checked={sendToAll}
            onCheckedChange={() => setSendToAll(true)}
          />
          <span>Kirim ke Semua User</span>
        </label>
        <label className="flex items-center gap-2">
          <Checkbox
            checked={!sendToAll}
            onCheckedChange={() => setSendToAll(false)}
          />
          <span>Kirim ke User Tertentu</span>
        </label>
      </div>
      {!sendToAll && (
        <div className="max-w-lg mb-2">
          <Select
            isMulti
            options={userOption}
            value={selectedUsers}
            onChange={(selected) => setSelectedUsers(selected as UserType[])}
            isLoading={userLoad}
            placeholder="Pilih User"
          />
        </div>
      )}
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
                ? "is-active"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            <FaItalic />
          </button>
          {/* heading */}
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={`px-2 py-1 border rounded-md text-sm font-medium transition-all duration-300
            ${editor.isActive("heading", { level: 1 }) ? "is-active" : ""}
            `}
          >
            <TbH1 />
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={`px-2 py-1 border rounded-md text-sm font-medium transition-all duration-300 ${
              editor.isActive("heading", { level: 2 }) ? "is-active" : ""
            }
          `}
          >
            <TbH2 />
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            className={`px-2 py-1 border rounded-md text-sm font-medium transition-all duration-300${
              editor.isActive("heading", { level: 3 }) ? "is-active" : ""
            }
            `}
          >
            <TbH3 />
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
          {/* task */}
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive("bulletList") ? "is-active" : ""}
          >
            <FaList />
          </button>
        </div>
        {/* Editor */}
        <div className="border rounded-md p-2 bg-white shadow-md mb-2">
          <EditorContent
            editor={editor}
            className="prose prose-sm sm:prose lg:prose-xl focus:outline-none"
          />
        </div>
        {/* submit */}
        <div className="">
          <Button onClick={onSubmit} disabled={isLoading || isLoadingUser || editor.isEmpty}>
            {isLoading || isLoadingUser ? (
              <div className="flex items-center justify-center">
                <FaSpinner className="mr-2 animate-spin" />
                <span>Loading...</span>
              </div>
            ) : (
              "Kirim Notifikasi"
            )}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TipTap;
