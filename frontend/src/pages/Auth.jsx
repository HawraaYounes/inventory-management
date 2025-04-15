import React, { useState, useEffect } from "react";
import { useActionData } from "react-router-dom";
import { ALERT_TYPES } from "../constants";
import AuthForm from "../components/AuthForm";
import { json, redirect } from "react-router-dom";
import Alert from "../components/Alert";
import axios from "axios";
import { API_BASE_URL } from "../config";

const Auth = () => {
  const [flashMessage, setFlashMessage] = useState({
    message: "",
    description: "",
    type: "",
  });

  const actionData = useActionData();

  useEffect(() => {
    if (actionData?.message) {
      setFlashMessage({
        message: actionData.message,
        description: actionData.description,
        type: ALERT_TYPES.ERROR,
      });
    }
  }, [actionData]);

  return (
    <div className="items-center">
       {flashMessage.message && (
        <Alert
          type={flashMessage.type}
          message={flashMessage.message}
          description={flashMessage.description}
        />
      )}
      <AuthForm setFlashMessage={setFlashMessage} />
    </div>
  );
};

export default Auth;

export async function action({ request }) {
  const data = await request.formData();
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "signup";

  if (mode !== "login" && mode !== "signup") {
    return json({ message: "Invalid mode!" }, { status: 422 });
  }

  const authData = {
    email: data.get("email"),
    password: data.get("password"),
  };

  if (mode === "signup") {
    authData.name = data.get("name");
    authData.password_confirmation = data.get("confirmPassword");

    if (authData.password !== authData.password_confirmation) {
      return json(
        {
          message: "Oops!",
          type: ALERT_TYPES.WARNING,
          description: "Passwords do not match.",
        },
        { status: 422 }
      );
    }
  }

  try {
    const response = await axios.post(`${API_BASE_URL}/api/${mode}`, authData, {
      headers: {
        "Content-Type": "application/json",
      },
     withCredentials:true
    });
    console.log("RESPONSE VALUE",response);
    localStorage.setItem("token", response.data.token);

    return redirect("/product-types");
  } catch (error) {
    console.log("ERROR",error)
    const errorMessage =
      error.response?.data?.message ||
      (error.response?.data?.errors
        ? Object.values(error.response.data.errors).join(" ")
        : "An unexpected error occurred!");

    return json(
      {
        message: "Oops!",
        description: errorMessage,
        type: ALERT_TYPES.WARNING,
      },
      { status: 400 }
    );
  }
}
