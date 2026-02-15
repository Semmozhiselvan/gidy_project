import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Edit3, Save, Plus, X, GraduationCap, MapPin, Mail, Trash2, Heart } from 'lucide-react';
import './App.css';

const App = () => {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [skillInput, setSkillInput] = useState("");
  const [interestInput, setInterestInput] = useState("");

  useEffect(() => { fetchProfile(); }, []);

  const fetchProfile = async () => {
    try {
      const res = await axios.get('http://localhost:8081/api/profile/1');
      setProfile(res.data);
    } catch (err) { console.error("Fetch error:", err); }
  };

  const handleSave = async () => {
    try {
      await axios.put('http://localhost:8081/api/profile/1', profile);
      setIsEditing(false);
    } catch (err) { alert("Failed to save profile"); }
  };

  const handleAddTag = (e, field, value, setter) => {
    if ((e.key === 'Enter' || e.type === 'click') && value.trim() !== "") {
      e.preventDefault();
      if (!profile[field].includes(value.trim())) {
        setProfile({ ...profile, [field]: [...profile[field], value.trim()] });
      }
      setter("");
    }
  };

  const handleRemoveTag = (field, tagToRemove) => {
    setProfile({ ...profile, [field]: profile[field].filter(t => t !== tagToRemove) });
  };

  const updateEdu = (index, field, value) => {
    const newEdu = [...profile.education];
    newEdu[index][field] = value;
    setProfile({ ...profile, education: newEdu });
  };

  const addEdu = () => {
    const newEdu = { degreeName: "", collegeName: "", duration: "" };
    setProfile({ ...profile, education: [...profile.education, newEdu] });
  };

  const removeEdu = (index) => {
    const newEdu = profile.education.filter((_, i) => i !== index);
    setProfile({ ...profile, education: newEdu });
  };

  if (!profile) return <div className="loading-screen"><span>Loading your awesome profile...</span></div>;

  return (
    <div className="app-viewport">
      <div className="container">
        {/* HERO SECTION */}
        <div className="card hero-card">
          <div className="hero-top">
            <div className="avatar-section">
              <div className="avatar-glow">{profile.name.charAt(0)}</div>
            </div>
            <div className="profile-main-info">
              {isEditing ? (
                <div className="edit-grid">
                  <input className="glass-input name-edit" value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})} placeholder="Full Name" />
                  <div className="meta-edit-row">
                    <input className="glass-input" value={profile.location} onChange={e => setProfile({...profile, location: e.target.value})} placeholder="Location" />
                    <input className="glass-input" value={profile.email} onChange={e => setProfile({...profile, email: e.target.value})} placeholder="Email" />
                  </div>
                </div>
              ) : (
                <>
                  <h1 className="user-name">{profile.name}</h1>
                  <div className="meta-info">
                    <span><MapPin size={18} /> {profile.location}</span>
                    <span><Mail size={18} /> {profile.email}</span>
                  </div>
                </>
              )}
            </div>
            <button className={`btn-action ${isEditing ? 'save' : 'edit'}`} onClick={() => isEditing ? handleSave() : setIsEditing(true)}>
              {isEditing ? <><Save size={20}/> Save Changes</> : <><Edit3 size={20}/> Edit Profile</>}
            </button>
          </div>
        </div>

        <div className="content-layout">
          {/* LEFT COLUMN */}
          <div className="main-col">
            <div className="card glass-card">
              <div className="card-header">
                <h3 className="section-title"><GraduationCap /> Education</h3>
                {isEditing && <button className="add-btn" onClick={addEdu}><Plus size={18} /></button>}
              </div>
              <div className="edu-list">
                {profile.education?.map((edu, index) => (
                  <div key={index} className="edu-box">
                    {isEditing ? (
                      <div className="edu-edit-inputs">
                        <input className="glass-input" value={edu.degreeName} onChange={e => updateEdu(index, 'degreeName', e.target.value)} placeholder="Degree" />
                        <input className="glass-input" value={edu.collegeName} onChange={e => updateEdu(index, 'collegeName', e.target.value)} placeholder="University" />
                        <div className="flex-row">
                          <input className="glass-input" value={edu.duration} onChange={e => updateEdu(index, 'duration', e.target.value)} placeholder="Year" />
                          <button className="del-btn" onClick={() => removeEdu(index)}><Trash2 size={18}/></button>
                        </div>
                      </div>
                    ) : (
                      <div className="edu-view">
                        <h4>{edu.degreeName}</h4>
                        <p className="college">{edu.collegeName}</p>
                        <span className="date-tag">{edu.duration}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="side-col">
            {/* SKILLS */}
            <div className="card glass-card">
              <h3 className="section-title">Expertise</h3>
              {isEditing && (
                <div className="tag-input-box">
                  <input value={skillInput} onChange={(e) => setSkillInput(e.target.value)} onKeyDown={(e) => handleAddTag(e, 'skills', skillInput, setSkillInput)} placeholder="New skill..." />
                  <Plus className="input-icon" onClick={(e) => handleAddTag(e, 'skills', skillInput, setSkillInput)} />
                </div>
              )}
              <div className="tag-cloud">
                {profile.skills?.map((s, i) => (
                  <span key={i} className="skill-pill">
                    {s} {isEditing && <X size={14} onClick={() => handleRemoveTag('skills', s)} />}
                  </span>
                ))}
              </div>
            </div>

            
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;