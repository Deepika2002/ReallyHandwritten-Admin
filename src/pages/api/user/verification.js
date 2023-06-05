
import prisma from '../../../../prisma/prisma'

// Register

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email } = req.body; // Assuming the user ID is sent in the request body
    console.log("verification api",req.body);

    try {
      const user = await prisma.user.findUnique({ where: { email: email} });

      if (user.emailVerified) {
        return res.json({
          message: "Email already verified",
        });
      }

      await prisma.user.update({
        where: { email: email },
        data: {
          emailVerified: true,
        },
      });

      res.status(200).json({
        message: "Email verified",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Error verifying email",
        error: error,
      });
    }
  } else {
    res.status(405).json({
      message: "Method not allowed",
    });
  }
}

  