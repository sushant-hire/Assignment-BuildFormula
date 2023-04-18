import React, { useState } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 90%;
  max-width: 600px;
  margin: 0 auto;
  padding: 35px;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  margin-top: 4rem;
  margin-bottom: 8rem;

  font-family: "Poppins", sans-serif;
  @media screen and (min-width: 768px) {
    width: 70%;
  }
`;

const Title = styled.h1`
  font-size: 32px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  display: block;
  width: 100%;
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Label = styled.label`
  display: block;
  font-size: 18px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  background-color: #0069d9;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 18px;
  cursor: pointer;
  &:hover {
    background-color: #f44336;
  }
`;

const ErrorMessage = styled.div`
  color: #f44336;
  font-size: 14px;
  margin-bottom: 10px;
`;

function Contact() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    let validationErrors = {};
    const nameRegex = /^[a-zA-Z]*$/;
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const numberRegex = /^\d{10}$/;

    if (!firstName) {
      validationErrors.firstName = "First name is required";
    } else if (!nameRegex.test(firstName)) {
      validationErrors.firstName = "First name is invalid";
    }

    if (!lastName) {
      validationErrors.lastName = "Last name is required";
    } else if (!nameRegex.test(lastName)) {
      validationErrors.lastName = "Last name is invalid";
    }

    if (!email) {
      validationErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      validationErrors.email = "Email is invalid";
    }

    if (!number) {
      validationErrors.number = "Number is required";
    } else if (!numberRegex.test(number)) {
      validationErrors.number = "Number is invalid";
    }

    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    const userData = {
      firstName,
      lastName,
      email,
      number,
    };
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    users.push(userData);
    localStorage.setItem("users", JSON.stringify(users));

    setFirstName("");
    setLastName("");
    setEmail("");
    setNumber("");
    setErrors({});
    Swal.fire({
      title: "Success!",
      text: "Form submitted successfully",
      icon: "success",
      confirmButtonText: "Ok",
    }).then(() => {
      navigate("/");
    });
  };

  return (
    <Container>
      <Title>Contact Us</Title>
      <form onSubmit={handleSubmit}>
        <Label htmlFor="firstName">First Name</Label>
        <Input
          id="firstName"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        {errors.firstName && <ErrorMessage>{errors.firstName}</ErrorMessage>}

        <Label htmlFor="lastName">Last Name</Label>
        <Input
          id="lastName"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        {errors.lastName && <ErrorMessage>{errors.lastName}</ErrorMessage>}

        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}

        <Label htmlFor="number">Number</Label>
        <Input
          id="number"
          type="number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
        {errors.number && <ErrorMessage>{errors.number}</ErrorMessage>}

        <Button type="submit">Submit</Button>
      </form>
    </Container>
  );
}

export default Contact;
