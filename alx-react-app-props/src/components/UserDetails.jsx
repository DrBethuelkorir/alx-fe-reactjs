import { createContext } from "react";
import UserContext from "./UserContext";


function UserDetails() {
    const userData = createContext(UserContext)

  return (
    <div>
      <p>Name: {userData.name}</p>
      <p>Email: {userData.email}</p>
    </div>
  );
}

export default UserDetails;