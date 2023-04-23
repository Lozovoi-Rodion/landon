const { DynamoDBDocument } = require("@aws-sdk/lib-dynamodb");
const { DynamoDB } = require("@aws-sdk/client-dynamodb");
const fs = require("fs");
const path = require("path");

console.log("Writing entries to Services table.");

const region = "us-east-1";
const dynamodb = DynamoDBDocument.from(new DynamoDB({ region }));

const servicesData = JSON.parse(
  fs.readFileSync(
    path.resolve(__dirname, "../components/data/services.json"),
    "utf8"
  )
);

servicesData.forEach(function (service) {
  const params = {
    TableName: "Services",
    Item: {
      name: service.name,
    },
  };

  dynamodb.put(params, function (err, data) {
    if (err)
      console.error(
        "Unable to load data into table for service",
        service.name,
        ". Error: ",
        JSON.stringify(err, null, 2)
      );
    else console.log("Added", service.name, "to table.");
  });
});
