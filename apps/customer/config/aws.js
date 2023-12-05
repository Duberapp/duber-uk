import __AWS from "aws-sdk";

__AWS.config.update({
  accessKeyId: "AKIAWMBFXAIQBO6K4OGN",
  secretAccessKey: "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",
  region: "us-east-1",
});

export const s3 = new __AWS.S3();
