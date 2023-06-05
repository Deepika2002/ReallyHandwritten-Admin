import { createContacts, getContacts } from "../../../../prisma/contact";

export default async function handler(req, res) {
  
  if (req.method === "POST") {
    try {
      const { userId } = req.query;
      const contacts = req.body;
      const createdContacts = await createContacts(contacts,userId);
      res.status(201).json({ createdContacts });

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create contacts" });
    }
  } else if (req.method === "GET") {
    try {
      const { userId } = req.query;
      let contacts = await getContacts(userId);
      res.status(200).json(contacts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch contacts" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}