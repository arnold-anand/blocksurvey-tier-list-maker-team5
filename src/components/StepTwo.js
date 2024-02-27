import React, { useState, useEffect } from "react";
import { nhost } from "../lib/nhost";

const defaultTiers = [
  { name: "S", color: "#FFD700" },
  { name: "A", color: "#00FF00" },
  { name: "B", color: "#0000FF" },
  { name: "C", color: "#FF4500" },
  { name: "D", color: "#800080" },
];

export default function StepTwo({ session, onContinue, onBack, tierListId }) {
  const [tiers, setTiers] = useState([...defaultTiers]);
  const [newTierName, setNewTierName] = useState("");
  const [newTierColor, setNewTierColor] = useState("#000000");
  useEffect(() => {
    // Update the default tiers when tierListId changes (if needed)
    // For now, just updating it on component mount
    setTiers([...defaultTiers]);
  }, [tierListId]);

  const addTier = () => {
    const newTier = {
      name: newTierName,
      color: newTierColor,
    };

    setTiers([...tiers, newTier]);
    setNewTierName("");
    setNewTierColor("#000000");
  };

  const deleteTier = (index) => {
    const updatedTiers = tiers.filter((_, i) => i !== index);
    setTiers(updatedTiers);
  };

// ... (previous code)

const handleContinue = async () => {
    // Prepare data for mutation
    const tierNames = tiers.map((tier) => tier.name);
    const tierColors = tiers.map((tier) => tier.color);
  
    // Make mutation request
    const variables = {
      tier_list_id: tierListId, // Use the received tierListId
      tier_name: tierNames,
      tier_color: tierColors,
      user_id: session.user.id,
    };
  
    const mutation = `
      mutation InsertTierListDetails($tier_list_id: uuid, $tier_name: [String], $tier_color: [String], $user_id: uuid) {
        insert_tier_list_details(objects: {tier_list_id: $tier_list_id, tier_name: $tier_name, tier_color: $tier_color, user_id: $user_id}) {
          affected_rows
          returning {
            tier_list_id
            tier_name
            tier_color
          }
        }
      }
    `;
  
    try {
      const { data, error } = await nhost.graphql.request(mutation, variables);
  
      if (data) {
        console.log(
          "Tier details inserted successfully:",
          data.insert_tier_list_details.returning[0]
        );
  
        // Call onContinue prop to trigger StepThree rendering
        if (typeof onContinue === "function") {
          onContinue();
        }
      } else {
        console.error("Error inserting tier details:", error);
      }
    } catch (error) {
      console.error("GraphQL request error:", error);
    }
  };
  const handleBack = () => {
    if (typeof onBack === "function") {
      onBack();
    }
  };

  return (
    <div className="">
      <div className="font-open-sans text-[20px] mt-4">Setup your Tiers</div>
      <div className="font-open-sans">
        {/* Default Tiers */}
        {tiers.map((tier, index) => (
          <div
            key={index}
            className="flex items-center justify-center space-x-10 my-3"
          >
            <div
              style={{ backgroundColor: tier.color }}
              className="w-[84px] h-[84px] rounded-[8px]"
            ></div>
            <form
              className="flex items-center space-x-10"
              action=""
              method="post"
            >
              <div className="flex flex-col items-start justify-center">
                <label
                  className="font-open-sans text-[12px]"
                  htmlFor={`tierName_${index}`}
                >
                  Tier Name
                </label>
                <input
                  className="border-[1px] border-black border-opacity-[20%] rounded-[8px] bg-opacity-[4%] bg-black outline-none p-2"
                  type="text"
                  name={`tierName_${index}`}
                  id={`tierName_${index}`}
                  value={tier.name}
                  readOnly
                />
              </div>
              <div className="flex flex-col items-start justify-center">
                <label
                  className="font-open-sans text-[12px]"
                  htmlFor={`tierColor_${index}`}
                >
                  Tier Color
                </label>
                <input
                  className="border-[1px] border-black border-opacity-[20%] w-[230px] h-[40px] rounded-[8px] bg-opacity-[4%] bg-black outline-none p-2"
                  type="color"
                  name={`tierColor_${index}`}
                  id={`tierColor_${index}`}
                  value={tier.color}
                  readOnly
                />
              </div>
              <button
                className="text-red-600 mt-4"
                onClick={() => deleteTier(index)}
              >
                {/* Delete Button */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </button>
            </form>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center">
        <button
          className="w-[107px] h-[39px] bg-black rounded-[8px] text-white text-[12px] mt-4"
          onClick={addTier}
        >
          Add a Tier
        </button>
      </div>
      <div className="flex items-start w-full space-x-5">
        <button
          className="w-[72px] h-[39px] border-[1px] border-black rounded-[8px] mt-4"
          onClick={handleBack}
        >
          Back
        </button>
        <button
          className="w-[107px] h-[39px] bg-black rounded-[8px] text-white text-[12px] mt-4"
          onClick={handleContinue}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
