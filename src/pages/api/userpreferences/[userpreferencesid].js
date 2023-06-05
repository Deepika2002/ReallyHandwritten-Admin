import { getSession } from "next-auth/react";
import { getPreferenceById, updatePreferences } from "../../../../prisma/userpreferences";

export default async function handler(req, res) {


 
  



  switch (req.method) {
    case "GET":
      try {
        const id = req.query.userpreferencesid
        const userId = req.query.userId
        console.log("getid",id)
 
        const preference = await getPreferenceById(userId, (id));
        console.log(preference)
        res.status(200).json(preference);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
      break;

    case "PUT":
      try {
        const updateId = req.query.userpreferencesid;
        const updatedPreference = await updatePreferences((updateId), req.body);
        console.log(updatedPreference)
        res.status(200).json(updatedPreference);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
      break;

    default:
      res.status(405).json({ message: `Method ${method} Not Allowed` });
  }
}
