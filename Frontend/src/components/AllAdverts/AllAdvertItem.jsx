import React from "react";
import "./AllAdvertItem.css";

const AllAdvertItem = ({ advert, canCreateOffer, onCreateOffer }) => {
  return (
    <div className="alladvert-item">
      <div className="alladvert-main">
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
      {canCreateOffer && (
        <button
          type="button"
          className="alladvert-offer-btn"
          onClick={() => onCreateOffer(advert._id)}
        >
          Create offer
        </button>
      )}
    </div>
  );
};

export default AllAdvertItem;

