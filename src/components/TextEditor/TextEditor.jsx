import React, { useState } from "react";

const TextEditor = () => {
  const [text, setText] = useState("");

  const handleChange = (event) => {
    setText(event.target.value)
  }

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center ">
      <h1 className="text-4xl font-bold ">Rich Text Viwer</h1>

      <div>
        <p>Paste your text here.!</p>
        <textarea
          className="border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded py-1 px-2"
          placeholder="Type something."
          value={text}
          onChange={handleChange}
          cols="140"
          rows="7"
          id=""
        ></textarea>

        <p> {text} </p>
      </div>
    </div>
  );
};

export default TextEditor;
