// api/user/userapi.js

import { hash } from "bcryptjs";
import prisma from "../../../../prisma/prisma";
import mail from "@sendgrid/mail"

mail.setApiKey(process.env.SENDGRID_API_KEY)

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, name, password } = req.body;

    try {
      // Check if email exists
      const emailExist = await prisma.user.findUnique({ where: { email: email } });
      if (emailExist) {
        return res.status(404).json({ message: 'An account with this email already exists' });
      }

      // Hash passwords
      const hashedPassword = await hash(password, 10);
      const SixDigitCode = Math.floor(100000 + Math.random() * 900000);

      const newUser = await prisma.user.create({
        data: {
          email: email,
          name: name,
          password: hashedPassword,
          verificationCode: SixDigitCode,
        },
      });
      const msg = {
        to: email,
        from: "support@leadidentitycheck.com",
        templateId: "d-f71324e971f3400e85aca34f97438bc7",
        dynamicTemplateData: {
          verificationCode: SixDigitCode,
        },
      };
  
      mail
        .send(msg)
        .then(() => {
          console.log(`Email sent to ${email}`);
        })
        .catch((error) => {
          console.error(error);
        });

      res.status(200).json({
        message: "User registration successful",
        user: newUser,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Error registering user",
        error: error,
      });
    }
  } else if (req.method === "PUT") {
    const { name, email, password, image } = req.body;
    console.log("user body", req.body);

    try {
      // Find the user by email
      const user = await prisma.user.findUnique({ where: { email: email } });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Update the user details
      const updatedUser = await prisma.user.update({
        where: { email: email },
        data: {
          name: name || user.name,
          email: email || user.email,
          password: password ? await hash(password, 10) : user.password,
        },
      });

      res.status(200).json({
        message: "User details updated successfully",
        user: updatedUser,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Error updating user details",
        error: error,
      });
    }
  } else {
    res.status(404).json({ message: "HTTP method not supported" });
  }
}






