import React, { useState } from "react";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";

const ScheduleItem = ({ slot, onDelete, onUpdate }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [time, setTime] = useState({
    start: new Date(slot.start).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    end: new Date(slot.end).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  });

  const toISO = (iso, t) => {
    const d = new Date(iso);
    const [h, m] = t.split(":");
    d.setHours(parseInt(h, 10), parseInt(m, 10), 0, 0);
    return d.toISOString();
  };

  const handleSave = () => {
    if (!onUpdate) return;
    onUpdate({
      id: slot._id,
      start: toISO(slot.start, time.start),
      end: toISO(slot.end, time.end),
    });
    setIsEdit(false);
  };

  return (
    <div className={`slot-item ${isEdit ? 'edit-mode' : ''}`}>
      {isEdit ? (
        <>
          <input type="time" value={time.start} onChange={(e) => setTime({ ...time, start: e.target.value })} className="slot-time-input" />
          <span className="slot-sep">—</span>
          <input type="time" value={time.end} onChange={(e) => setTime({ ...time, end: e.target.value })} className="slot-time-input" />
          <button type="button" onClick={handleSave} className="slot-btn save" title="Save"><DoneRoundedIcon fontSize="small" /></button>
          <button type="button" onClick={() => setIsEdit(false)} className="slot-btn cancel" title="Cancel">✕</button>
        </>
      ) : (
        <>
          <div className="slot-times">
            <span>{time.start}</span>
            <span className="arrow">→</span>
            <span>{time.end}</span>
          </div>
          <div className="slot-actions">
            <button type="button" onClick={() => setIsEdit(true)} className="slot-btn edit" title="Edit"><EditRoundedIcon fontSize="small" /></button>
            <button type="button" onClick={() => onDelete(slot._id)} className="slot-btn del" title="Delete"><DeleteRoundedIcon fontSize="small" /></button>
          </div>
        </>
      )}
    </div>
  );
};

export default ScheduleItem;