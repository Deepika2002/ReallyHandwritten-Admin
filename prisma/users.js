import prisma from "./prisma";

export async function getUsersWithContactCount() {
  const users = await prisma.user.findMany({
    include: {
      contacts: true,
    },
    
  });

  const formattedUsers = users.map((user) => ({
    id: user.id,
    name: user.name,
    role: user.role,
    contacts:user.contacts,
    contactCount: user.contacts.length,
  }));

  return formattedUsers;
}
