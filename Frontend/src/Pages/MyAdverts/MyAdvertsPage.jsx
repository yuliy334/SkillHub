import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/useUserStore";
import { useCreateAdvert, useMyAdverts, useDeleteAdvert, useAcceptDeal, useRejectDeal } from "../../hooks/useAdvert";
import { useSkills, useAddSkill } from "../../hooks/useSkills";
import SkillSelector from "./SkillSelector";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import "./MyAdvertsPageStyle.css";

const MyAdvertsPage = () => {
  const navigate = useNavigate();
  const { data: user, isLoading: userLoading } = useUser();
  const { data: skills = [], isLoading: skillsLoading } = useSkills();
  const {
    mutate: addSkill,
    isPending: isAddingSkill,
    isError: addSkillError,
    error: addSkillErrorData,
  } = useAddSkill();
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
  const { mutate: acceptDeal } = useAcceptDeal();
  const { mutate: rejectDeal } = useRejectDeal();

  const [userOffers, setUserOffers] = useState([]);
  const [userWanted, setUserWanted] = useState([]);
  const [newSkillName, setNewSkillName] = useState("");

  useEffect(() => {
    if (!userLoading && !user) {
      navigate("/auth");
    }
  }, [user, userLoading, navigate]);

  const handleAddSkill = (e) => {
    e.preventDefault();
    const name = newSkillName.trim();
    if (!name) return;
    addSkill(
      { name },
      {
        onSuccess: () => {
          setNewSkillName("");
        },
      }
    );
  };

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

          <div className="add-skill-block">
            <h3>Add new skill</h3>
            <form onSubmit={handleAddSkill} className="add-skill-form">
              <input
                type="text"
                className="add-skill-input"
                placeholder="Skill name (e.g. JavaScript, Piano)"
                value={newSkillName}
                onChange={(e) => setNewSkillName(e.target.value)}
                disabled={isAddingSkill}
              />
              <button
                type="submit"
                className="add-skill-button"
                disabled={isAddingSkill || !newSkillName.trim()}
              >
                <AddIcon fontSize="small" />
                {isAddingSkill ? "Adding..." : "Add"}
              </button>
            </form>
            {addSkillError && (
              <div className="myadverts-error add-skill-error">
                {addSkillErrorData?.response?.data?.message || "Failed to add skill"}
              </div>
            )}
          </div>

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
                      <div className="advert-deals-list">
                        {advert.deals.map((deal) => (
                          <div key={deal._id} className="deal-card">
                            <div className="deal-info">
                              <span className="deal-from">
                                From: {deal.requesterId?.name || "User"}
                              </span>
                              <span className="deal-wants">
                                Wants: {deal.requestorOffers?.map((s) => s?.name).join(", ") || "—"}
                              </span>
                              <span className="deal-offers">
                                Offers: {deal.requestorWanted?.map((s) => s?.name).join(", ") || "—"}
                              </span>
                              {deal.status !== "pending" && (
                                <span className={`deal-status deal-status-${deal.status}`}>
                                  {deal.status}
                                </span>
                              )}
                            </div>
                            {deal.status === "pending" && (
                              <div className="deal-actions">
                                <button
                                  type="button"
                                  className="deal-accept-btn"
                                  onClick={() => acceptDeal({ advertId: advert._id, dealId: deal._id })}
                                  title="Accept"
                                >
                                  <CheckCircleIcon fontSize="small" />
                                  Accept
                                </button>
                                <button
                                  type="button"
                                  className="deal-reject-btn"
                                  onClick={() => rejectDeal({ advertId: advert._id, dealId: deal._id })}
                                  title="Reject"
                                >
                                  <CancelIcon fontSize="small" />
                                  Reject
                                </button>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
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
