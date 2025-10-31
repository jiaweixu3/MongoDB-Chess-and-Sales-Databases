# 🍃 MongoDB Project: Chess & Sales Databases

## ✨ Summary

This repository showcases two MongoDB projects focused on advanced data modeling, querying, and analytics.  

The first models a **chess tournament system**, built entirely from scratch — including schema design, embedding strategy, record insertion, and complex queries.  

The second performs **sales data analysis** on a provided dataset, leveraging MongoDB’s Aggregation Framework and MapReduce to extract real-world insights.  

Together, they demonstrate NoSQL schema design, query logic, and analytical modeling across both structured and semi-structured data.

---

## ♟️ Project 1: Chess Results Database

A fully structured NoSQL database modeling the complete ecosystem of chess tournaments — including players, clubs, tournaments, teams, rounds, matches, and user comments.  

It was developed entirely from scratch, implementing every stage of NoSQL database construction: **schema design, data embedding, record insertion, and complex queries**.

### 🏗️ Database Design & Modeling

- Designed an optimized document schema combining **embedding and referencing** to balance data consistency and query performance.  
- Modeled realistic chess entities and relationships (players, clubs, teams, tournaments, matches, games, comments).  
- Embedded **games** within matches and **comments** within games to reflect real-world hierarchical relationships.  

### 🧮 Queries & Operations

- Retrieved all tournaments organized by a specific club or containing a given player.  
- Filtered games by player, tournament, or round.  
- Counted total tournaments per player and number of wins using **aggregation pipelines**.  
- Implemented updates to embedded arrays (e.g., inserting new comments into existing game documents).  
- Demonstrated advanced filters and projections with `$and`, `$or`, `$exists`, `$regex`, and `$in` operators.

### 🧩 Technical Highlights

- **Language:** MongoDB (JavaScript syntax)  
- **Techniques:** Schema Design · Embedding · Aggregation Pipelines · CRUD Operations · Query Optimization  
- **File:** `MongoDB_chess.js`

---

## 💸 Project 2: Sales Database Analysis

A data analytics project using MongoDB to explore and process real sales transactions.  
The dataset was provided, and the focus was on **data exploration, cleaning, and aggregation** using MongoDB’s native tools.

### 📊 Data Import & Preparation

- Imported multiple JSON datasets into MongoDB collections.  
- Cleaned and unified fields such as location, payment method, and product type.  
- Validated structure and consistency across all sales documents.  

### 🔍 Advanced Query Design

- Used operators like `$regex`, `$or`, `$in`, `$lt`, and `$gt` to build complex queries.  
- Applied array-based updates with `arrayFilters` to modify nested documents.  
- Implemented text search and projections to filter customers by satisfaction or purchase method.  

### 📈 Analytical Aggregations & MapReduce

- Calculated total and average sales per store, location, and product type using the **Aggregation Framework**.  
- Identified top-performing stores, purchase trends, and customer segments.  
- Implemented **MapReduce** to compute revenue distribution by purchase method.  

### 🧩 Technical Highlights

- **Language:** MongoDB (JavaScript syntax)  
- **Techniques:** Aggregation Framework · MapReduce · Data Cleaning · Text Indexing · Query Optimization  
- **Files:** `MongoDB_sales.js` + `/sales_databases/sales-1.json`, `/sales-2.json`, `/sales-3.json`

---

## 🧠 Skills Demonstrated

- Advanced NoSQL data modeling and schema optimization.  
- Embedding vs referencing strategy design.  
- Complex queries using filtering, projections, and array manipulation.  
- Aggregation pipeline development and performance tuning.  
- Integration of MapReduce for analytical computations.  
- Data cleaning and transformation on semi-structured data.  

---

## ⚙️ Repository Contents

| File / Folder | Description |
|----------------|-------------|
| **MongoDB_chess.js** | Full implementation of the Chess Results database — schema, inserts, and analytical queries. |
| **MongoDB_sales.js** | Sales database analysis — queries, aggregations, and MapReduce implementation. |
| **sales_databases/** | Folder containing the provided JSON datasets (`sales-1.json`, `sales-2.json`, `sales-3.json`). |

---

## 👥 Authors

- **Jiawei Xu**  
- **Iván López Anca**
