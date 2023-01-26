import React from "react";

const PersonsFilter = ({
  handleFilter,
}: {
  handleFilter: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div>
      filter shown with <input onChange={handleFilter} />
    </div>
  );
};

export default PersonsFilter;
