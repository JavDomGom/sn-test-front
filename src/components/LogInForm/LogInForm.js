import React, { useState } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { values, size } from "lodash";
import { toast } from "react-toastify";
import { isEmailValid } from "../../utils/validations";
import { logInApi, setTokenApi } from "../../api/auth";

import "./LogInForm.scss";

export default function LogInForm(props) {
  const { setRefreshCheckLogIn } = props;
  const [formData, setFormData] = useState(initialFormValue());
  const [logInLoading, setLogInLoading] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();

    let validCount = 0;
    values(formData).some((value) => {
      value && validCount++;
      return null;
    });

    if (size(formData) !== validCount) {
      toast.warning("Please complete all the fields on the form.");
    } else {
      if (!isEmailValid(formData.email)) {
        toast.warning("Invalid Email.");
      } else {
        setLogInLoading(true);
        logInApi(formData)
          .then((response) => {
            if (response.message) {
              toast.warning(response.message);
            } else {
              setTokenApi(response.token);
              setRefreshCheckLogIn(true);
            }
          })
          .catch(() => {
            toast.error("Server error, please try again later.");
          })
          .finally(() => {
            setLogInLoading(false);
          });
      }
    }
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="login-form">
      <h2>LogIn</h2>
      <Form onSubmit={onSubmit} onChange={onChange}>
        <Form.Group>
          <Form.Control
            type="email"
            name="email"
            placeholder="Email"
            defaultValue={formData.email}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            defaultValue={formData.password}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          {!logInLoading ? "LogIn" : <Spinner animation="border" />}
        </Button>
      </Form>
    </div>
  );
}

function initialFormValue() {
  return {
    email: "",
    password: "",
  };
}
