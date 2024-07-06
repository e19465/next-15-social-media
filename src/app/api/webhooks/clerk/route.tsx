import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { prisma } from "@/lib/client";

export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  // Do something with the payload
  // For this guide, you simply log the payload to the console
  //   const { id } = evt.data;
  // Extract the event type
  const eventType = evt.type;
  const bodyDataJson = JSON.parse(body);
  const bodyData = bodyDataJson.data;

  //! Handle the user.created event
  if (eventType === "user.created") {
    try {
      // Map the user data to the Prisma User model fields
      const newUser = {
        id: evt.data.id,
        username: bodyData.username,
        avatar: bodyData.image_url || "/noAvatar.png",
        cover: "/noCover.png",
        name: bodyData.first_name || "",
        surname: bodyData.last_name || "",
      };

      // Create the user in the database
      await prisma.user.create({
        data: newUser,
      });

      return new Response("User created successfully", { status: 201 });
    } catch (error) {
      console.error("Error occurred while creating user: \n", error);
      return new Response("Failed to create user", { status: 500 });
    }
  }

  //! Handle the user.updated event
  if (eventType === "user.updated") {
    try {
      // Map the user data to the Prisma User model fields
      const newUserData = {
        username: bodyData.username,
        avatar: bodyData.image_url || "/noAvatar.png",
        updatedAt: new Date(bodyData.updated_at),
      };

      // Create the user in the database
      await prisma.user.update({
        where: { id: evt.data.id },
        data: newUserData,
      });

      return new Response("User updated successfully", { status: 200 });
    } catch (error) {
      console.error("Error occurred while updating user: \n", error);
      return new Response("Failed to update user", { status: 500 });
    }
  }

  //! Handle the user.deleted event
  if (eventType === "user.deleted") {
    try {
      // Delete the user from the database
      await prisma.user.delete({
        where: { id: evt.data.id },
      });

      return new Response("User deleted successfully", { status: 204 });
    } catch (error) {
      console.error("Error occurred while deleting user: \n", error);
      return new Response("Failed to delete user", { status: 500 });
    }
  }

  return new Response("", { status: 200 });
}
