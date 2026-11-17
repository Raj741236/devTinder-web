import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [age, setAge] = useState(user?.age);
  const [gender, setGender] = useState(user?.gender);
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl);
  const [about, setAbout] = useState(user?.about);
  const [error, setError] = useState("");
  const [toast, setToast] = useState(false);
  const dispatch = useDispatch();

  const handleUpdateProfile = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, gender, age, photoUrl, about },
        { withCredentials: true },
      );
      dispatch(addUser(res.data.data));
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 3000);
    } catch (err) {
      setError(err.response.data.message);
    }
  };
  return (
    <div className="flex justify-center">
      <div className="flex justify-center items-center m-10">
        <div className="card bg-base-300 w-96 shadow-sm">
          <div className="card-body">
            <h2 className="card-title justify-center">Login</h2>
            <div>
              <fieldset className="fieldset">
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
              <fieldset className="fieldset">
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
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Gender</legend>
                <select
                  defaultValue="Gender"
                  className="select"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option disabled={true}>{gender}</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Others</option>
                </select>
              </fieldset>
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
              <button className="btn btn-primary" onClick={handleUpdateProfile}>
                Save Profile
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <UserCard
          user={{ firstName, lastName, gender, age, photoUrl, about }}
        />
      </div>
      {toast && (
        <div className="toast toast-top toast-end">
          <div className="alert alert-success">
            <span>Profile modified successfully.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
