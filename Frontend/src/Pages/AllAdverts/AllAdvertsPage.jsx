import React, { useMemo, useState } from "react";
import { useAllAdverts } from "../../hooks/useAdvert";
import { useSkills } from "../../hooks/useSkills";
import { useUser } from "../../hooks/useUserStore";
import SkillSelector from "../MyAdverts/SkillSelector";
import CreateOfferModal from "./CreateOfferModal";
import AllAdvertItem from "../../components/AllAdverts/AllAdvertItem";
import "./AllAdvertsPageStyle.css";

const AllAdvertsPage = () => {
  const { data: user } = useUser();
  const { data: adverts = [], isLoading: advertsLoading } = useAllAdverts();
  const { data: skills = [], isLoading: skillsLoading } = useSkills();
  const [filterWantIds, setFilterWantIds] = useState([]);
  const [filterOfferIds, setFilterOfferIds] = useState([]);

  const filteredAdverts = useMemo(() => {
    return adverts.filter((advert) => {
      const advertOfferIds = advert.userOffers?.map((s) => s?._id) || [];
      const advertWantIds = advert.userWanted?.map((s) => s?._id) || [];

      const matchesWant =
        filterWantIds.length === 0 ||
        filterWantIds.some((id) => advertOfferIds.includes(id));
      const matchesOffer =
        filterOfferIds.length === 0 ||
        filterOfferIds.some((id) => advertWantIds.includes(id));

      return matchesWant && matchesOffer;
    });
  }, [adverts, filterWantIds, filterOfferIds]);

  const hasActiveFilters = filterWantIds.length > 0 || filterOfferIds.length > 0;
  const [offerModalAdvertId, setOfferModalAdvertId] = useState(null);

  const isOwnAdvert = (advert) => {
    const ownerId = advert.userId?._id || advert.userId;
    return user?.id && String(ownerId) === String(user.id);
  };

  return (
    <div className="alladverts-container">
      <div className="alladverts-card">
        <h1>All Adverts</h1>
        <p className="alladverts-subtitle">
          Browse skills others are offering and looking for
        </p>

        {!skillsLoading && skills.length > 0 && (
          <div className="alladverts-filters">
            <div className="filter-column">
              <h3>Skills I want</h3>
              <p className="filter-hint">Show adverts where someone offers these</p>
              <SkillSelector
                skills={skills}
                selectedIds={filterWantIds}
                onChange={setFilterWantIds}
                placeholder="Search skills you need..."
              />
            </div>
            <div className="filter-column">
              <h3>Skills I can offer</h3>
              <p className="filter-hint">Show adverts where someone wants these</p>
              <SkillSelector
                skills={skills}
                selectedIds={filterOfferIds}
                onChange={setFilterOfferIds}
                placeholder="Search skills you have..."
              />
            </div>
          </div>
        )}

        <div className="alladverts-list">
          {advertsLoading ? (
            <p className="alladverts-empty">Loading adverts...</p>
          ) : filteredAdverts.length === 0 ? (
            <p className="alladverts-empty">
              {hasActiveFilters
                ? "No adverts match your filters"
                : "No adverts yet"}
            </p>
          ) : (
            filteredAdverts.map((advert) => (
              <AllAdvertItem
                key={advert._id}
                advert={advert}
                canCreateOffer={Boolean(user && !isOwnAdvert(advert))}
                onCreateOffer={setOfferModalAdvertId}
              />
            ))
          )}
        </div>
      </div>

      {offerModalAdvertId && (
        <CreateOfferModal
          advertId={offerModalAdvertId}
          onClose={() => setOfferModalAdvertId(null)}
        />
      )}
    </div>
  );
};

export default AllAdvertsPage;
