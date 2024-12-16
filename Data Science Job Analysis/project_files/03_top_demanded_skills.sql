/*
    Qustion: What are the most in-demand skills for data analyst?
        - Join the job_postings_fact table to inner join table similar to Query 2.
        - Identify the top 5 in-demand skills for a data analyst.
        - Focus on all job_posttings
        - Why? Retrieves the top 5 skills with the highest demand in the job_market,
          providibg the insights into the most valuable skills for job seekers.
*/

-- This solution is focused on the remote-jobs only
WITH remote_job_skills AS (
SELECT  
    skill_id,
    COUNT(*) AS skill_count
FROM
    skills_job_dim AS skill_to_job
    INNER JOIN
    job_postings_fact AS job_postings ON job_postings.job_id = skill_to_job.job_id
WHERE
    job_postings.job_work_from_home = TRUE
        AND job_title_short = 'Data Analyst'
GROUP BY
    skill_id
)
SELECT
    skills.skills,
    remote_job_skills.skill_count
FROM
    remote_job_skills
    INNER JOIN
    skills_dim AS skills ON skills.skill_id = remote_job_skills.skill_id
ORDER BY
    remote_job_skills.skill_count DESC
LIMIT 5;

-- This solution is focused on all type of jobs.
SELECT
    skills_dim.skills,
    COUNT(skills_job_dim.job_id) AS skill_count
FROM
    job_postings_fact
    INNER JOIN
    skills_job_dim ON job_postings_fact.job_id = skills_job_dim.job_id
    INNER JOIN
    skills_dim ON skills_job_dim.skill_id = skills_dim.skill_id
WHERE
    job_postings_fact.job_title_short = 'Data Analyst'
GROUP BY
    skills_dim.skills
ORDER BY
    skill_count DESC
LIMIT 5;