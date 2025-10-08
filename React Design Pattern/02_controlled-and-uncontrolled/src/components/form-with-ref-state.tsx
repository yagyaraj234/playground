import React from "react";

const FormWithRefState = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // use currentTarget (the form)
    const name = formData.get("name");
    const email = formData.get("email");

    if (!name) {
      e.target.name.focus();
    }
    console.log(email, name);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Enter name" />
      <input name="email" placeholder="Enter email" />
      <button type="submit">Click me to submit form</button>
    </form>
  );
};

export default FormWithRefState;
