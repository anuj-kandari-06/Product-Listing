import { useState } from "react";
function ProfileEdit (){
    const [profileEdit, setProfileEdit] = useState("");
    return(
        <div className="">
            <h1 className=" text-3xl font-bold text-purple-600">
             <link to="/">ShopMart</link>
            </h1>
        
          <h2 className="text-white font-bold">
            Edit Profile
          </h2>
        </div>
    );
}
export default ProfileEdit;