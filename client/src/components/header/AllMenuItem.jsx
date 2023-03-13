import React from "react";

const AllMenuItem = ({item}) => {
  return (
    <div className="all_menu_item hover1">
      <img src={`/left/${item.icon}.png`} alt={item.icon} />
      <div className="all_menu_col">
        <span>{item.name}</span>
        <span>{item.description}</span>
      </div>
    </div>
  );
};

export default AllMenuItem;
