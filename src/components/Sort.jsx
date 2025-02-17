import React from "react";
import { Button } from "@/components/ui/button";

const SortComponent = (props) => {
    const onSortOptionChange = (value) => {
        props.onSortOptionChange(value);
    }

  return (
  

        <div className="relative">
          <select
            onChange={(e) => onSortOptionChange(e.target.value)}
            className="px-4 py-2 rounded-md border bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            defaultValue={props.sortOption}
          >
            <option value="ascending">Sort Ascending</option>
            <option value="descending">Sort Descending</option>
          </select>
        </div>
   
  );
};

export default SortComponent;
