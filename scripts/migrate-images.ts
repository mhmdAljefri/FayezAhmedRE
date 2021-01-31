import fetch from "node-fetch"
import { S3 } from "aws-sdk"

import prisma from "../db"

const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "ap-south-1",
})

const sharedParams = {
  Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET as string,
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

/**
 *
 * @param url image path in cloud
 * @returns buffer of file or null
 */
async function download(url?: string) {
  if (!url) return null

  const response = await fetch(url)
  const buffer = await response.buffer()
  console.log(url, buffer)

  return buffer
}

async function handleDownloadAndUpload(url) {
  const imageBuffer = await download(url)
  const Key = `${process.env.NEXT_PUBLIC_AWS_FOLDER}/${url.split("/").reverse()[0]}`

  const params = {
    Key,
    ACL: "public-read",
    Body: imageBuffer,
    Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET as string,
  }
  await uploadFile(params)
}

async function uploadImagesToAWS() {
  const projects = await prisma.project.findMany({})
  const offers = await prisma.offer.findMany({})
  const explores = await prisma.explore.findMany({})
  const furnishs = await prisma.furnish.findMany({})
  const furnishCategories = await prisma.furnishCategory.findMany({})
  const features = await prisma.feature.findMany({})
  const partners = await prisma.partner.findMany({})

  try {
    projects.forEach(async (project) => {
      await handleDownloadAndUpload(project.image)
      project.floorplan.forEach(async (floorplan) => await handleDownloadAndUpload(floorplan))
      project.gallery.forEach(async (gallery) => await handleDownloadAndUpload(gallery))
    }) // projects

    offers.forEach(async (offer) => {
      await handleDownloadAndUpload(offer.image)
      offer.gallery.forEach(async (gallery) => await handleDownloadAndUpload(gallery))
    }) // offers

    explores.forEach(async (explore) => {
      await handleDownloadAndUpload(explore.image)
    }) // explores

    furnishs.forEach(async (furnish) => {
      await handleDownloadAndUpload(furnish.image)
    }) // furnishs

    furnishCategories.forEach(async (furnishCategory) => {
      await handleDownloadAndUpload(furnishCategory.image)
    }) // furnishCategories

    features.forEach(async (feature) => {
      await handleDownloadAndUpload(feature.image)
    }) // features

    partners.forEach(async (partner) => {
      await handleDownloadAndUpload(partner.image)
    }) // partners
  } catch (error) {}
}

uploadImagesToAWS()
