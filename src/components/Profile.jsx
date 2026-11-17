import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";

const Profile = () => {
  const userData = useSelector((store) => store.userSlice);
  return (
    userData && (
      <div>
        <EditProfile user={userData} />
      </div>
    )
  );
};

export default Profile;
