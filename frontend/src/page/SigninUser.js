import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

import { FormContainer } from "../UI/CommonStyle.js";
import { LoginConstant } from "../store/constant";
import Input from "../component/Input.js";
import AuthContext from "../store/auth-context";

export default function CreateUser(props) {
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
    <form onSubmit={handleSubmit}>
      <FormContainer>
        <h1 style={{ marginBottom: "30px" }}>
          <a href="/signup">Sign up</a> / <a href="/signin">Log in</a>
        </h1>

        <Input
          label="Email"
          id="email"
          type="email"
          value={data["email"]}
          handleChange={handleChange}
        />
        <Input
          label="Secret"
          id="secret"
          type="password"
          minlength="6"
          value={data["secret"]}
          handleChange={handleChange}
        />
        <input type="submit" value="Submit" />
        <p style={{ margin: "20px" }}>
          Note: You have to log in in order to add a new product!
        </p>
        <Link to="/">Go to Home Page</Link>
      </FormContainer>
    </form>
  );
}
