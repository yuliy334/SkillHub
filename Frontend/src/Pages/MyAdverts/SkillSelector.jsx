import React, { useState, useMemo, useRef, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import "./SkillSelector.css";

const SkillSelector = ({ skills, selectedIds, onChange, placeholder }) => {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const filteredSkills = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return skills;
    return skills.filter((skill) =>
      skill.name.toLowerCase().includes(term)
    );
  }, [skills, search]);

  const selectedSkills = useMemo(
    () => skills.filter((s) => selectedIds.includes(s._id)),
    [skills, selectedIds]
  );

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleSkill = (skillId) => {
    onChange(
      selectedIds.includes(skillId)
        ? selectedIds.filter((id) => id !== skillId)
        : [...selectedIds, skillId]
    );
  };

  const removeSkill = (e, skillId) => {
    e.stopPropagation();
    onChange(selectedIds.filter((id) => id !== skillId));
  };

  return (
    <div className="skill-selector" ref={containerRef}>
      <div
        className="skill-selector-input-wrap"
        onClick={() => setIsOpen(!isOpen)}
      >
        <SearchIcon className="skill-selector-icon" />
        <input
          type="text"
          className="skill-selector-input"
          placeholder={placeholder}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
        />
      </div>

      {selectedSkills.length > 0 && (
        <div className="skill-chips">
          {selectedSkills.map((skill) => (
            <span key={skill._id} className="skill-chip">
              {skill.name}
              <button
                type="button"
                className="skill-chip-remove"
                onClick={(e) => removeSkill(e, skill._id)}
                aria-label={`Remove ${skill.name}`}
              >
                <CloseIcon fontSize="inherit" />
              </button>
            </span>
          ))}
        </div>
      )}

      {isOpen && (
        <div className="skill-dropdown">
          {filteredSkills.length === 0 ? (
            <div className="skill-dropdown-empty">
              {search ? "No matching skills" : "No skills available"}
            </div>
          ) : (
            <ul className="skill-dropdown-list">
              {filteredSkills.map((skill) => (
                <li
                  key={skill._id}
                  className={`skill-dropdown-item ${
                    selectedIds.includes(skill._id) ? "selected" : ""
                  }`}
                  onClick={() => toggleSkill(skill._id)}
                >
                  {skill.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default SkillSelector;
