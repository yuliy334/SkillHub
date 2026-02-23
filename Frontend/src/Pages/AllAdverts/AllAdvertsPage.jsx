import React from "react";
import { useAllAdverts } from "../../hooks/useAdvert";
import "./AllAdvertsPageStyle.css";

const AllAdvertsPage = () => {
  const { data: adverts = [], isLoading: advertsLoading } = useAllAdverts();

  return (
    <div className="alladverts-container">
      <div className="alladverts-card">
        <h1>All Adverts</h1>
        <p className="alladverts-subtitle">
          Browse skills others are offering and looking for
        </p>

        <div className="alladverts-list">
          {advertsLoading ? (
            <p className="alladverts-empty">Loading adverts...</p>
          ) : adverts.length === 0 ? (
            <p className="alladverts-empty">No adverts yet</p>
          ) : (
            adverts.map((advert) => (
              <div key={advert._id} className="alladvert-item">
                <div className="alladvert-author">
                  {advert.userId?.name} {advert.userId?.lastName}
                </div>
                <div className="alladvert-skills">
                  <div>
                    <span className="alladvert-label">Offers:</span>{" "}
                    {advert.userOffers?.map((s) => s?.name).join(", ") || "—"}
                  </div>
                  <div>
                    <span className="alladvert-label">Wants:</span>{" "}
                    {advert.userWanted?.map((s) => s?.name).join(", ") || "—"}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AllAdvertsPage;
