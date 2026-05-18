-- 31 Find users created in the last 30 days.

select username from users
where created_at >= now() - interval '30 days';

-- 32 Find all appointments scheduled for today.

select * from appointments
where scheduled_at::Date = current_date;

-- 33. Find all loans with status 'defaulted' or 'overdue'. ##


SELECT * FROM loans WHERE status IN ('defaulted') UNION SELECT l.* FROM loans l JOIN loan_repayments lr ON l.loan_id = lr.loan_id WHERE lr.status = 'overdue';

SELECT * from loans
where status in ('defaulted')
UNION
SELECT l.* from loans l
join loan_repayments lr
on l.loan_id = lr.loan_id
where lr.status = 'overdue'

-- 34. Select the top 5 most expensive products.

select * from products
order by base_price DESC
limit 5;

-- 35. Find all users with a phone number provided. ## also checks for the empty strings

SELECT * from users
where phone is not null and phone != '';


-- 36. Find all reviews with a rating of 1 or 5 (extreme ratings).

select * from reviews
where rating in (1,5)

-- 37. Find all product variants that are out of stock.

select * from product_variants
where stock_qty < 1;

-- 38. Find all orders placed in January 2025.


select * from orders
where placed_at >= '2025-01-01' and placed_at < '2025-02-01';


-- 39. Select username, email, and created_at for inactive users.


select username, email, created_at from users
where is_active = 'false';

-- 40. Find all coupons that are currently valid.

select * from coupons
where valid_from  <= current_date
and valid_until >= current_date
and is_active = TRUE;

-- 41. Count the total number of users.

select count(*) as total_users from users;

-- 42. Count how many products have a non-null description.

select count(*) from products
where description is not null or description != '';

SELECT COUNT(description) AS with_desc FROM products;   -- ## here count(col_name) also excludes null in that column

-- 43. total revenue from all orders

select sum(total_amount) from orders;


-- 44. Find the average product price.

select round(AVG(base_price),2) as avg_price from products;

-- 45. Find the cheapest and most expensive product prices.

select min(base_price) as cheapest, max(base_price) as expensive from products;

--46. Count orders grouped by status.

select status, count(*) as order_count from orders
group by status;

-- 47. Find total revenue per user.



-- select u.user_id, u.username, sum(p.amount) as spend from users u
-- join orders o on o.user_id = u.user_id
-- join payments p on o.order_id = p.order_id
-- group by u.user_id, u.username
-- order by u.user_id asc;


SELECT user_id, SUM(total_amount) AS user_revenue FROM orders GROUP BY user_id
order by user_id asc;

-- 48. Find the average rating per product.
select* from products;

select p.product_id, p.name, round(avg(r.rating),2) as rated from products p
join reviews r on r.product_id = p.product_id
group by p.product_id, p.name
order by rated desc;


-- 49. Find users who have placed more than 5 orders.

select * from users u
left join orders o on o.user_id = u.user_id
group by u.user_id, o.order_id
having o.order_id > 5


SELECT u.user_id, u.username
FROM users u
JOIN orders o 
    ON o.user_id = u.user_id
GROUP BY u.user_id, u.username
HAVING COUNT(o.order_id) > 5;


SELECT u.username, u.user_id, COUNT(*) AS order_count FROM orders
join users u on u.user_id = orders.user_id GROUP BY u.user_id HAVING COUNT(*) > 5;

-- 50. Find the total stock across all product variants.

SELECT SUM(stock_qty) AS total_stock FROM product_variants;

-- 51. Count orders per payment method.

select count(*) as order_count, payment_method from orders o
group by payment_method;


-- 52. Group orders by status and payment_status to get counts.


select count(*), status, payment_status from orders 
group by status, payment_status;


-- 53. Find total paid vs unpaid amounts across all bills.


SELECT 
    CASE
        WHEN paid_amount = total_amount THEN 'paid'
        ELSE 'unpaid'
    END AS sts,
    COUNT(*) AS cnt
FROM bills
GROUP BY sts;


-- 54. Find the number of students per program.

SELECT program_id, COUNT(*) AS student_count FROM students GROUP BY program_id;

-- 55. Find the average salary per department for staff.

select d.dept_id, d.name, round(avg(salary),2) as avg_sal from staff s
join departments d on s.dept_id = d.dept_id
group by d.name, d.dept_id
order by d.dept_id asc;



-- 56. Find users with average order value above 500.

select user_id, round(avg(total_amount),2) as avg_amt from orders
group by user_id
having (avg(total_amount)>500)
order by user_id asc;


-- 57. Count distinct brands in the products table.

SELECT COUNT(DISTINCT brand_id) AS brand_count FROM products;


-- 58. Find the total number of transactions per account.


select count(txn_id) as counts, account_id from transactions
group by account_id
order by account_id asc;


-- 59. Find the maximum loan amount per loan type.

select loan_type, max(principal) as maxx from loans
group by loan_type


-- 60. Find total likes per post.

select p.post_id, count(*) as like_cnt from posts p
join likes l on p.post_id = l.post_id
where l.reaction = 'like'
group by p.post_id, l.reaction
order by like_cnt desc;


-- 61. Find the number of products per category.

select category_id,  count(*) as prod_cnt from products
group by category_id
order by prod_cnt desc;


-- 62. Find the sum of all discounts given.

select sum(discount_amount) as discounts from orders;	

-- 63. Find the minimum and maximum consultation fees across all doctors.

SELECT MIN(consultation_fee) AS min_fee, MAX(consultation_fee) AS max_fee FROM doctors;

-- 64. Count how many reviews each rating value has.

select count(*) as review_cnts, rating from reviews
group by rating
order by rating asc;

-- 65. Find the average GPA per batch year.

select batch_year, round(avg(gpa),2) from students
group by batch_year;


-- 66. Find total page views per product.

select p.name, count(*) as cnt from page_views pv
join products p on p.product_id = pv.product_id
group by p.name
order by cnt desc limit 10;

-- 67. Find total deposit amount per customer in fixed deposits.


select customer_id, sum(principal) as pnp from fixed_deposits
group by customer_id
order by pnp desc;

-- 68. Find the total number of comments per post.

select post_id, count(*) as cnt from comments c
group by post_id;


-- 69. Find status-wise count of orders, only showing statuses with more than 10 orders.

select status, count(*) from orders
group by status
having count(status) > 10;


-- 70. Find the total shipping fees collected.

select sum(shipping_fee) as fees from orders;

-- 71. Find the average number of items per order.

select * from orders;

select * from order_items;

select order_id, avg(quantity) as avg_qty from order_items
group by order_id
order by order_id asc;

select AVG(item_count) as avg_items
from (select order_id, count(*) as item_count
	  from order_items group by order_id) sub;

SELECT ROUND(AVG(item_count),2) AS avg_items
FROM (SELECT order_id, COUNT(*) AS item_count 
	  FROM order_items GROUP BY order_id) sub;


select * from orders;

-- 72. find the busiest day by order count


select CAST(placed_at as DATE) as busiest_day from orders
group by cast(placed_at as DATE)
order by cnt DESC
limit 1;


SELECT 
    COUNT(order_id) AS cnt, 
    CAST(placed_at AS DATE) AS busiest_day
FROM orders
GROUP BY CAST(placed_at AS DATE)
ORDER BY cnt DESC
LIMIT 1;




SELECT COUNT(*) AS order_count, SUM(total_amount) AS total,
ROUND(AVG(total_amount),2) AS avg_order, MIN(total_amount) AS min_order,
MAX(total_amount) AS max_order FROM orders;





