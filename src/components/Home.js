import React, { useState } from "react";
import { Link } from "react-router-dom";
import { nhost } from "../lib/nhost";

export default function Home() {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };
  return (
    <div>
      {/* Top bar */}
      <div className="flex items-center justify-between p-6">
        <div className="font-abril-fatface text-3xl">Tieron</div>
        <div>
          <div className="flex items-center justify-center space-x-3">
            <Link to="/new">
              <button className="bg-black h-[39px] w-[139px] text-white rounded-[8px] font-open-sans text-[14px]">
                Create Tieron
              </button>
            </Link>
            <button
              onClick={toggleDropdown}
              className="bg-white p-[3px] rounded-full"
            >
              <img
                className="w-[38px] h-[38px] rounded-full"
                src="profile.png"
                alt=""
              />
              {dropdownVisible && (
                <div className="absolute mt-2 right-3 w-52 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div
                    className="py-1"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => nhost.auth.signOut()}
                      className="text-center w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-full h-full">
        <div className="text-[72px] mt-20">
          <span className="font-montserrat">Welcome to </span>
          <span className="font-abril-fatface">Tieron!</span>
        </div>
        <div className="text-[18px] text-black text-opacity-50 font-open-sans font-normal">
          Rank, Share, Discover - Where Your Opinions Take Center Stage
        </div>
        <Link to="/new">
          <button className="bg-black h-[42px] w-[152px] text-white rounded-[8px] font-open-sans text-[14px] my-10">
            Create Tieron
          </button>
        </Link>
      </div>
    </div>
  );
}
