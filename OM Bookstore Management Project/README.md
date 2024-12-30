# Om Bookstore Project Analysis

## Overview
This project was conducted for Om Bookstore, located in Vegas Mall, as a freelance Data Analyst. The initiative focused on building a database, performing SQL-based analysis, and providing actionable recommendations. While a Medium blog inspires the dataset used and is not real, the questions and analytical approach reflect the work done for the bookstore.

---

Blog: Explaining the Process
In my blog, I delve deeper into the process and methodology behind this case study. I discuss the significance of each step, from data cleaning to generating insights. This includes a breakdown of challenges encountered during analysis, the rationale behind chosen techniques, and reflections on the outcomes. The blog is an educational resource for anyone interested in SQL and data analytics.

Explore the complete blog and database on [Medium](https://medium.com/@olly3301/data-analysis-with-sql-online-bookstore-management-project-ab6a887aa43f).

---

## Tools Used
- **MySQL Workbench 8.0 CE**: For database management and executing SQL queries.
- **Data Cleaning Techniques**: Employed tools and methods like `ALTER TABLE`, `DISTINCT`, `IS NULL`, and `CASE` statements to ensure data integrity.

---

## Business Questions Answered
1. **Data period**:
   - How many days are covered?
2. **Book inventory**:
   - Total number of books available.
3. **Books with above-average pages**:
   - Titles exceeding the average page count.
4. **Top publishers**:
   - Publishers with the most printed books.
5. **Revenue**:
   - Total revenue of the bookstore.
6. **Online sales**:
   - Total books sold online.
7. **Most invoices by location**:
   - Province with the highest number of invoices.
8. **Best customer**:
   - Customer who spent the most.
9. **Authors of Horror books**:
   - Identifying authors specializing in Horror.
10. **Best-selling artist analysis**:
    - Artist with the highest revenue and their top customer.
11. **Most popular genre by province**:
    - Genre with the highest purchases in each province.
12. **Top customers by province**:
    - Customers who spent the most in each province.

---

## Data Overview
The dataset consists of nine related tables:

- **book_info**: Contains details about books, including title, author, genre, and pages.
- **Customers**: Includes customer information such as location.
- **Order_items**: Details transaction data, such as quantity and price.
- **Orders**: Provides metadata for each order.

---

## Data Preparation and Cleanup
This section outlines the steps taken to prepare the data for analysis, ensuring accuracy and usability.

### Cleaning Process
- Renamed misspelled columns.
- Removed duplicate entries in the province column.
- Resolved inconsistencies between province and city values.
- Created a backup schema before performing any data-cleaning tasks.

---

## Key SQL Queries

### 1. How many days is the data period?
```sql
SELECT DATEDIFF(MAX(order_date), MIN(order_date)) AS total_days
FROM Orders;
```

### 2. Total number of books
```sql
SELECT COUNT(book_id) AS total_books
FROM book_info;
```

### 3. Books with above-average pages
```sql
SELECT book_name, number_of_pages
FROM book_info
WHERE number_of_pages > (SELECT AVG(number_of_pages) FROM book_info)
ORDER BY number_of_pages;
```

### 4. Publisher with most books
```sql
SELECT p.publisher_id, p.name AS publisher, COUNT(bi.publisher_id) AS total
FROM book_info bi
JOIN publisher p ON bi.publisher_id = p.publisher_id
GROUP BY p.publisher_id, publisher
ORDER BY total DESC
LIMIT 1;
```

### 5. Total revenue
```sql
SELECT SUM(quantity * unit_price) AS revenue
FROM Order_items;
```

### 6. Online sales
```sql
SELECT SUM(quantity) AS total_books_sold
FROM Order_items;
```

### 7. Which Province has the most invoices?
```sql
SELECT 
   c.province, COUNT(o.order_id) as invoice_number
FROM Customers c
JOIN Orders o ON c.customer_id = o.customer_id
JOIN Order_items oi ON o.order_id = oi.order_id
GROUP BY invoice_number
ORDER BY 2 DESC;
```
### 8. Who is the best customer?
```sql
SELECT 
 o.customer_id, fist_name, last_name,
    COUNT(oi.quantity) as total_book,
    SUM(quantity * unit_price) as money_spent
FROM Customers c
JOIN Orders o ON c.customer_id = o.customer_id
JOIN Order_items oi ON o.order_id = oi.order_id
GROUP BY 1,2,3
ORDER BY 5 DESC
LIMIT 3;
```

### 9. Who is writing Horror books?
```sql
SELECT author, book_name
FROM book_info bi
JOIN genre g ON bi.genre_id = g.genre_id
WHERE g.name = "Horror";
```

### 10. First, find which artist has earned the most according to the InvoiceLines.
```sql
WITH tbl_best_selling_author AS(
    SELECT 
  author,
        SUM(oi.unit_price * oi.quantity) AS total_sales
 FROM book_info bi
 JOIN Order_items oi ON bi.book_id = oi.product_id
 GROUP BY author
 ORDER BY total_sales DESC
 LIMIT 10
)SELECT 
 bsa.author,
    SUM(oi.unit_price * oi.quantity) AS amount_spent, 
    c.customer_id, c.fist_name, c.last_name
FROM Customers c
JOIN Orders o ON c.customer_id = o.customer_id
JOIN Order_items oi ON o.order_id = oi.order_id
JOIN book_info bi ON oi.product_id = bi.book_id
JOIN tbl_best_selling_author bsa ON bi.author = bsa.author
GROUP BY bsa.author,
         c.customer_id,
         c.first_name,
         c.last_name
ORDER BY amount_spent DESC;
```

### 11. We want to find out the most popular book Genre for each Province.
```sql
WITH RECURSIVE
    tbl_sales_per_province AS(
  SELECT COUNT(*) AS purchases_per_genre, province, g.name as genre, g.genre_id
  FROM Customers c
  JOIN Orders o ON c.customer_id = o.customer_id
  JOIN Order_items oi ON o.order_id = oi.order_id
  JOIN book_info bi ON oi.product_id = bi.book_id
  JOIN genre g ON bi.genre_id = g.genre_id
  GROUP BY 2,3,4
  ORDER BY 1 DESC
 )
 ,tbl_max_genre_per_province AS(SELECT MAX(purchases_per_genre) AS max_genre_number, province
  FROM tbl_sales_per_province
  GROUP BY 2
  ORDER BY 2)SELECT tbl_sales_per_province.* 
FROM tbl_sales_per_province
JOIN tbl_max_genre_per_province ON tbl_sales_per_province.province = tbl_max_genre_per_province.province
WHERE tbl_sales_per_province.purchases_per_genre = tbl_max_genre_per_province.max_genre_number;
```

### 12. Write a query that determines the customer that has spent the most on books for each province.
```sql
WITH RECURSIVE 
   tbl_customer_with_province AS (
     SELECT c.customer_id, fist_name, last_name, province,SUM(oi.quantity*oi.unit_price) AS total_spending
     FROM Order_items oi
     JOIN Orders o ON oi.order_id = o.order_id
     JOIN Customers c ON c.customer_id = o.customer_id
     GROUP BY 1,2,3,4
     ORDER BY 2,3 DESC),   tbl_province_max_spending AS(
     SELECT province, MAX(total_spending) AS max_spending
     FROM tbl_customer_with_province
     GROUP BY 1)SELECT 
    tbl_cp.province, tbl_cp.customer_id, tbl_cp.fist_name, tbl_cp.last_name, tbl_cp.total_spending
FROM tbl_customer_with_province tbl_cp
JOIN tbl_province_max_spending tbl_ms
   ON tbl_cp.province = tbl_ms.province
WHERE tbl_cp.total_spending = tbl_ms.max_spending
ORDER BY 1;
```

---

## Insights

1. **Revenue and sales**: In just 17 days, the bookstore earned IDR 18,075,000 with 101 books sold.
2. **Top location**: Jakarta had the most invoices, and "Self Development" emerged as the most popular genre.
3. **Best customer**: Kiran Haina purchased 17 books, making them the bookstore’s top customer.
4. **Recommendations**: Due to high demand, additional stock of self-improvement books is advised.

---

## Findings and Conclusions
This project highlights the power of SQL in deriving valuable insights for business improvement. While the dataset is simulated, the analysis provides a framework for understanding key metrics in bookstore operations.
