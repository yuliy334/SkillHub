import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/useUserStore";
import { useUpdateUser } from "../../hooks/useUser";
import {
  useSchedule,
  useAddScheduleSlot,
  useDeleteScheduleSlot,
} from "../../hooks/useSchedule";
import DeleteIcon from "@mui/icons-material/Delete";
import "./AccountPageStyle.css";

const formatDateTime = (dateStr) => {
  const d = new Date(dateStr);
  return d.toLocaleString(undefined, {
    dateStyle: "short",
    timeStyle: "short",
  });
};

const AccountPage = () => {
  const navigate = useNavigate();
  const { data: user, isLoading: userLoading } = useUser();
  const {
    mutate: updateUser,
    isPending: isUpdating,
    isError: updateError,
  } = useUpdateUser();
  const {
    data: schedule = [],
    isLoading: scheduleLoading,
  } = useSchedule(!!user);
  const {
    mutate: addSlot,
    isPending: isAdding,
    isError: addSlotError,
    error: addSlotErrorData,
  } = useAddScheduleSlot();
  const { mutate: deleteSlot } = useDeleteScheduleSlot();

  const [profileForm, setProfileForm] = useState({
    name: "",
    lastName: "",
    aboutMe: "",
  });

  const [scheduleForm, setScheduleForm] = useState({
    start: "",
    end: "",
  });

  useEffect(() => {
    if (!userLoading && !user) {
      navigate("/auth");
    }
  }, [user, userLoading, navigate]);

  useEffect(() => {
    if (user) {
      setProfileForm({
        name: user.name || "",
        lastName: user.lastName || "",
        aboutMe: user.aboutMe || "",
      });
    }
  }, [user]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    updateUser(profileForm);
  };

  const handleScheduleChange = (e) => {
    const { name, value } = e.target;
    setScheduleForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSlot = (e) => {
    e.preventDefault();
    if (!scheduleForm.start || !scheduleForm.end) return;
    const startDate = new Date(scheduleForm.start);
    const endDate = new Date(scheduleForm.end);
    if (endDate <= startDate) return;
    addSlot(
      { start: startDate.toISOString(), end: endDate.toISOString() },
      {
        onSuccess: () => setScheduleForm({ start: "", end: "" }),
      }
    );
  };

  const handleDeleteSlot = (id) => {
    deleteSlot(id);
  };

  if (userLoading) {
    return (
      <div className="account-container">
        <div className="account-loading">Loading...</div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="account-container">
      <div className="account-card">
        <h1>My Account</h1>

        <section className="account-section">
          <h2>Profile</h2>
          <form onSubmit={handleProfileSubmit} className="account-form">
            {updateError && (
              <div className="account-error">
                {updateError.response?.data?.message || "Update failed"}
              </div>
            )}
            <div className="input-row">
              <div className="input-group">
                <label>First Name</label>
                <input
                  type="text"
                  name="name"
                  value={profileForm.name}
                  onChange={handleProfileChange}
                  required
                />
              </div>
              <div className="input-group">
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={profileForm.lastName}
                  onChange={handleProfileChange}
                  required
                />
              </div>
            </div>
            <div className="input-group">
              <label>About Me</label>
              <textarea
                name="aboutMe"
                value={profileForm.aboutMe}
                onChange={handleProfileChange}
                placeholder="Tell others about yourself..."
                rows={4}
              />
            </div>
            <div className="input-group readonly">
              <label>Email</label>
              <input type="email" value={user.email || ""} readOnly disabled />
            </div>
            <button
              type="submit"
              className="account-button"
              disabled={isUpdating}
            >
              {isUpdating ? "Saving..." : "Save Profile"}
            </button>
          </form>
        </section>

        <section className="account-section">
          <h2>Schedule</h2>
          <p className="section-desc">Add time slots when you're available</p>

          <form onSubmit={handleAddSlot} className="schedule-form">
            {addSlotError && (
              <div className="account-error">
                {addSlotErrorData?.response?.data?.message ||
                  "Failed to add slot"}
              </div>
            )}
            <div className="schedule-inputs">
              <div className="input-group">
                <label>Start</label>
                <input
                  type="datetime-local"
                  name="start"
                  value={scheduleForm.start}
                  onChange={handleScheduleChange}
                  required
                />
              </div>
              <div className="input-group">
                <label>End</label>
                <input
                  type="datetime-local"
                  name="end"
                  value={scheduleForm.end}
                  onChange={handleScheduleChange}
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="account-button schedule-add-btn"
              disabled={isAdding}
            >
              {isAdding ? "Adding..." : "Add Slot"}
            </button>
          </form>

          <div className="schedule-list">
            {scheduleLoading ? (
              <p className="schedule-empty">Loading schedule...</p>
            ) : schedule.length === 0 ? (
              <p className="schedule-empty">No time slots yet</p>
            ) : (
              schedule.map((slot) => (
                <div key={slot._id} className="schedule-item">
                  <div className="schedule-item-info">
                    <span>{formatDateTime(slot.start)}</span>
                    <span className="schedule-arrow">→</span>
                    <span>{formatDateTime(slot.end)}</span>
                  </div>
                  <button
                    type="button"
                    className="schedule-delete-btn"
                    onClick={() => handleDeleteSlot(slot._id)}
                    title="Delete slot"
                  >
                    <DeleteIcon fontSize="small" />
                  </button>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AccountPage;
