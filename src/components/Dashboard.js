import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { nhost } from "../lib/nhost";

const GetTierMain = `
query GetTierMain {
  tier_main {
    tier_list_visibility
    created_at
    tier_list_category
    tier_list_description
    tier_list_link
    tier_list_name
    tier_list_id
    user_id
    bucket_id
    thumbnail_file_id
  }
}
`;
export default function Dashboard() {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [tierMain, setTierMain] = useState([]);

  useEffect(() => {
    async function fetchTierMain() {
      try {
        const { data, error } = await nhost.graphql.request(GetTierMain);
        if (error) {
          console.error(error);
        } else {
          setTierMain(data.tier_main || []);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchTierMain();
  }, []);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };
  return (
    <div>
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
        <table className="w-full">
          <th className="font-montserrat text-[12px] w-full flex items-center justify-between">
            <td>TITLE</td>
            <td>CATEGORIES</td>
            <td>Created at</td>
            <td>Actions</td>
          </th>
          {tierMain.map((item) => (
            <tr className="font-open-sans text-[14px] flex items-center justify-between">
              <td className="">{item.tier_list_name}</td>
              <td className="-ml-32">{item.tier_list_category}</td>
              <td className="-mr-24">
                {new Date(item.created_at).toLocaleDateString()}
              </td>
              <td className="flex space-x-3">
                <button className="bg-black bg-opacity-[8%] rounded-[8px] p-2">
                  Edit
                </button>
                <button className="bg-black bg-opacity-[8%] rounded-[8px] p-2">
                  Delete
                </button>
                <button className="bg-black bg-opacity-[8%] rounded-[8px] p-2">
                  View
                </button>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}
