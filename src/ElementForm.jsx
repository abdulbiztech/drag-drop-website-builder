import React, { useState, useEffect } from "react";

function ElementForm({ element, updateElement }) {
  const [formData, setFormData] = useState(element);

  useEffect(() => {
    setFormData(element);
  }, [element]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateElement(formData);
  };

  return (
    <div className="form-container">
      <h3>Edit {element.content}</h3>
      <form onSubmit={handleSubmit}>
        {element.content === "Text Element" && (
          <div>
            <label>Text: </label>
            <input
              type="text"
              name="text"
              value={formData.text || ""}
              onChange={handleChange}
            />
          </div>
        )}

        {element.content === "Image Element" && (
          <div>
            <label>Image URL: </label>
            <input
              type="text"
              name="src"
              value={formData.src || ""}
              onChange={handleChange}
            />
          </div>
        )}

        {element.content === "Button Element" && (
          <div>
            <label>Button Label: </label>
            <input
              type="text"
              name="label"
              value={formData.label || ""}
              onChange={handleChange}
            />
          </div>
        )}

        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default ElementForm;
