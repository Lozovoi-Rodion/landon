const { DynamoDBDocument } = require("@aws-sdk/lib-dynamodb");
const { DynamoDB } = require("@aws-sdk/client-dynamodb");
const fs = require("fs");
const path = require("path");

console.log("Writing entries to MenuLinks table.");

const region = "us-east-1";
const dynamodb = DynamoDBDocument.from(new DynamoDB({ region }));

const menuLinksData = JSON.parse(
  fs.readFileSync(
    path.resolve(__dirname, "../components/data/menu_links.json"),
    "utf8"
  )
);

menuLinksData.forEach(function (menuLink) {
  const params = {
    TableName: "MenuLinks",
    Item: {
      class: menuLink.class,
      href: menuLink.href,
      text: menuLink.text,
    },
  };

  dynamodb.put(params, function (err, data) {
    if (err)
      console.error(
        "Unable to load data into table for menu links",
        menuLink.text,
        ". Error: ",
        JSON.stringify(err, null, 2)
      );
    else console.log("Added", menuLink.text, "to table.");
  });
});
