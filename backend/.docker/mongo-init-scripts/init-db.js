db = db.getSiblingDB("humanstreetdb");
db.createUser({
  user: "humanstreet",
  pwd: "humanstreet",
  roles: [{ role: "readWrite", db: "humanstreetdb" }],
});