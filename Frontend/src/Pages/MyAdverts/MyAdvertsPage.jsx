import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/useUserStore";
import { useCreateAdvert, useMyAdverts, useDeleteAdvert } from "../../hooks/useAdvert";
import { useSkills } from "../../hooks/useSkills";
import SkillSelector from "./SkillSelector";
import DeleteIcon from "@mui/icons-material/Delete";
import "./MyAdvertsPageStyle.css";

const MyAdvertsPage = () => {
  const navigate = useNavigate();
  const { data: user, isLoading: userLoading } = useUser();
  const { data: skills = [], isLoading: skillsLoading } = useSkills();
  const {
    data: adverts = [],
    isLoading: advertsLoading,
  } = useMyAdverts(!!user);
  const {
    mutate: createAdvert,
    isPending: isCreating,
    isError: createError,
    error: createErrorData,
  } = useCreateAdvert();
  const { mutate: deleteAdvert } = useDeleteAdvert();

  const [userOffers, setUserOffers] = useState([]);
  const [userWanted, setUserWanted] = useState([]);

  useEffect(() => {
    if (!userLoading && !user) {
      navigate("/auth");
    }
  }, [user, userLoading, navigate]);

  const handleCreate = (e) => {
    e.preventDefault();
    if (userOffers.length === 0 && userWanted.length === 0) return;
    createAdvert(
      { userOffers, userWanted },
      {
        onSuccess: () => {
          setUserOffers([]);
          setUserWanted([]);
        },
      }
    );
  };

  if (userLoading) {
    return (
      <div className="myadverts-container">
        <div className="myadverts-loading">Loading...</div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="myadverts-container">
      <div className="myadverts-card">
        <h1>My Adverts</h1>
        <p className="myadverts-subtitle">
          Create adverts to exchange skills with others
        </p>

        <section className="myadverts-section">
          <h2>Create Advert</h2>
          <form onSubmit={handleCreate} className="myadverts-form">
            {createError && (
              <div className="myadverts-error">
                {createErrorData?.response?.data?.message || "Failed to create advert"}
              </div>
            )}

            {skillsLoading ? (
              <p className="skills-loading">Loading skills...</p>
            ) : skills.length === 0 ? (
              <p className="skills-empty">No skills available yet</p>
            ) : (
              <>
                <div className="skills-grid">
                  <div className="skills-column">
                    <h3>Skills I offer</h3>
                    <SkillSelector
                      skills={skills}
                      selectedIds={userOffers}
                      onChange={setUserOffers}
                      placeholder="Search skills to offer..."
                    />
                  </div>
                  <div className="skills-column">
                    <h3>Skills I want</h3>
                    <SkillSelector
                      skills={skills}
                      selectedIds={userWanted}
                      onChange={setUserWanted}
                      placeholder="Search skills you need..."
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="myadverts-button"
                  disabled={isCreating || (userOffers.length === 0 && userWanted.length === 0)}
                >
                  {isCreating ? "Creating..." : "Create Advert"}
                </button>
              </>
            )}
          </form>
        </section>

        <section className="myadverts-section">
          <h2>My Adverts</h2>
          <div className="adverts-list">
            {advertsLoading ? (
              <p className="adverts-empty">Loading adverts...</p>
            ) : adverts.length === 0 ? (
              <p className="adverts-empty">No adverts yet</p>
            ) : (
              adverts.map((advert) => (
                <div key={advert._id} className="advert-item">
                  <div className="advert-content">
                    <div className="advert-skills">
                      <div>
                        <span className="advert-label">Offers:</span>{" "}
                        {advert.userOffers?.map((s) => s?.name).join(", ") || "—"}
                      </div>
                      <div>
                        <span className="advert-label">Wants:</span>{" "}
                        {advert.userWanted?.map((s) => s?.name).join(", ") || "—"}
                      </div>
                    </div>
                    {advert.deals?.length > 0 && (
                      <span className="advert-deals">{advert.deals.length} deal(s)</span>
                    )}
                  </div>
                  <button
                    type="button"
                    className="advert-delete-btn"
                    onClick={() => deleteAdvert(advert._id)}
                    title="Delete advert"
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

export default MyAdvertsPage;
