import { useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const TextEditor = () => {
  const [text, setText] = useState("");

  const handleChange = (value) => {
    setText(value);
  };

  // Function to remove HTML tags on preview.
  const stripHTML = (html) => {
    let temp = document.createElement("div");
    temp.innerHTML = html;
    return temp.textContent || temp.innerText || "";
  };

  const plainText = stripHTML(text);
  // Removing the extra spaces (using split(/\s+/)) to extract the exact word count.
  const wordCount =
    plainText.trim() === "" ? 0 : plainText.trim().split(/\s+/).length;
  const charCount = plainText.length;

  const handleUpperCase = () => {
    const newText = text.toUpperCase();
    setText(newText);
  };

  const handleLowerCase = () => {
    const newText = text.toLowerCase();
    setText(newText);
  };

  const handleCopyText = () => {
    // navigator is a built-in browser object.
    // It gives information about the user’s browser, operating system, and capabilities.
    // navigator.clipboard
    // This is a Clipboard API interface.
    // It lets web apps read from and write to the system clipboard (the same clipboard used when you press Ctrl+C / Ctrl+V).
    // .writeText(text)
    // A method of navigator.clipboard.
    // Takes a string (text) as input and copies it into the system clipboard.
    navigator.clipboard.writeText(plainText);
  };

  const handleClearText = () => {
    setText("");
  };

  return (
    <div className="w-full lg:max-w-4xl md:max-w-2xl max-w-full mx-auto px-4">
      <h1 className="text-4xl text-center font-bold my-5">Rich Text Viwer</h1>

      <div>
        <p className="my-3">Paste your text here.</p>
        {/* Using React quill. */}
        <ReactQuill
          theme="snow"
          className="h-40 border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
          placeholder="Type something.."
          value={text}
          onChange={handleChange}
        />
      </div>

      <div className="mt-14 flex gap-3">
        <button
          onClick={() => handleUpperCase()}
          className="bg-blue-500 cursor-pointer duration-150 ease-in-out hover:bg-blue-600 text-white py-1 px-2 rounded "
        >
          Upper case
        </button>
        <button
          onClick={() => handleLowerCase()}
          className="bg-blue-500 cursor-pointer duration-150 ease-in-out hover:bg-blue-600 text-white py-1 px-2 rounded "
        >
          Lower case
        </button>
        <button
          onClick={() => handleCopyText()}
          className="bg-blue-500 cursor-pointer duration-150 ease-in-out hover:bg-blue-600 text-white py-1 px-2 rounded "
        >
          Copy to clipboard
        </button>
        <button
          onClick={() => handleClearText()}
          className="bg-blue-500 cursor-pointer duration-150 ease-in-out hover:bg-blue-600 text-white py-1 px-2 rounded "
        >
          Clear text
        </button>
      </div>

      <div className="text-start mt-6 mb-5 w-[100%] space-y-4 ">
        <span className="font-semibold ">Your text summary.</span>
        <span className="flex gap-2 text-sm text-gray-600">
          <p>
            {wordCount} <b>words</b> & {charCount} <b>characters</b>.
          </p>
          ||
          <p>
            {wordCount * 0.008} <b>minutes</b> to read the whole text.
          </p>
        </span>

        <span className="font-semibold">Your text preview.</span>
        <p
          className="text-justify "
          dangerouslySetInnerHTML={{ __html: text }} // This helps to actually render your formatted text (bold, italic, lists, etc.) inside the preview.
        ></p>
      </div>
    </div>
  );
};

export default TextEditor;
