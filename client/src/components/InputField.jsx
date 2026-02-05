import React from "react";

const InputField = ({ label, type, name, value, onChange, required }) => {
  return (
    <div className="mb-2">
      <label className="block text-gray-700">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-1 border rounded"
        required={required}
      />
    </div>
  );
};

export default InputField;
