-- Customer Revenue by Cohort

SELECT 
	cohort_year,
	COUNT(DISTINCT customerkey) AS total_customers,
	ROUND(SUM(total_net_revenue)::NUMERIC, 2) AS total_revenue,
	ROUND((SUM(total_net_revenue) / COUNT(DISTINCT customerkey))::NUMERIC, 2) AS customer_revenue
FROM
	cohort_analysis
WHERE
	orderdate = first_purchase_date
GROUP BY
	cohort_year
ORDER BY
	cohort_year;

-- Investigate Monthly Revenue & Customer Trends

SELECT
	date_trunc('month', orderdate)::DATE AS year_month,
	COUNT(DISTINCT customerkey) AS total_customers,
	ROUND(SUM(total_net_revenue)::NUMERIC, 2) AS total_revenue,
	ROUND((SUM(total_net_revenue) / COUNT(DISTINCT customerkey))::NUMERIC, 2) AS customer_revenue
FROM
	cohort_analysis
WHERE
	orderdate = first_purchase_date
GROUP BY
	year_month
ORDER BY
	year_month;