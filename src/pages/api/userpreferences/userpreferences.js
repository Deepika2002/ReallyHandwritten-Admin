import { getSession } from "next-auth/react";
import prisma, { createPreferences, getPreferences, updatePreferences } from "../../../../prisma/userpreferences";

export default async function handler(req, res) {

  const { method, body } = req;

  const { userId } = req.query;
  console.log(req.query)

  switch (method) {
    case "POST":
      try {
        
        console.log("body:", body);
        const preferences = await createPreferences(body, userId);
        
        res.status(201).json(preferences);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
      }
      break;

    case "GET":
      try {
        const preferences = await getPreferences(userId);
        res.status(200).json(preferences);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
      break;

    case "PUT":
      try {
  
        console.log(req.query)
        const preferences = await updatePreferences((updateId), body);
        res.status(200).json(preferences);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
      break;

    default:
      res.status(405).json({ message: `Method ${method} Not Allowed` });
  }
};
