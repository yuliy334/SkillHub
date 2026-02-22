import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";

const formatDateTime = (dateStr) => {
  const d = new Date(dateStr);
  return d.toLocaleString(undefined, {
    dateStyle: "short",
    timeStyle: "short",
  });
};

const ScheduleItem = ({ slot, onDelete }) => {
  return (
    <div className="schedule-item">
      <div className="schedule-item-info">
        <span>{formatDateTime(slot.start)}</span>
        <span className="schedule-arrow">→</span>
        <span>{formatDateTime(slot.end)}</span>
      </div>
      <button
        type="button"
        className="schedule-delete-btn"
        onClick={() => onDelete(slot._id)}
        title="Delete slot"
      >
        <DeleteIcon fontSize="small" />
      </button>
    </div>
  );
};

export default ScheduleItem;
