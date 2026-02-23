import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/useUserStore";
import { useMyDeals } from "../../hooks/useAdvert";
import EmailIcon from "@mui/icons-material/Email";
import ScheduleIcon from "@mui/icons-material/Schedule";
import "./MyOffersPageStyle.css";

const formatSlot = (start, end) => {
  if (!start || !end) return "—";
  const s = new Date(start);
  const e = new Date(end);
  return `${s.toLocaleDateString()} ${s.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} – ${e.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
};

const skillNames = (arr) => (Array.isArray(arr) ? arr.map((s) => s?.name).filter(Boolean).join(", ") || "—" : "—");

const MyOffersPage = () => {
  const navigate = useNavigate();
  const { data: user, isLoading: userLoading } = useUser();
  const { data: myDeals = [], isLoading: dealsLoading } = useMyDeals(!!user);

  useEffect(() => {
    if (!userLoading && !user) {
      navigate("/auth");
    }
  }, [user, userLoading, navigate]);

  if (userLoading) {
    return (
      <div className="myoffers-container">
        <div className="myoffers-loading">Loading...</div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="myoffers-container">
      <div className="myoffers-card">
        <h1>My Offers</h1>
        <p className="myoffers-subtitle">
          Offers you sent. When accepted, you can contact the other person by email.
        </p>

        {dealsLoading ? (
          <div className="myoffers-loading">Loading offers...</div>
        ) : myDeals.length === 0 ? (
          <div className="myoffers-empty">You have no offers yet. Create an offer from the Adverts page.</div>
        ) : (
          <ul className="myoffers-list">
            {myDeals.map((item) => (
              <li key={item.deal._id} className="myoffers-item">
                <div className="myoffers-item-header">
                  <span className="myoffers-owner">
                    {[item.owner?.name, item.owner?.lastName].filter(Boolean).join(" ") || "Unknown"}
                  </span>
                  <span className={`myoffers-status myoffers-status--${item.deal.status}`}>
                    {item.deal.status}
                  </span>
                </div>
                <div className="myoffers-item-body">
                  <p>
                    <strong>I want:</strong> {skillNames(item.deal.requestorWanted)}
                  </p>
                  <p>
                    <strong>I offer:</strong> {skillNames(item.deal.requestorOffers)}
                  </p>
                  <p className="myoffers-slot">
                    <ScheduleIcon fontSize="small" />
                    {formatSlot(item.deal.startTime, item.deal.endTime)}
                  </p>
                  {item.deal.status === "accepted" && item.owner?.email && (
                    <p className="myoffers-contact">
                      <EmailIcon fontSize="small" />
                      Contact:{" "}
                      <a href={`mailto:${item.owner.email}`} className="myoffers-email">
                        {item.owner.email}
                      </a>
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MyOffersPage;
