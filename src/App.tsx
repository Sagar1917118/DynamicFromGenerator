import React from "react";
import JsonEditor from "./Components/JsonEditor.tsx";
import FormPreview from "./Components/FormPreview.tsx";
import { FormSchema } from "./types";
import { useTheme } from "./Components/ThemeContext.tsx";

const App: React.FC = () => {
  const [schema, setSchema] = React.useState<FormSchema | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const { theme, toggleTheme } = useTheme();

  const handleJsonChange = (json: string) => {
    try {
      const parsedSchema: FormSchema = JSON.parse(json);
      setSchema(parsedSchema);
      setError(null);
    } catch (err) {
      setError("Invalid JSON");
    }
  };

  return (
    <div className={`flex flex-col md:flex-row min-h-screen ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
      <button
        className="absolute text-[8px] sm:text-md px-2 py-1  top-4 right-4 sm:px-4 sm:py-2 bg-blue-500 text-white rounded"
        onClick={toggleTheme}
      >
        Toggle {theme === "light" ? "Dark" : "Light"} Mode
      </button>
      <div className="w-full md:w-1/2 p-4">
        <JsonEditor onChange={handleJsonChange} error={error} />
      </div>
      <div className="w-full md:w-1/2 p-4 bg-gray-100 dark:bg-gray-800 dark:text-white dark:border-gray-600">
        <FormPreview schema={schema} />
      </div>
    </div>
  );
};

export default App;
