/*
Question: Waht are the top_paying data analyst jobs?
         - Identify the top 10 highest-paying data analyst role that are available remotely.
         - Focuses on job_postings with specified salaries (remove nulls).
         - Include company name of top 10 roles.
         - Why? Highlighy the top-paying appotunities for Data Analyst, offering insights into employment on 
*/

SELECT  
    job_id, 
    job_title,
    name AS company_name,
    job_location,
    job_schedule_type,
    salary_year_avg,
    job_posted_date::DATE  -- Date only
    
FROM
    job_postings_fact
    LEFT JOIN
    company_dim ON job_postings_fact.company_id = company_dim.company_id
WHERE
    job_title_short = 'Data Analyst'
        AND job_location = 'Anywhere'
        AND salary_year_avg IS NOT NULL
ORDER BY
    salary_year_avg DESC
LIMIT 10;