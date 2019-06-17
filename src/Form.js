import React from "react";
import styled from "styled-components";
import { useInput } from "./useInput";

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  text-align: left;
  max-width: 600px;
  margin: 40px;
`;

const Error = styled.span`
  color: red;
`;

const Form = () => {
  const firstName = useInput({
    initialValue: "Chris",
    isRequired: true,
    label: "First name",
    minChar: 7,
  });
  const lastName = useInput({
    initialValue: "Muller",
    isRequired: true,
    label: "Last name",
    maxChar: 5,
  });
  const email = useInput({
    initialValue: "chris@muller.com",
    isRequired: true,
    isEmail: true,
    label: "Email",
    // validate: value => {
    //   const isEmail = value.includes("@")
    //   if(!isEmail) {
    //     return "Must be a valid email address."
    //   }
    // }
  });
  const postcode = useInput({
    initialValue: "2010",
    isRequired: true,
    label: "Postcode",
    onChange: e => console.log("postcode: ", e.target.value)
  });

  const errors = [
    firstName,
    lastName,
    email,
    postcode
  ].map(x => x.error).filter(err => err);

  const handleSubmit = e => {
    e.preventDefault();

    console.log("errors", errors);

    if (errors.length) return;

    const values = {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      postcode: postcode.value
    };

    console.log("values", values);
  };

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <label>first name</label>
      <input name="firstname" type="text" {...firstName.bind} />
      {firstName.error && <Error>{firstName.error}</Error>}

      <label>last name</label>
      <input name="lastname" type="text" {...lastName.bind} />
      {lastName.error && <Error>{lastName.error}</Error>}

      <label>email</label>
      <input name="email" type="email" {...email.bind} />
      {email.error && <Error>{email.error}</Error>}

      <label>postcode</label>
      <input name="postcode" type="text" {...postcode.bind} />
      {postcode.error && <Error>{postcode.error}</Error>}

      {/* <div>
        {errors.map((err, i) => (
          <span key={err + i}>{err}</span>
        ))}
      </div> */}

      <input
        type="submit"
        disabled={errors.length}
        value="submit"
      />
    </FormWrapper>
  );
};

export default Form;
