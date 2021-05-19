export const imageUpload = (file) => {
  let err = "";
  if (!file) return (err = "File does not exist");

  if (file.size > 1024 * 1024)
    // 1mb
    err = "File is too large";

  if (
    file.type !== "image/jpeg" &&
    file.type !== "image/png" &&
    file.type !== "image/jpg"
  )
    err = "Image is not correct";
  return err;
};

export const cloudUpload = async (images) => {
  let imgArr = [];
  for (const item of images) {
    const formData = new FormData();
    if (item.camera) {
      formData.append("file", item.camera);
    } else {
      formData.append("file", item);
    }

    formData.append("upload_preset", "b9scl38x");
    formData.append("cloud_name", "dk0z6km58");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dk0z6km58/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await res.json();
    imgArr.push({ public_id: data.public_id, url: data.secure_url });
  }
  return imgArr;
};
