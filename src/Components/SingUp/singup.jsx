import React from 'react';
import '../Login/login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs';

const defaultState = {
    FirstName: null,
    LastName: null,
    email: null,
    password: null,
    repassword: null,
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


        const hashedPassword = bcrypt.hashSync(state.password, 10);

        console.log(state.email)
        console.log(state.FirstName + "\t" + state.LastName)
        console.log(hashedPassword)
        fetch("https://ttestt.shop/api/auth/sign_up", {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: state.email,
                username: state.FirstName + "\t" + state.LastName,
                password: hashedPassword
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if (data) {
                    navigate("/dashboard")
                }
                else {
                    console.warn(state);
                    setState({
                        ...defaultState,
                    });
                }
            })
            .catch(error => { console.error("Error fetching data:", error); })

    };

    return (
        <div className="App">
            <div className="container-fluid ps-md-0">
                <div className="row g-0">
                    <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
                    <div className="col-md-8 col-lg-6">
                        <div className="login d-flex align-items-center py-3">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-9 col-lg-8 mx-auto">
                                        <h3 className="login-heading mb-4">We are gald to see you!</h3>

                                        <form>

                                            <div className='d-flex'>

                                                <div className="form-floating mb-3 me-2">
                                                    <input
                                                        type="FirstName"
                                                        className='form-control'
                                                        id="floatingInput"
                                                        name="FirstName"
                                                        placeholder="name@example.com"
                                                        value={state.FirstName || ''}
                                                        onChange={handleInputChange}
                                                    />
                                                    <label htmlFor="floatingInput">First Name</label>
                                                </div>

                                                <div className="form-floating mb-3">
                                                    <input
                                                        type="LastName"
                                                        className='form-control'
                                                        id="floatingInput"
                                                        name="LastName"
                                                        placeholder="name@example.com"
                                                        value={state.LastName || ''}
                                                        onChange={handleInputChange}
                                                    />
                                                    <label htmlFor="floatingInput">Last Name</label>
                                                </div>

                                            </div>

                                            <div className="form-floating mb-3 ">
                                                <input
                                                    type="email"
                                                    className={`form-control ${state.emailError ? 'invalid' : ''
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
                                                    className={`form-control ${state.passwordError ? 'invalid' : ''
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

                                            <div className="form-floating mb-3">
                                                <input
                                                    type="repassword"
                                                    className={`form-control ${state.passwordError ? 'invalid' : ''
                                                        }`}
                                                    id="floatingPassword"
                                                    name="repassword"
                                                    placeholder="rePassword"
                                                    value={state.repassword || ''}
                                                    onChange={handleInputChange}
                                                />
                                                <label htmlFor="floatingPassword">Confirm Password</label>
                                                <span className="text-danger">{state.passwordError}</span>
                                            </div>

                                            <div className="d-grid">
                                                <button
                                                    className="btn btn-lg btn-primary btn-login text-uppercase fw-bold mb-2"
                                                    type="button"
                                                    onClick={submit}
                                                >
                                                    Sign Up
                                                </button>
                                                <div className="text-center">
                                                    Already have an account?
                                                    <a className="small" href="/login">
                                                        Login
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
