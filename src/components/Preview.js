import React, { useState } from "react";
import { Link } from "react-router-dom";
import { nhost } from "../lib/nhost";

export default function Preview() {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };
  return (
    <div className="h-max bg-[#F8F7F4]">
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
      <div className="px-[165px]">
        {/* Tier_main table */}
        <div className="flex items-center justify-between">
          <div className="flex item-center space-x-3">
            {/* Thumbnail goes here */}
            <div className="bg-black bg-opacity-[10%] w-[160px] h-[160px] rounded-[8px]"></div>
            <div className="flex flex-col space-y-4 text-left">
              <div className="font-montserrat text-[20px]">
                Best Movies of the 21st Century{" "}
              </div>
              {/* Description goes here */}
              <div className="font-open-sans text-[16px] w-[640px]">
                Explore the pinnacle of cinematic brilliance with our curated
                tier list of the 21st century's most impactful and unforgettable
                films.
              </div>
              {/* Category */}
              <div className="font-open-sans text-[16px]">Category: Movies</div>
            </div>
          </div>
          <div className="flex flex-col">
            <button className="border-[1px] border-black w-[71px] h-[35px] rounded-[8px]">
              Edit
            </button>
            <button className="border-[1px] border-black w-[71px] h-[35px] rounded-[8px] mt-[8px]">
              Share
            </button>
          </div>
        </div>
        <div className="w-full h-[1px] bg-black bg-opacity-[10%] my-[16px]"></div>
        {/* Tiers */}
        <div className="flex flex-col items-center space-y-[8px]">
          <div
            className="w-full h-[84px] bg-black bg-opacity-[6%] 
          rounded-[8px] flex items-center justify-start p-[10px]"
          >
            <div className="w-[64px] h-[64px] bg-black bg-opacity-[10%] text-black font-open-sans text-[24px] rounded-[8px] py-3">
              S
            </div>
            {/* for images */}
            <div></div>
          </div>
          <div
            className="w-full h-[84px] bg-black bg-opacity-[6%] 
          rounded-[8px] flex items-center justify-start p-[10px]"
          >
            <div className="w-[64px] h-[64px] bg-black bg-opacity-[10%] text-black font-open-sans text-[24px] rounded-[8px] py-3">
              A
            </div>
            {/* for images */}
            <div></div>
          </div>
          <div
            className="w-full h-[84px] bg-black bg-opacity-[6%] 
          rounded-[8px] flex items-center justify-start p-[10px]"
          >
            <div className="w-[64px] h-[64px] bg-black bg-opacity-[10%] text-black font-open-sans text-[24px] rounded-[8px] py-3">
              B
            </div>
            {/* for images */}
            <div></div>
          </div>
          <div
            className="w-full h-[84px] bg-black bg-opacity-[6%] 
          rounded-[8px] flex items-center justify-start p-[10px]"
          >
            <div className="w-[64px] h-[64px] bg-black bg-opacity-[10%] text-black font-open-sans text-[24px] rounded-[8px] py-3">
              C
            </div>
            {/* for images */}
            <div></div>
          </div>
          <div
            className="w-full h-[84px] bg-black bg-opacity-[6%] 
          rounded-[8px] flex items-center justify-start p-[10px]"
          >
            <div className="w-[64px] h-[64px] bg-black bg-opacity-[10%] text-black font-open-sans text-[24px] rounded-[8px] py-3">
              D
            </div>
            {/* for images */}
            <div></div>
          </div>
        </div>

        {/* Image Gallery */}

        <div className="font-open-sans text-[18px] text-left my-[16px]">
          Image Gallery
        </div>

        <div className="h-[165px] w-full bg-black bg-opacity-[6%] rounded-[8px] p-[10px]">
          <div className="w-[65px] h-[65px] bg-black bg-opacity-[10%] rounded-[8px]">

            {/* Render all the images here */}
          </div>
        </div>
      </div>
    </div>
  );
}
