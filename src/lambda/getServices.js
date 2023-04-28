import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";
import { DynamoDB } from "@aws-sdk/client-dynamodb";

const region = "us-east-1";
const dynamodb = DynamoDBDocument.from(new DynamoDB({ region }));

export const handler = (event, context, callback) => {
  const params = {
    TableName: "Services",
  };

  dynamodb.scan(params, function (err, data) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, data.Items);
    }
  });
};