import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import styled from "styled-components";
import { motion } from "framer-motion";

import { LoginConstant } from "../store/constant";
import Input from "../component/Input.js";
import AuthContext from "../store/auth-context";

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

export default function SigninUser(props) {
  const [data, setData] = useState(LoginConstant);
  const auth = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!data.email || !data.secret) {
      alert("Please enter both email and secret.");
      return;
    }
  
    try {
      const url = "/api/signin";
      const response = await Axios.post(url, {
        email: data.email,
        secret: data.secret,
      });
  
      if (response.data === "NO") {
        alert("Authentication Failed! Something went wrong, please check again!");
        window.location.reload();
      } else {
        alert("You have passed authentication and signed in successfully!");
        auth.login(response.data.accessToken, 500, response.data.id);  
        window.location = "/";  // Redirect to home
        setData(LoginConstant);  
      }
    } catch (e) {
      console.error("Error during authentication:", e);
      alert("Something went wrong, please check the console for details.");
    }
  };
  
  const handleChange = (e) => {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
  };

  return (
    <FormWrapper>
      <FormContainer
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit}
      >
        <Title>Sign In</Title>
        <InputField>
          <input
            type="email"
            id="email"
            value={data["email"]}
            onChange={handleChange}
            placeholder=" "
          />
          <label>Email</label>
        </InputField>
        <InputField>
          <input
            type="password"
            id="secret"
            value={data["secret"]}
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
          Submit
        </SubmitButton>
        <p style={{ margin: "20px", color: "#fff" }}>
          Note: You have to log in in order to add a new product!
        </p>
        <Link to="/" style={{ color: "#fff", textDecoration: "underline" }}>Go to Home Page</Link>
      </FormContainer>
    </FormWrapper>
  );
}
