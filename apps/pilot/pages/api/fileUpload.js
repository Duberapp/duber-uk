import S3 from "aws-sdk/clients/s3";
import { randomUUID } from "crypto";

const s3 = new S3({
  apiVersion: "2006-03-01",
  accessKeyId: process.env.ACCESS_KEY || "AKIAWMBFXAIQBO6K4OGN",
  secretAccessKey:
    process.env.SECRET_KEY || "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",
  region: process.env.REGION || "us-east-1",
  signatureVersion: "v4",
});
const bucketName = process.env.BUCKET_NAME || "duber-order-assets";

export default async function handler(req, res) {
  try {
    const folderName = req.query.folderName;
    const fileName = req.query.fileName;
    const fileType = req.query.fileType.split(`/`)[0];
    const fileExtention = req.query.fileType.split(`/`)[1];

    // const Key = `${folderName}/${fileName}-${randomUUID()}.${fileExtention}`;
    const Key = `${folderName}/${fileName}`;

    const s3Params = {
      Bucket: bucketName,
      Key,
      Expires: 60 * 60 * 24, // Expires in 1 Day
      ContentType: `${fileType}/${fileExtention}`,
    };
    const uploadUrl = await s3.getSignedUrl("putObject", s3Params);

    res.status(200).json({
      data: {
        uploadUrl,
        key: Key,
        fileName,
      },
      error: null,
    });
  } catch (err) {
    res.status(500).json({
      data: null,
      error: err,
    });
  }
}
