import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FormSchema } from '../types';

interface FormPreviewProps {
  schema: FormSchema | null;
}

const FormPreview: React.FC<FormPreviewProps> = ({ schema }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit: SubmitHandler<any> = (data) => {
    console.log('Form Submitted:', data);
    alert('Form submitted successfully!');
  };

  if (!schema) {
    return <p className="text-gray-500">Please provide a valid JSON schema.</p>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4  dark:bg-gray-800 dark:text-white dark:border-gray-600">
      <h2 className="text-xl font-bold dark:text-white">{schema.formTitle}</h2>
      <p className="text-gray-600 dark:text-white">{schema.formDescription}</p>
      {schema.fields && schema.fields.map((field) => (
        <div key={field.id} className="space-y-1">
          <label className="block font-medium">
            {field.label}
            {field.required && <span className="text-red-500">*</span>}
          </label>
          {field.type === 'text' || field.type === 'email' || field.type === 'textarea' ? (
            React.createElement(
              field.type === 'textarea' ? 'textarea' : 'input',
              {
                ...register(field.id, {
                  required: field.required && 'This field is required',
                  pattern: field.validation?.pattern
                    ? { value: new RegExp(field.validation.pattern), message: field.validation.message }
                    : undefined,
                }),
                placeholder: field.placeholder,
                className: 'w-full p-2 border border-gray-300 rounded  dark:bg-gray-800 dark:text-white dark:border-gray-600',
              }
            )
          ) : field.type === 'select' ? (
            <select
              {...register(field.id, { required: field.required && 'This field is required' })}
              className="w-full p-2 border border-gray-300 rounded  dark:bg-gray-800 dark:text-white dark:border-gray-600"
            >
              {field.options && field.options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : (
            field.options && field.options?.map((option) => (
              <label key={option.value} className="block  dark:bg-gray-800 dark:text-white dark:border-gray-600">
                <input
                  type="radio"
                  value={option.value}
                  {...register(field.id, { required: field.required && 'This field is required' })}
                />
                {option.label}
              </label>
            ))
          )}
          {/* {errors[field.id] && <p className="text-red-500">{errors[field.id]?.message}</p>} */}
        </div>
      ))}
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded  dark:bg-gray-800 dark:text-white dark:border-gray-600">
        Submit
      </button>
    </form>
  );
};

export default FormPreview;
