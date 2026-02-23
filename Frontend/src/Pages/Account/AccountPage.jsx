import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useUser } from "../../hooks/useUserStore";
import { useUpdateUser } from "../../hooks/useUser";
import {
  useSchedule,
  useAddScheduleSlot,
  useDeleteScheduleSlot,
  useUpdateScheduleSlot,
} from "../../hooks/useSchedule";
import ScheduleItem from "./ScheduleItem";
import "./AccountPageStyle.css";

const AccountPage = () => {
  const navigate = useNavigate();
  const { data: user, isLoading: userLoading } = useUser();
  const { mutate: updateUser, isPending: isUpdating } = useUpdateUser();
  const { data: schedule = [], isLoading: scheduleLoading } = useSchedule(!!user);
  const { mutate: addSlot, isPending: isAdding } = useAddScheduleSlot();
  const { mutate: deleteSlot } = useDeleteScheduleSlot();
  const { mutate: updateSlot } = useUpdateScheduleSlot();
  const [profileForm, setProfileForm] = useState({ name: "", lastName: "", aboutMe: "" });
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [timeForm, setTimeForm] = useState({ start: "09:00", end: "10:00" });

  useEffect(() => {
    if (!userLoading && !user) navigate("/auth");
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

  const slotsOnSelectedDate = useMemo(() => {
    return schedule.filter((s) => new Date(s.start).toDateString() === selectedDate.toDateString());
  }, [schedule, selectedDate]);

  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const hasSlot = schedule.some((s) => new Date(s.start).toDateString() === date.toDateString());
      return hasSlot ? "has-slots-indicator" : null;
    }
  };

  const handleAddSlot = (e) => {
    e.preventDefault();
    const toISO = (t) => {
      const [h, m] = t.split(":");
      const d = new Date(selectedDate);
      d.setHours(parseInt(h), parseInt(m), 0, 0);
      return d.toISOString();
    };
    addSlot({ start: toISO(timeForm.start), end: toISO(timeForm.end) });
  };

  if (userLoading) return <div className="loader">Loading...</div>;

  return (
    <div className="account-wrapper">
      <div className="glass-card">
        <header className="account-header">
          <h1>My Account</h1>
          <p>Manage your profile and availability</p>
        </header>

        {/* Top: profile */}
        <section className="profile-section">
          <div className="section-title">
            <span>01</span>
            <h2>Profile</h2>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); updateUser(profileForm); }} className="profile-form">
            <div className="profile-grid">
              <div className="inputs-col">
                <div className="form-group">
                  <label>First name</label>
                  <input 
                    type="text" 
                    value={profileForm.name} 
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })} 
                  />
                </div>
                <div className="form-group">
                  <label>Last name</label>
                  <input 
                    type="text" 
                    value={profileForm.lastName} 
                    onChange={(e) => setProfileForm({ ...profileForm, lastName: e.target.value })} 
                  />
                </div>
              </div>
              <div className="about-col">
                <div className="form-group">
                  <label>About me</label>
                  <textarea 
                    placeholder="Tell us about yourself..."
                    value={profileForm.aboutMe} 
                    onChange={(e) => setProfileForm({ ...profileForm, aboutMe: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <button type="submit" className="btn-primary" disabled={isUpdating}>
              {isUpdating ? "Saving..." : "Save profile"}
            </button>
          </form>
        </section>

        <div className="divider-glow" />

        {/* Bottom: calendar & slots */}
        <section className="schedule-section">
          <div className="section-title">
            <span>02</span>
            <h2>Schedule & availability</h2>
          </div>
          
          <div className="schedule-grid">
            <div className="calendar-box">
              <Calendar 
                onChange={setSelectedDate} 
                value={selectedDate} 
                tileClassName={tileClassName}
                locale="en-US"
              />
            </div>

            <div className="slots-box">
              <h3>Slots for {selectedDate.toLocaleDateString('en-US', { day: 'numeric', month: 'long' })}</h3>
              
              <form onSubmit={handleAddSlot} className="add-slot-row">
                <input type="time" value={timeForm.start} onChange={(e) => setTimeForm({...timeForm, start: e.target.value})} />
                <span className="sep">—</span>
                <input type="time" value={timeForm.end} onChange={(e) => setTimeForm({...timeForm, end: e.target.value})} />
                <button type="submit" className="btn-add" disabled={isAdding}>+</button>
              </form>

              <div className="slots-list">
                {slotsOnSelectedDate.length > 0 ? (
                  slotsOnSelectedDate.map((slot) => (
                    <ScheduleItem
                      key={slot._id}
                      slot={slot}
                      onDelete={(id) => deleteSlot(id)}
                      onUpdate={(payload) => updateSlot(payload)}
                    />
                  ))
                ) : (
                  <div className="empty-state">No slots for this day</div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AccountPage;