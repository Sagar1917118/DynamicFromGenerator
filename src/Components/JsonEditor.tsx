import React, { useState } from "react";

interface JsonEditorProps {
  onChange: (json: string) => void;
  error: string | null;
}

const JsonEditor: React.FC<JsonEditorProps> = ({ onChange, error }) => {
  const [value, setValue] = useState<string>("{}");

  const predefinedJson = `{
    "formTitle": "Project Requirements Survey",
    "formDescription": "Please fill out this survey about your project needs",
    "fields": [
      {
        "id": "name",
        "type": "text",
        "label": "Full Name",
        "required": true,
        "placeholder": "Enter your full name"
      },
      {
        "id": "email",
        "type": "email",
        "label": "Email Address",
        "required": true,
        "placeholder": "you@example.com",
        "validation": {
          "pattern": "^[^\\\\s@]+@[^\\\\s@]+\\\\.[^\\\\s@]+$",
          "message": "Please enter a valid email address"
        }
      },
      {
        "id": "companySize",
        "type": "select",
        "label": "Company Size",
        "required": true,
        "options": [
          { "value": "1-50", "label": "1-50 employees" },
          { "value": "51-200", "label": "51-200 employees" },
          { "value": "201-1000", "label": "201-1000 employees" },
          { "value": "1000+", "label": "1000+ employees" }
        ]
      },
      {
        "id": "industry",
        "type": "radio",
        "label": "Industry",
        "required": true,
        "options": [
          { "value": "tech", "label": "Technology" },
          { "value": "healthcare", "label": "Healthcare" },
          { "value": "finance", "label": "Finance" },
          { "value": "retail", "label": "Retail" },
          { "value": "other", "label": "Other" }
        ]
      },
      {
        "id": "timeline",
        "type": "select",
        "label": "Project Timeline",
        "required": true,
        "options": [
          { "value": "immediate", "label": "Immediate (within 1 month)" },
          { "value": "short", "label": "Short-term (1-3 months)" },
          { "value": "medium", "label": "Medium-term (3-6 months)" },
          { "value": "long", "label": "Long-term (6+ months)" }
        ]
      },
      {
        "id": "comments",
        "type": "textarea",
        "label": "Additional Comments",
        "required": false,
        "placeholder": "Any other details you'd like to share..."
      }
    ]
  }`;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onChange(newValue);
  };

  const handleLoadDefault = () => {
    setValue(predefinedJson);
    onChange(predefinedJson);
  };

  return (
    <div className="dark:text-white">
      <h2 className="text-lg font-bold mb-2">JSON Editor</h2>
      <button
        onClick={handleLoadDefault}
        className="mb-2 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Load Default JSON
      </button>
      <textarea
        value={value}
        onChange={handleChange}
        className="w-full h-80 p-2 border border-gray-300 rounded bg-white dark:bg-gray-800 dark:text-white dark:border-gray-600"
      />
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default JsonEditor;
