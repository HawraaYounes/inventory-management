import React, { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../../config";

const SoldCheckbox = ({ item }) => {
  const [isSold, setIsSold] = useState(item.is_sold);

  const handleToggle = async (e) => {
    const newStatus = e.target.checked;
    setIsSold(newStatus); // optimistic UI

    const token = localStorage.getItem("token");

    try {
      await axios.put(
        `${API_BASE_URL}/api/items/${item.id}/sold`,
        { is_sold: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (err) {
      console.error("Failed to update item status:", err);
      setIsSold(!newStatus); // rollback on error
    }
  };

  return (
    <input
      type="checkbox"
      checked={isSold}
      onChange={handleToggle}
      className="accent-blue-600"
    />
  );
};

export default SoldCheckbox;
