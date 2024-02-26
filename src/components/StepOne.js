import React, { useState } from "react";
import { nhost } from "../lib/nhost";

export default function StepOne({session}) {
    const insertTierMain = `
mutation InsertTierMain($tier_list_name: String, $tier_list_description: String, $tier_list_category: String, $tier_list_visibility: Boolean, $tier_list_link: String, $user_id: uuid!) {
  insert_tier_main(objects: {tier_list_name: $tier_list_name, tier_list_description: $tier_list_description, tier_list_category: $tier_list_category, tier_list_visibility: $tier_list_visibility, tier_list_link: $tier_list_link, user_id: $user_id}) {
    affected_rows
    returning {
      tier_list_id
      tier_list_name
      tier_list_description
      tier_list_category
      tier_list_visibility
      tier_list_link
      user_id
    }
  }
}
`;
const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [visibility, setVisibility] = useState(true);
  const [link, setLink] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const variables = { tier_list_name: name, tier_list_description: description, tier_list_category: category, tier_list_visibility: visibility, tier_list_link: link, user_id: session.user.id };
    const { data, error } = await nhost.graphql.request(insertTierMain, variables);

    if (data) {
      console.log("Tier list created successfully:", data.insert_tier_main.returning);
    } else {
      console.log("Error creating tier list:", error);
    }
  };
  return (
    <div>
      <div className="font-open-sans text-[20px] mt-4">
        Create a new Tier List Template
      </div>

      <form className="font-open-sans text-[14px]" action="" method="POST" onSubmit={handleSubmit}>
        <div className="flex flex-col items-start justify-center mt-4">
          <label
            className="font-open-sans text-black text-opacity-70 text-[12px]"
            htmlFor="Tier List Name"
          >
            Tier List Name
          </label>
          <input
            id="Tier List Name"
            name="Tier List Name"
            type="text"
            required
            className="outline-none bg-black w-[540px] bg-opacity-[6%] h-[40px] rounded-[8px] p-3 mt-2 text-[14px]"
            placeholder="Enter tier list name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-col items-start justify-center mt-4">
          <label
            className="font-open-sans text-black text-opacity-70 text-[12px]"
            htmlFor="Tier List Description"
          >
            Tier List Description
          </label>
          <input
            id="Tier List Description"
            name="Tier List Description"
            type="text"
            required
            className="outline-none bg-black w-[540px] bg-opacity-[6%] h-[84px] rounded-[8px] p-3 mt-2 text-[14px]"
            placeholder="What’s this tier list all about?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="flex flex-col items-start justify-center mt-4">
          <label
            className="font-open-sans text-black text-opacity-70 text-[12px]"
            htmlFor="Category"
          >
            Select a Category
          </label>
          <select
            className="outline-none rounded-[8px] w-[540px] h-[40px] mt-4 bg-black bg-opacity-[6%] px-3"
            name="Category"
            id="Category"
            placeholder="Which category best describes this list?"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Movies">Movies</option>
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
          </select>
        </div>
        <div className="flex flex-col items-start justify-center mt-4">
          <label
            className="font-open-sans text-black text-opacity-70 text-[12px]"
            htmlFor="Visibility"
          >
            Visibility
          </label>
          <select
            className="outline-none rounded-[8px] w-[540px] h-[40px] mt-4 bg-black bg-opacity-[6%] px-3"
            name="Visibility"
            id="Visibility"
            value={visibility}
            onChange={(e) => setVisibility(e.target.value === "Public")}
          >
            <option value="Public">Public</option>
            <option value="Public">Private</option>
          </select>
          <button
            type="submit"
            className="bg-black h-[39px] w-[101px] text-white rounded-[8px] font-open-sans text-[14px] mt-10"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}
