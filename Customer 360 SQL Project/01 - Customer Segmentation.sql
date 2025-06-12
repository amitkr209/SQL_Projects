-- Project Q1: Customer Segmentation

WITH customer_ltv AS (
	SELECT
		customerkey,
		cleaned_name,
		ROUND(SUM(total_net_revenue)::NUMERIC, 2) AS total_ltv
	FROM
		cohort_analysis
	GROUP BY
		customerkey,
		cleaned_name
),
customer_segment AS (
	SELECT
		PERCENTILE_CONT(0.25) WITHIN GROUP (
		ORDER BY
			total_ltv
		) AS ltv_25th_Percentile,
		PERCENTILE_CONT(0.75) WITHIN GROUP (
		ORDER BY
			total_ltv
		) AS ltv_75th_Percentile
	FROM
		customer_ltv
),
segment_value AS (
	SELECT
		customerkey,
		cleaned_name,
		total_ltv,
		CASE
			WHEN total_ltv <= ltv_25th_percentile THEN '1 - Low-Value'
			WHEN total_ltv >= ltv_75th_percentile THEN '3 - High-Value'
			ELSE '2 - Medium-Value'
		END AS customer_segment
	FROM 
		customer_ltv
	CROSS JOIN
		customer_segment
)
SELECT	
	customer_segment,
	SUM(total_ltv) AS total_ltv,
	ROUND(100 * SUM(total_ltv) / (SELECT SUM(total_ltv) FROM segment_value)::NUMERIC, 0) AS ltv_percent,
	COUNT(customer_segment) AS customers_count,
	ROUND(SUM(total_ltv) / COUNT(customer_segment)::NUMERIC, 2) AS avg_ltv
FROM
	segment_value
GROUP BY
	customer_segment
ORDER BY
	customer_segment DESC;