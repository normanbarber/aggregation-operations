

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// unwinds the registrations array and counts how many notifications are in each and totals them up
// outputting the users fname field and the total for each user   - using match to exclude some name
cls
db.contacts.aggregate([
{$match : { fname : { $nin : ["joe", "joeadmin", "Bholbrooks", "Commandalkon", "Lmarthe", "Bzoelle", "cstuart"] }}},
{$unwind: "$registrations" },
{ $group: { _id: "$fname", count: { $sum: 1 } } },
{$project : { "name" : "$_id", "_id" : 0, "count" : 1 }}
])


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
