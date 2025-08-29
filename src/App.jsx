import "./App.css";
import TextEditor from "./components/TextEditor/TextEditor";
import { Toaster } from "sonner";

function App() {
  return (
    <div className="h-screen flex flex-col items-center mt-20 ">
      <TextEditor />

      <Toaster />
    </div>
  );
}

export default App;
