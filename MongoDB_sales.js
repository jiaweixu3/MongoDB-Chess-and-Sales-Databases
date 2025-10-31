// SALES RESULTS

// I. Import code:

// 1. Create a database named "Sales".
use('sales');

/*
2. Insert the record of the sale stored in sales-1.json, into a collection called "sales".
(This is a shell command, not a Mongo shell script command)

cd C:\Program Files\MongoDB\Server\4.0\bin
mongoimport --host localhost --port 27017 -d sales -c sales --file C:\data\db\sales-1.json
*/

/*
3. Insert the sales supplied in the form of an array in the file sales-2.json.
(This is a shell command, not a Mongo shell script command)

mongoimport --host localhost --port 27017 -d sales -c sales --file C:\data\db\sales-2.json --jsonArray
*/

// II. Queries Statements:

// 4. Query to display the sales date, location, age, and gender of the customer, sorted by purchase method.
db.sales.find({}, {_id: 0, saleDate: 1, storeLocation: 1, "customer.age": 1, "customer.gender": 1, purchaseMethod: 1 }).sort({ purchaseMethod: 1 });

// 5. Query to retrieve all sales whose location's name starts with 'L' or have a purchase method of "Online" or "Phone".
db.sales.find({
  $or: [
    { "storeLocation": { $regex: "^L", $options: "i" } },
    { "purchaseMethod": { $in: ["Online", "Phone"] } }
  ]
});

/*
6. Insert a new record sales-3.json.
(This is a shell command, not a Mongo shell script command)

mongoimport --host localhost --port 27017 -d sales -c sales --file C:\data\db\sales-3.json
*/

// 7. Query to list the sales of customers under 50 years old who used coupons.
db.sales.find({
  "customer.age": { $lt: 50 },
  "couponUsed": true
});

// 8. Query to list the comments of customers whose satisfaction is greater than 3.
db.sales.find(
    { "customer.satisfaction": { $gt: 3 } },
    { "customer.satisfaction":1, "customer.comment": 1 }
);

// 9. Query to find sales that contain 'laptops' and 'envelopes'.
db.sales.find({
  $and: [
    { "items.name": "laptop" },
    { "items.name": "envelopes" }
  ]
});

// 10. Query to update the date of the first sale with another value.
db.sales.updateOne({ saleNum: 1 }, { $set: { saleDate: ISODate("2024-11-28") } });
db.sales.find({saleNum:1});

// 11. Query to modify the tag "electronics" to "computers" in all sales.
db.sales.updateMany(
  { "items.tags": "electronics" },
  { $set: { "items.$[].tags.$[tag]": "computers" } },
  {
    arrayFilters: [
      { "tag": "electronics" }
    ]
  }
);
db.sales.find({"items.tags":"computers"});

// 12. Query to locate the sales of the customer whose passport is "43935008V" and correct anomalies.
db.sales.find({ "customer.passport": "43935008V" });

/*
// From this, we can see that two sales pop up for two different people with the same passport.
// To correct this we could change the passport value for both clients until them confirm their real passports.
*/
db.sales.updateOne({ "customer.passport": "43935008V", "customer.name": "Louis Pandolfini" },
    { $set: { "customer.passport": "00000000L" } }
);
db.sales.updateOne(
    { "customer.passport": "43935008V", "customer.name": "Juan Ramirez" },
    { $set: { "customer.passport": "00000000J" } } );

// Now the correct way to proceed with this search for Louis would be:
db.sales.find({ "customer.passport": "00000000L" });
// and with Juan:
db.sales.find({ "customer.passport": "00000000J" });

// 13. Create a text index on the comments' text and use this index to locate all sales that include "Nice" in the comment.
 // Creation of the index
db.sales.createIndex({ "customer.comment": "text" })
// Usage to locate sales that include "Nice" in the comment
db.sales.find({
  $text: { $search: "Nice" }
});

// 14. Query to count the number of sales that contain "printer paper" in "Seattle" and "Denver".
db.sales.count({"items.name": "printer paper", "storeLocation": { $in: ["Seattle", "Denver"] }});

// 15. Query to list the distinct names of all items in the saleNum 1.
db.sales.distinct("items.name", { "saleNum": 1 });

// 16. Aggregation to calculate the number of sales per purchase method.
db.sales.aggregate([
    {
        $group: {
            _id: "$purchaseMethod",
            totalSales: { $sum: 1 }
        }
    }
]);

// 17. MapReduce to calculate the total price of each sale.
var mymap = function() {
    var total_price = 0;
    for (var i = 0; i < this.items.length; i++) {
        total_price += this.items[i].price * this.items[i].quantity;
    }
    emit(this.saleNum, total_price);
};

var myreduce = function(key, values) {
    return Array.sum(values);
};

db.sales.mapReduce(mymap, myreduce, { out: "total_sales_price" });
db.total_sales_price.find()


// 18. Aggregation to calculate the total price of the sales of each location.
db.sales.aggregate([
    {
        $unwind: "$items"
    },
    {
        $group: {
            _id: "$storeLocation",
            totalSalesValue: { $sum: { $multiply: ["$items.price", "$items.quantity"] } }
        }
    }
]);
