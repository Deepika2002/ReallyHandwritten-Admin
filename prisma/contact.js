import prisma from './prisma';

export const getContacts = async (userId) => {
  try {
    const contacts = await prisma.contact.findMany({
      where: {
        userId,
      },
    });

    const userpreferenceIds = contacts
      .filter((contact) => contact.userpreferenceid !== null) // Filter out contacts without a userpreferenceid
      .map((contact) => contact.userpreferenceid);

    let userpreferences = [];
    if (userpreferenceIds.length > 0) {
      userpreferences = await prisma.userpreference.findMany({
        where: {
          id: {
            in: userpreferenceIds,
          },
        },
      });
    }

    const contactsWithUserPreferences = contacts.map((contact) => {
      const userpreference = userpreferences.find(
        (preference) => preference.id === contact.userpreferenceid
      );
      return {
        ...contact,
        userpreference,
      };
    });

    return contactsWithUserPreferences;
  } catch (error) {
    throw new Error('Failed to fetch contacts');
  }
};


export const createContacts = async (contacts, userId) => {
  console.log("data from prisma",contacts)
  try {
    const data = contacts.map(({ firstname, lastname, phone, email, address, agent }) => ({
      firstname,
      lastname,
      phone,
      email,
      address,
      agent,
      userId: userId
    }));

    const createdContacts = await prisma.contact.createMany({ data });
   

    return createdContacts;
  } catch (error) {
    throw new Error('Failed to create contacts');
  }
};

export const getContactById = async (id, userId) => {
  try {
    const contact = await prisma.contact.findFirst({
      where: {
        id: id,
        userId,
      },
    });

    return contact;
  } catch (error) {
    throw new Error('Failed to fetch contact');
  }
};

export const updateContact = async (contactId, data) => {
  console.log("data",contactId, data)
  const updatedContact = await prisma.contact.update({
    where: { id: contactId },
    data:{
      firstname:data.firstname,
      lastname:data.lastname,
      phone:data.phone,
      email:data.email,
      address:data.address,
      agent:data.agent,
      status:data.status,
      userpreferenceid:data.userpreferenceid
      

    }

  });
  return updatedContact;
};

export const deleteContact = async (contactId) => {
  await prisma.contact.delete({
    where: { id: contactId },
  });
};
