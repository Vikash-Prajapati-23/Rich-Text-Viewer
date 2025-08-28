import { useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";


const TextEditor = () => {
  const [text, setText] = useState("");

  const handleChange = (value) => {
    setText(value);
  };

  return (
    <div className="w-full lg:max-w-4xl md:max-w-2xl max-w-full mx-auto px-4">
      <h1 className="text-4xl text-center font-bold my-5">Rich Text Viwer</h1>

      <div>
        <p className="my-3">Paste your text here.</p>
        <ReactQuill
          theme="snow"
          className="h-40 border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded w-full"
          placeholder="Type something.."
          value={text}
          onChange={handleChange}
        />
      </div>

      <div className="text-start mt-14 mb-5">
        <span className="font-semibold ">Your text summary.</span>
        <p> {`${text.length} words & ${text.length} characters.`} </p>

        <span className="font-semibold ">Your text preview.</span>
        <p> {text} </p>
      </div>
    </div>
  );
};

export default TextEditor;
