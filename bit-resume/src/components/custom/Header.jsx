import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { UserButton, useUser } from "@clerk/clerk-react";

function Header() {
  const { user, isSignedIn } = useUser();
  return (
    <div className="p-3  px-5 flex justify-between shadow-md">
      <div className="flex justify-between">
      <img src="/logo.svg" width={50} height={50} />
      <h1 className=" flex gap-10 px-5 text-indigo-700 font-bold text-2xl">AI-RESUME BUILDER </h1>
      </div>
      
      {isSignedIn ? (
        <div className="flex gap-2 items-center ">
          <Link to={"/dashboard"}>
            <Button variant="outline" className="bg-purple-600 hover:bg-purple-800" ><span className="text-white">Dashboard</span></Button>
          </Link>

          <UserButton />
        </div>
      ) : (
        <Link to={"/auth/sign-in"}>
          <Button>SignIn</Button>
        </Link>
      )}
    </div>
  );
}

export default Header;
