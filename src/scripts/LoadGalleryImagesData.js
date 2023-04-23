const { DynamoDBDocument } = require("@aws-sdk/lib-dynamodb");
const { DynamoDB } = require("@aws-sdk/client-dynamodb");
const fs = require("fs");
const path = require("path");

console.log("Writing entries to GalleryImages table.");

const region = "us-east-1";
const dynamodb = DynamoDBDocument.from(new DynamoDB({ region }));

const galleryImagesData = JSON.parse(
  fs.readFileSync(
    path.resolve(__dirname, "../components/data/gallery_images.json"),
    "utf8"
  )
);

galleryImagesData.forEach(function (galleryImage) {
  let className = galleryImage.className;
  if (className.trim() === "") {
    className = "no_class";
  }

  const params = {
    TableName: "GalleryImages",
    Item: {
      src: galleryImage.src,
      alt: galleryImage.alt,
      className: className,
    },
  };

  dynamodb.put(params, function (err, data) {
    if (err)
      console.error(
        "Unable to load data into table for gallery images",
        galleryImage.src,
        ". Error: ",
        JSON.stringify(err, null, 2)
      );
    else console.log("Added", galleryImage.src, "to table.");
  });
});
