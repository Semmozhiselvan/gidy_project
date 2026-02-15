# gidy_project

🚀 DevPulse: Dynamic Portfolio Architect
A high-performance, Glassmorphism-inspired profile management system built with the power of Spring Boot 3 and React 18.

✨ Innovative Features
💎 Glassmorphic UI: Modern, translucent design with vibrant gradients for a premium feel.

⚡ Real-time Tagging: Add skills and interests dynamically with instant state synchronization.

🎓 Smart Education Manager: Fully editable academic history with "orphan removal" synchronization to the database.

🎯 Interest Cloud: Separate visualization for professional skills vs. personal interests.

🔄 RESTful Precision: Transactional backend updates ensuring 100% data integrity.

🏗️ System Architecture
The application follows a decoupled client-server architecture:

Frontend: React (Vite) + Lucide Icons + Axios.

API Layer: Spring Boot REST Controllers with @CrossOrigin.

Service Layer: Transactional logic for synchronizing @ElementCollection (Skills/Interests).

Persistence: Hibernate/JPA mapping to a normalized MySQL schema.

🛠️ Technical Deep Dive
Backend (The Engine)
The backend utilizes JPA Dirty Checking. Instead of manual SQL updates, we use collection synchronization:

Java
profile.getInterests().clear();
profile.getInterests().addAll(updatedProfile.getInterests());
Frontend (The Experience)
We utilize a Generic Tag Handler to manage multiple arrays with a single logic block:

JavaScript
const handleAddTag = (e, field, value, setter) => {
  if (e.key === 'Enter' && value.trim() !== "") {
    setProfile({ ...profile, [field]: [...profile[field], value] });
    setter("");
  }
};

🚀 Quick Start
1. Database Setup
SQL
CREATE DATABASE dev_profile;
-- Run the provided SQL scripts in /resources/db.sql
   
2. Backend Launch
Bash
cd backend
mvn spring-boot:run

3. Frontend Launch
Bash
cd frontend
npm install
npm run dev
