

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// unwinds the registrations array and counts how many notifications are in each and totals them up
// outputting the users fname field and the total for each user   - using match to exclude some name
cls
db.contacts.aggregate([
{$match : { fname : { $nin : ["names", "to", "exclude", "go", "here"] }}},
{$unwind: "$registrations" },
{ $group: { _id: "$fname", count: { $sum: 1 } } },
{$project : { "name" : "$_id", "_id" : 0, "count" : 1 }}
])


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// unwinds the registrations array and counts the total notifications for all users
// excludes all users with fname = names listed in the $nin array
cls
db.contacts.aggregate([
{ $match: { fname : { $nin : ["names", "to", "exclude", "go", "here"] }}},
{ $unwind: "$registrations" },
{ 
$group: { _id: "$registration", count: { $sum: 1 } }
},
{$project : { "_id" : 0, count : 1 }}
])


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////