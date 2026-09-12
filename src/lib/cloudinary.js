import "server-only";
import { v2 as cloudinary } from "cloudinary";

function configureCloudinary() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  const assetFolder = process.env.CLOUDINARY_FOLDER;

  if (!cloudName || !apiKey || !apiSecret || !assetFolder) {
    throw new Error("Cloudinary thumbnail storage is not fully configured.");
  }

  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  });

  return assetFolder;
}

export async function uploadThumbnail(file) {
  const assetFolder = configureCloudinary();
  const fileBuffer = Buffer.from(await file.arrayBuffer());

  const result = await new Promise((resolve, reject) => {
    const upload = cloudinary.uploader.upload_stream(
      {
        resource_type: "image",
        asset_folder: assetFolder,
        allowed_formats: ["jpg", "jpeg", "png", "webp"],
        use_filename: true,
        unique_filename: true,
        overwrite: false,
      },
      (error, uploadResult) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(uploadResult);
      },
    );

    upload.end(fileBuffer);
  });

  return {
    url: result.secure_url,
    publicId: result.public_id,
    width: result.width,
    height: result.height,
    format: result.format,
    bytes: result.bytes,
  };
}

export async function deleteThumbnail(publicId) {
  configureCloudinary();

  const result = await cloudinary.uploader.destroy(publicId, {
    resource_type: "image",
    invalidate: true,
  });

  if (!["ok", "not found"].includes(result.result)) {
    throw new Error(`Cloudinary returned an unexpected result: ${result.result}`);
  }

  return result.result;
}
