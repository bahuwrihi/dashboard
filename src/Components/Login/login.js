import React from 'react';
import './login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs';

const defaultState = {
  name: null,
  email: null,
  password: null,
  nameError: null,
  emailError: null,
  passwordError: null,
};

function CustomFormValidation() {
  const navigate = useNavigate();

  const [state, setState] = React.useState({
    ...defaultState,
  });

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setState({
      ...state,
      [name]: value,
    });
  };

  const submit = () => {
    // fetch("https://ttestt.shop/api/auth/login", {
    //     method: "POST",
    //     mode: "cors",
    //     cache: "no-cache",
    //     headers: {
    //       "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify({
    //       email: state.email, 
    //     })})
    //   .then(response => response.json())
    //   .then(data => {
    //       if (bcrypt.compareSync(state.password, data)){
    //         navigate("/dashboard")
    //       }
    //       else{
    //         console.log("Соси бибу")
    //       }
    //   })
    //   .catch(error=>{console.error("Error fetching data:", error);}) 


    if(state.email == 1 && state.password ==1){
      navigate("/dashboard")
    }

  };

  return (
    <div className="App">
      <div className="container-fluid ps-md-0">
        <div className="row g-0">
          <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
          <div className="col-md-8 col-lg-6">
            <div className="login d-flex align-items-center py-5">
              <div className="container">
                <div className="row">
                  <div className="col-md-9 col-lg-8 mx-auto">
                    <h3 className="login-heading mb-4">Welcome back!</h3>
                    <form>
                      <div className="form-floating mb-3">
                        <input
                          type="email"
                          className={`form-control ${
                            state.emailError ? 'invalid' : ''
                          }`}
                          id="floatingInput"
                          name="email"
                          placeholder="name@example.com"
                          value={state.email || ''}
                          onChange={handleInputChange}
                        />
                        <label htmlFor="floatingInput">Email address</label>
                        <span className="text-danger">{state.emailError}</span>
                      </div>
                      <div className="form-floating mb-3">
                        <input
                          type="password"
                          className={`form-control ${
                            state.passwordError ? 'invalid' : ''
                          }`}
                          id="floatingPassword"
                          name="password"
                          placeholder="Password"
                          value={state.password || ''}
                          onChange={handleInputChange}
                        />
                        <label htmlFor="floatingPassword">Password</label>
                        <span className="text-danger">{state.passwordError}</span>
                      </div>
                      <div className="form-check mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="rememberPasswordCheck"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="rememberPasswordCheck"
                        >
                          Remember password
                        </label>
                      </div>

                      <div className="d-grid">
                        <button
                          className="btn btn-lg btn-primary btn-login text-uppercase fw-bold mb-2"
                          type="button"
                          onClick={submit}
                        >
                          Sign in
                        </button>
                        <div className="text-center">
                          <a className="small" href="#">
                            Forgot password?
                          </a>
                        </div>

                        <div className="text-center mt-3">
                            Dont have an account?
                            <a className="small" href="/singup">
                                Sign Up
                            </a>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomFormValidation;
