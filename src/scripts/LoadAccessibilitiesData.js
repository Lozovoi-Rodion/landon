const { DynamoDBDocument } = require("@aws-sdk/lib-dynamodb");
const { DynamoDB } = require("@aws-sdk/client-dynamodb");
const fs = require("fs");
const path = require("path");

console.log("Writing entries to Accessibilities table.");

const region = "us-east-1";
const dynamodb = DynamoDBDocument.from(new DynamoDB({ region }));
const accessibilitiesData = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "../components/data/accessibilities.json"), "utf8")
);

accessibilitiesData.forEach(function (accessibililty) {
  const params = {
    TableName: "Accessibilities",
    Item: {
      name: accessibililty.name,
    },
  };

  dynamodb.put(params, function (err, data) {
    if (err)
      console.error(
        "Unable to load data into table for accessibility",
        accessibililty.name,
        ". Error: ",
        JSON.stringify(err, null, 2)
      );
    else console.log("Added", accessibililty.name, "to table.");
  });
});
