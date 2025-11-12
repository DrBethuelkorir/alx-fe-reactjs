import UserContext from "./UserContext";
import { createContext } from "react";

function UserProfile() {
  const props = createContext(UserContext)
    return (
     <div>
       <h2>{props.name}</h2>
       <p>Age: {props.age}</p>
       <p>Bio: {props.bio}</p>
     </div>
   );
}
export default UserProfile;