

// all users - total all logins for all users in users collection
cls
db.users.aggregate([
{
$match : { userName : { $nin : ["joe", "joeadmin", "Bholbrooks", "Commandalkon", "Lmarthe", "Bzoelle", "cstuart"] }}
},
{
$group :{ _id : "$company", total_logins : { $sum : "$totalLogins"},
}
}
])

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// last 5 users who logged in - using match to exclude name
cls
db.users.aggregate([
{
$match : { userName : {$nin : ["joe", "joeadmin", "Bholbrooks", "Commandalkon", "Lmarthe", "Bzoelle", "cstuart"] }}
},
{
$group:
{
_id: "$userName",
last_login: {$first: "$lastLogin"},
}
},
{ $project: { "name" : "$_id", "last_login": 1, "_id" : 0 } },
{ $sort: { last_login : -1}},
{ $limit:5}
])



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



// top 5 users based on totalLogins  - using match to exclude name
cls
db.users.aggregate([
{
$match : { userName : {$nin : ["joe", "joeadmin", "Bholbrooks", "Commandalkon", "Lmarthe", "Bzoelle", "cstuart"] }}
},
{
$group:
{
_id: "$userName",
total_logins: {$first: "$totalLogins"},
}
},
{ $project: { "name" : "$_id", "total_logins": 1, "_id" : 0 } },
{ $sort: {total_logins: -1}},
{ $limit:5}
])



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




// this works for finding all users/total_logins outputting all users, except users listed in the nin array
// this will exclude the _id from the output and only output total_logins because of $project operator
cls
db.users.aggregate([
{
$match : { userName : {$nin : ["joe", "joeadmin", "Bholbrooks", "Commandalkon", "Lmarthe", "Bzoelle", "cstuart"] }}
},
{
$group:
{
_id: "$userName",
total_logins: {$first: "$totalLogins" }
}
},
{ 
$project : {_id : 0, total_logins:1 }
}
]);


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
