# Customer360: Behavior, Value & Retention Insights

## Overview
Analysis of customer behavior, retention, and lifetime value for an e-commerce company to improve customer retention and maximize revenue.

## Business Questions
1. **Customer Segmentation:** Who are our most valuable customers?
2. **Cohort Analysis:** How do different customer groups generate revenue?
3. **Retention Analysis:** Which customers haven't purchased recently?

## Clean Up Data

**🖥️ Query**: [0_create_view.sql](https://github.com/amitkr209/SQL_Projects/blob/main/Customer%20360%20SQL%20Project/00%20Cohort%20Analysis%20View%20Optimization.sql)

- Aggregated sales and customer data into revenue metrics
- Calculated first purchase dates for cohort analysis
- Created view combining transactions and customer details

## Analysis

### 1. Customer Segmentation

**🖥️ Query**: [1_customer_segmentation.sql](https://github.com/amitkr209/SQL_Projects/blob/main/Customer%20360%20SQL%20Project/01%20-%20Customer%20Segmentation.sql)

- Categorized customers based on total lifetime value (LTV)
- Assigned customers to High, Mid, and Low-value segments
- Calculated key metrics like total revenue

**📈 Visualization:**

<img src="https://github.com/amitkr209/SQL_Projects/blob/main/Customer%20360%20SQL%20Project/Images/01_customer_segementation.png" alt="Customer Segmentation" style="width: 50%; height: auto;">

📊 **Key Findings:**
- High-value segment (25% of customers) drives 66% of revenue ($135.4M)
- Mid-value segment (50% of customers) generates 32% of revenue ($66.6M)
- Low-value segment (25% of customers) accounts for 2% of revenue ($4.3M)

💡 **Business Insights**
- High-Value (66% revenue): Offer premium membership program to 12,372 VIP customers, as losing one customer significantly impacts revenue
- Mid-Value (32% revenue): Create upgrade paths through personalized promotions, with potential $66.6M → $135.4M revenue opportunity
- Low-Value (2% revenue): Design re-engagement campaigns and price-sensitive promotions to increase purchase frequency

### 2. Customer Revenue by Cohort
**🖥️ Query**: [2_cohort_analysis.sql](https://github.com/amitkr209/SQL_Projects/blob/main/Customer%20360%20SQL%20Project/02%20-%20Cohort%20Analysis.sql)

- Tracked revenue and customer count per cohort
- Cohorts were grouped by year of first purchase
- Analyzed customer revenue at a cohort level

**📈 Visualization:**

Customer Revenue by Cohort (Adjusted for time in market) - First Purchase Date 

<img src="https://github.com/amitkr209/SQL_Projects/blob/main/Customer%20360%20SQL%20Project/Images/02.2_cohort_analysis.png" alt="Customer Revenue Normalized" style="width: 50%; height: auto;">

Investigate Monthly Revenue & Customer Trends (3 Month Rolling Average)

<img src="https://github.com/amitkr209/SQL_Projects/blob/main/Customer%20360%20SQL%20Project/Images/02.1_cohort_analysis.png" alt="Monthly Revenue & CustomerTrends" style="width: 50%; height: auto;">

📊 **Key Findings:**  
- Customer revenue is declining; older cohorts (2016-2018) spent approximately $2,800+, while the 2024 cohort spent dropped to approximately $1,970.  
- Revenue and customers peaked in 2022-2023, but both are now trending downward in 2024.  
- High volatility in revenue and customer count, with sharp drops in 2020 and 2024, signaling retention challenges.  

💡 **Business Insights:**  
- Boost retention & re-engagement by targeting recent cohorts (2022-2024) with personalized offers to prevent churn.  
Stabilize revenue fluctuations by introducing loyalty programs or subscriptions to ensure consistent spending.  
- Investigate cohort differences by applying successful strategies from high-spending cohorts (2016-2018) to newer ones.

### 3. Customer Retention
🖥️ Query: [3_retention_analysis.sql](https://github.com/amitkr209/SQL_Projects/blob/main/Customer%20360%20SQL%20Project/03%20-%20Customer%20Retention.sql)

- Identified customers at risk of churning
- Analyzed last purchase patterns
- Calculated customer-specific metrics

**📈 Visualization:**

Churned Customer Count

<img src="https://github.com/amitkr209/SQL_Projects/blob/main/Customer%20360%20SQL%20Project/Images/03.1_customer_churn.png" alt="Customer Churn" style="width: 50%; height: auto;">

Customer Churn by Cohort Year

<img src="https://github.com/amitkr209/SQL_Projects/blob/main/Customer%20360%20SQL%20Project/Images/03.2_customer_churn_cohort_year.png" alt="Customer Churn by Cohort Year" style="width: 50%; height: auto;">

📊 **Key Findings:**  
- Cohort churn stabilizes at ~90% after 2-3 years, indicating a predictable long-term retention pattern.  
- Retention rates are consistently low (8-10%) across all cohorts, suggesting retention issues are systemic rather than specific to certain years.  
- Newer cohorts (2022-2023) show similar churn trajectories, signaling that without intervention, future cohorts will follow the same pattern.  

💡 **Business Insights:**  
- Strengthen early engagement strategies to target the first 1-2 years with onboarding incentives, loyalty rewards, and personalized offers to improve long-term retention.  
- Re-engage high-value churned customers by focusing on targeted win-back campaigns rather than broad retention efforts, as reactivating valuable users may yield higher ROI.  
- Predict & preempt churn risk and use customer-specific warning indicators to proactively intervene with at-risk users before they lapse.

## Strategic Recommendations

1. **Customer Value Optimization** (Customer Segmentation)
   - Launch VIP program for 12,372 high-value customers (66% revenue)
   - Create personalized upgrade paths for mid-value segment ($66.6M → $135.4M opportunity)
   - Design price-sensitive promotions for low-value segment to increase purchase frequency

2. **Cohort Performance Strategy** (Customer Revenue by Cohort)
   - Target 2022-2024 cohorts with personalized re-engagement offers
   - Implement loyalty/subscription programs to stabilize revenue fluctuations
   - Apply successful strategies from high-spending 2016-2018 cohorts to newer customers

3. **Retention & Churn Prevention** (Customer Retention)
   - Strengthen first 1-2 year engagement with onboarding incentives and loyalty rewards
   - Focus on targeted win-back campaigns for high-value churned customers
   - Implement proactive intervention system for at-risk customers before they lapse

## Technical Details
- **Database:** PostgreSQL
- **Analysis Tools:** PostgreSQL, Dbeaver
- **Visualization:** ChatGPT
