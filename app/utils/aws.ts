import { S3 } from "aws-sdk"

const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "ap-south-1",
})

const sharedParams = {
  Bucket: process.env.AWS_BUCKET as string,
}

export const uploadFile = async (params) => {
  return await s3
    .putObject({ ...sharedParams, ...params }, function (err, data) {
      if (err) {
        console.log(err)
      } else {
        console.log("Successfully uploaded data to " + sharedParams.Bucket + "/", data)
        return data
      }
    })
    .promise()
}

export const listS3Objects = async (params) => {
  return await s3
    .listObjectsV2({ ...sharedParams, ...params }, function (err, data) {
      if (err) {
        console.log(err)
      } else {
        console.log("Successfully uploaded data to " + sharedParams.Bucket + "/", data)
        return data
      }
    })
    .promise()
}

export function makeS3Url(src?: string) {
  const imageName = src?.split("/").reverse()[0]
  const awsSrc = `https://fayezahmed.s3.ap-south-1.amazonaws.com/fayez/${imageName}`
  return awsSrc
}
