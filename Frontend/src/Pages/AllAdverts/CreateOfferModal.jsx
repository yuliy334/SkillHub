import React, { useState } from "react";
import { useAdvertById, useCreateDeal } from "../../hooks/useAdvert";
import SkillSelector from "../MyAdverts/SkillSelector";
import CloseIcon from "@mui/icons-material/Close";
import "./CreateOfferModal.css";

const formatDateTime = (dateStr) => {
  const d = new Date(dateStr);
  return d.toLocaleString(undefined, {
    dateStyle: "short",
    timeStyle: "short",
  });
};

const CreateOfferModal = ({ advertId, onClose }) => {
  const { data: advert, isLoading: advertLoading } = useAdvertById(advertId);
  const { mutate: createDeal, isPending, isError, error } = useCreateDeal();

  const [requestorWanted, setRequestorWanted] = useState([]);
  const [requestorOffers, setRequestorOffers] = useState([]);
  const [scheduleSlotId, setScheduleSlotId] = useState("");

  const ownerOffers = advert?.userOffers || [];
  const ownerWants = advert?.userWanted || [];
  const fullSchedule = advert?.userId?.schedule || [];
  const acceptedSlotIds = new Set((advert?.acceptedSlotIds || []).map(String));
  const ownerSchedule = fullSchedule.filter(
    (slot) => !acceptedSlotIds.has(String(slot._id)),
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!requestorWanted.length || !requestorOffers.length || !scheduleSlotId)
      return;
    createDeal(
      {
        advertId,
        dealData: {
          requestorWanted,
          requestorOffers,
          scheduleSlotId,
        },
      },
      {
        onSuccess: () => onClose(),
      },
    );
  };

  const groupedSlots = ownerSchedule.reduce((acc, slot) => {
    const dateKey = new Date(slot.start).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(slot);
    return acc;
  }, {});
  const getTimeRange = (start, end) => {
    const options = { hour: "2-digit", minute: "2-digit", hour12: false };
    const s = new Date(start).toLocaleTimeString("en-US", options);
    const e = new Date(end).toLocaleTimeString("en-US", options);
    return `${s} — ${e}`;
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Create Offer</h2>
          <button type="button" className="modal-close" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>

        {advertLoading ? (
          <p className="modal-loading">Loading...</p>
        ) : !advert ? (
          <p className="modal-error">Advert not found</p>
        ) : (
          <form onSubmit={handleSubmit} className="modal-form">
            {isError && (
              <div className="modal-form-error">
                {error?.response?.data?.message || "Failed to create offer"}
              </div>
            )}

            <div className="modal-section">
              <h3>What I want from them</h3>
              <p className="modal-hint">
                Select from what {advert.userId?.name} offers
              </p>
              <SkillSelector
                skills={ownerOffers}
                selectedIds={requestorWanted}
                onChange={setRequestorWanted}
                placeholder="Select skills you want..."
              />
            </div>

            <div className="modal-section">
              <h3>What I can offer them</h3>
              <p className="modal-hint">
                Select from what {advert.userId?.name} wants
              </p>
              <SkillSelector
                skills={ownerWants}
                selectedIds={requestorOffers}
                onChange={setRequestorOffers}
                placeholder="Select skills you can give..."
              />
            </div>

            <div className="modal-section">
              <h3>Choose time slot</h3>
              <p className="modal-hint">Select when you can meet</p>
              {ownerSchedule.length === 0 ? (
                <p className="modal-no-slots">No available time slots</p>
              ) : (
                <div className="schedule-slots">
                  {ownerSchedule.length === 0 ? (
                    <p className="modal-no-slots">No available time slots</p>
                  ) : (
                    <div className="calendar-wrapper">
                      {Object.entries(groupedSlots).map(([date, slots]) => (
                        <div key={date} className="calendar-day">
                          <div className="calendar-date-badge">{date}</div>
                          <div className="calendar-slots-grid">
                            {slots.map((slot) => (
                              <label
                                key={slot._id}
                                className={`time-slot-card ${scheduleSlotId === slot._id ? "active" : ""}`}
                              >
                                <input
                                  type="radio"
                                  name="scheduleSlot"
                                  value={slot._id}
                                  checked={scheduleSlotId === slot._id}
                                  onChange={(e) =>
                                    setScheduleSlotId(e.target.value)
                                  }
                                />
                                <div className="slot-info">
                                  <span className="label-text">Time:</span>
                                  <span className="time-range">
                                    {getTimeRange(slot.start, slot.end)}
                                  </span>
                                </div>
                              </label>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="modal-actions">
              <button type="button" className="modal-cancel" onClick={onClose}>
                Cancel
              </button>
              <button
                type="submit"
                className="modal-submit"
                disabled={
                  isPending ||
                  !requestorWanted.length ||
                  !requestorOffers.length ||
                  !scheduleSlotId ||
                  ownerSchedule.length === 0
                }
              >
                {isPending ? "Sending..." : "Send Offer"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default CreateOfferModal;
