SELECT * FROM gidy_profile.profile;
INSERT INTO profile (id, name, role, location, bio, email, career_vision, current_level, growth_space, inspired_by, league, rank_level, points) 
VALUES (1, 'Semmozhiselvan M', 'Fresher / Graduate', 'Chennai', 'Motivated Computer Science graduate with strong knowledge in Java and Spring Boot...', 'semmozhiselvan2209@gmail.com', 'Software Architect', 'Entry Level Professional', 'Developer Relations', 'Ratan Naval Tata', 'Bronze', 29, 50);

INSERT INTO profile_skills (profile_id, skills) VALUES (1, 'Java'), (1, 'Spring Boot'), (1, 'MySQL'), (1, 'REST APIs'), (1, 'Docker'), (1, 'Git');