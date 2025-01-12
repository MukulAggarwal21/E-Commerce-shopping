import React, { useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import Axios from "axios";

const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #1e3c72, #2a5298);
  overflow: hidden;
  position: relative;
`;

const FormContainer = styled(motion.form)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 50px;
  border-radius: 15px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  width: 100%;
  z-index: 1;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 20px;
  color: #fff;
  font-weight: 700;
`;

const InputField = styled.div`
  margin-bottom: 20px;
  position: relative;

  label {
    position: absolute;
    top: 50%;
    left: 15px;
    transform: translateY(-50%);
    color: #ccc;
    font-size: 14px;
    pointer-events: none;
    transition: all 0.3s ease;
  }

  input {
    width: 100%;
    padding: 15px;
    border: 2px solid transparent;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.2);
    color: #fff;
    font-size: 16px;
    outline: none;
    transition: all 0.3s ease;

    &:focus {
      border-color: #2a5298;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }

    &:focus + label,
    &:not(:placeholder-shown) + label {
      top: -10px;
      left: 10px;
      font-size: 12px;
      color: #2a5298;
    }
  }
`;

const SubmitButton = styled(motion.button)`
  width: 100%;
  padding: 15px;
  background: linear-gradient(135deg, #2a5298, #1e3c72);
  border: none;
  border-radius: 10px;
  color: white;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s ease-in;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: scale(1);
  }
`;

const SuccessMessage = styled.div`
  color: #28a745;
  text-align: center;
  margin-top: 20px;
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  text-align: center;
  margin-top: 20px;
`;

export default function CreateUser() {
  const [data, setData] = useState({ fname: "", lname: "", email: "", secret: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError("");

    try {
      const url = "/api/signup";
      const response = await Axios.post(url, data);
      if (response.data === "OK") {
        setSuccess(true);
        setData({ fname: "", lname: "", email: "", secret: "" });
      } else {
        setError("Email has already been signed up! Please retry.");
      }
    } catch (error) {
      setError("Something went wrong! Please try again.");
      console.error(error);
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <FormWrapper>
      <FormContainer
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit}
      >
        <Title>Create Your Account</Title>
        <InputField>
          <input
            type="text"
            name="fname"
            value={data.fname}
            onChange={handleChange}
            placeholder=" "
          />
          <label>First Name</label>
        </InputField>
        <InputField>
          <input
            type="text"
            name="lname"
            value={data.lname}
            onChange={handleChange}
            placeholder=" "
          />
          <label>Last Name</label>
        </InputField>
        <InputField>
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            placeholder=" "
          />
          <label>Email</label>
        </InputField>
        <InputField>
          <input
            type="password"
            name="secret"
            value={data.secret}
            onChange={handleChange}
            placeholder=" "
          />
          <label>Secret</label>
        </InputField>
        <SubmitButton
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {loading ? "Loading..." : "Submit"}
        </SubmitButton>
        {success && <SuccessMessage>User created successfully!</SuccessMessage>}
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </FormContainer>
    </FormWrapper>
  );
}
