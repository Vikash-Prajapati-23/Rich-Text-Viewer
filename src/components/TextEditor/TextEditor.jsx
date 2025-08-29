import { useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { toast } from "sonner";

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
    if (plainText === "") {
      toast.error("Type something first.");
      return;
    }
    const newText = text.toUpperCase(); // Convert to Upper case.
    toast.success("Text has been converted to upper case successfully!");
    setText(newText);
  };

  const handleLowerCase = () => {
    if (plainText === "") {
      toast.error("Type something first.");
      return;
    }
    const newText = text.toLowerCase(); // Convert to Lower case.
    toast.success("Text has been converted to lower case successfully!");
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
    if (plainText === "") {
      toast.error("Type something first.");
      return;
    }
    navigator.clipboard.writeText(plainText);
    toast.success("Text has been copied successfully!");
  };

  const handleClearText = () => {
    if (plainText === "") {
      toast.error("Type something first.");
      return;
    }
    setText("");
    toast.success("Text has been cleared successfully!");
  };

  const convertCamelCase = () => {
    if (plainText === "") {
      toast.error("Type something first.");
      return;
    }
    let newText = text
      .split(" ")
      .map((word) =>
        word.length > 0 ? word[0].toUpperCase() + word.slice(1) : ""
      )
      .join(" ");
    setText(newText);
    toast.success("Text converted to camelCase!");
  };
  // First we split the sentence into a array then iterate each word and convert their first character. Then join them back.

  const convertSnakeCase = () => {
    if (plainText === "") {
      toast.error("Type something first.");
      return;
    }
    setSnakeCase(true);
    let newText = text.split(" ").join("_");
    setText(newText);
  };

  const removeSnakeCase = () => {
    if (plainText === "") {
      toast.error("Type something first.");
      return;
    }
    setSnakeCase(false);
    const newText = text.replace(/_/g, " ");
    setText(newText);
    toast.success("Snake case removed!");
  };

  const [snakecase, setSnakeCase] = useState(false);
  const convertPascalCase = () => {
    if (plainText === "") {
      toast.error("Type something first.");
      return;
    }
    let newText;
    if (snakecase === false) {
      newText = text
        .split(" ")
        .map((word) =>
          word.length > 0 ? word[0].toUpperCase() + word.slice(1) : ""
        )
        .join("");
    } else {
      newText = text
        .split("_")
        .map((word) =>
          word.length > 0 ? word[0].toUpperCase() + word.slice(1) : ""
        )
        .join("");
    }
    setText(newText);
  };

  const handleRandomQuotes = async () => {
    try {
      // Fetching data from API using async & await to generate random quotes.
      const response = await fetch("https://dummyjson.com/quotes/random", {
        method: "GET",
      });
      const data = await response.json();
      const randomQuote = `“${data.quote}” - ${data.author}`;
      setText(randomQuote);
      toast.success("Random quote generated Successfully!");
    } catch (error) {
      toast.error("Failed to generate quote!");
    }
  };

  let readTime = () => {
    let time = 0.008 * plainText.split(/\s+/).length;
    return parseFloat(time.toFixed(2));
  };

  return (
    <div className="w-full lg:max-w-4xl md:max-w-2xl max-w-full mx-auto px-4">
      <h1 className="text-4xl text-center font-bold my-5">Rich Text Viwer</h1>

      <div className="mb-14">
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

      <div className="space-x-2 space-y-2 ">
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
        <button
          onClick={() => convertCamelCase()}
          className="bg-blue-500 cursor-pointer duration-150 ease-in-out hover:bg-blue-600 text-white py-1 px-2 rounded "
        >
          Camel case
        </button>
        <button
          onClick={() => convertSnakeCase()}
          className="bg-blue-500 cursor-pointer duration-150 ease-in-out hover:bg-blue-600 text-white py-1 px-2 rounded "
        >
          Snake case
        </button>
        <button
          onClick={() => removeSnakeCase()}
          className="bg-blue-500 cursor-pointer duration-150 ease-in-out hover:bg-blue-600 text-white py-1 px-2 rounded "
        >
          Remove snake case
        </button>
        <button
          onClick={() => convertPascalCase()}
          className="bg-blue-500 cursor-pointer duration-150 ease-in-out hover:bg-blue-600 text-white py-1 px-2 rounded "
        >
          Pascal case
        </button>
        <button
          onClick={() => handleRandomQuotes()}
          className="bg-purple-500 cursor-pointer duration-150 ease-in-out hover:bg-purple-600 text-white py-1 px-2 rounded "
        >
          Generate random quote
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
            It will take around <b>{readTime()}</b> minuts to read the above
            content.
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
