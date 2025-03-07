import supabase, { supabaseUrl } from "./supabase";

// Get all Cabin data from Supabase or API
export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

// Create new Cabin
export async function createCabin(newCabin) {
  // https://letfztzukipascnffqsm.supabase.co/storage/v1/object/public/cabin-images//cabin-001.jpg

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. Create cabin
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be created");
  }

  // 2. Upload Image

  const { error: storageErr } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 3. Delete the cabin if there was an error uploading image
  if (storageErr) {
    await supabase.from("cabins").delete().eq("id", data.id);

    console.error(storageErr);
    throw new Error(
      "Cabin Image could not be uploaded, and cabin was not created"
    );
  }

  return data;
}

// Update cabin data and cabin image
export async function updateCabin(newCabin, id) {
  // https://letfztzukipascnffqsm.supabase.co/storage/v1/object/public/cabin-images//cabin-001.jpg

  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. Edit cabin
  const { data, error } = await supabase
    .from("cabins")
    .update({ ...newCabin, image: imagePath })
    .eq("id", id)
    .select();

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be created");
  }

  // 2. Edit Image
  const { error: storageErr } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 3. Delete the cabin if there was an error uploading image
  if (storageErr) {
    await supabase.from("cabins").delete().eq("id", data.id);

    console.error(storageErr);
    throw new Error(
      "Cabin Image could not be uploaded, and cabin was not created"
    );
  }

  return data;
}

// Delete Cabin
export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be deleted");
  }
}
