import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Select Gender");
  const [photoUrl, setPhotoUrl] = useState("");
  const [about, setAbout] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          age,
          gender,
          photoUrl,
          about,
          emailId,
          password,
        },
        { withCredentials: true },
      );
      return navigate("/login");
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center m-10">
        <div className="card bg-base-300 w-96 shadow-sm">
          <div className="card-body">
            <h2 className="card-title justify-center">Create Account</h2>
            <p>
              Already have an account ?{" "}
              <Link to="/login" className="text-blue-500">
                Login
              </Link>
            </p>
            <div>
              <div className="flex justify-between ">
                <fieldset className="fieldset mx-2">
                  <label className="label" htmlFor="email">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="input"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <label className="label" htmlFor="lastName">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="input"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </fieldset>
              </div>
              <div className="flex justify-between">
                <fieldset className="fieldset flex-1 mx-2">
                  <label className="label" htmlFor="age">
                    Age
                  </label>
                  <input
                    type="text"
                    id="age"
                    className="input"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset flex-1">
                  <label className="label">Gender</label>
                  <select
                    defaultValue="Gender"
                    className="select"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option disabled={true}>{"Select Gender"}</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Others</option>
                  </select>
                </fieldset>
              </div>
              <fieldset className="fieldset">
                <label className="label" htmlFor="photo">
                  photoUrl
                </label>
                <input
                  type="text"
                  id="age"
                  className="input"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset">
                <label className="label" htmlFor="photo">
                  Email
                </label>
                <input
                  type="text"
                  id="age"
                  className="input"
                  value={emailId}
                  onChange={(e) => setEmailId(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset">
                <label className="label" htmlFor="photo">
                  Password
                </label>
                <input
                  type="text"
                  id="password"
                  className="input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">About</legend>
                <textarea
                  className="textarea h-24"
                  placeholder=""
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                ></textarea>
              </fieldset>
            </div>
            <p className="text-red-500">{error}</p>
            <div className="card-actions justify-center">
              <button className="btn btn-primary" onClick={handleSignUp}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
