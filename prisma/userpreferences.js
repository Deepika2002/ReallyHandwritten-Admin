import prisma from "./prisma";

export const createPreferences = async (userpreferences, userId) => {
  try {
    const parsedPreferences = JSON.parse(userpreferences);
    if (!parsedPreferences.welcomeInput || !parsedPreferences.addressClients || !parsedPreferences.endearingTerm || !parsedPreferences.withoutName || !parsedPreferences.selectCard || !parsedPreferences.messageInput) {
      throw new Error('Invalid preferences data');
    }



    // Retrieve existing preferences for the user
    const existingPreferences = await prisma.userpreference.findMany({ where: { userId } });

    // Calculate the next preference number
    const nextPreferenceNumber = existingPreferences.length + 1;

    // Assign the name with the preference number
    const name = `Preference ${nextPreferenceNumber}`;

    const data = { ...parsedPreferences, userId, name };
    console.log("data:", data);

    if (!prisma) {
      throw new Error("Prisma is not initialized");
    }

    const result = await prisma.userpreference.create({ data });
    console.log("result:", result);
    return result;
  } catch (error) {
    console.error("createPreferences error:", error);
    throw error;
  }
};

export const updatePreferences = async (id, data, userId) => {
  try {

    const updatedPreference = await prisma.userpreference.update({
      where: { id: id },
      data: {
        name: data.name,
        welcomeInput: data.welcomeInput ,
        addressClients: data.addressClients ,
        endearingTerm: data.endearingTerm ,
        withoutName: data.withoutName ,
        selectCard: data.selectCard ,
        messageInput: data.messageInput 
      },
    });

    return updatedPreference;
  } catch (error) {
    console.error('updatePreferences error:', error);
    throw error;
  }
};




export const deletePreferences = async (id, session) => {
  try {
    const userId = session?.user?.id;
    if (!userId) {
      throw new Error('User not authenticated');
    }

    const preference = await prisma.userpreference.findUnique({
      where: { id_userId: { id, userId } },
    });
    if (!preference) {
      throw new Error("Preference not found");
    }

    const deletedPreference = await prisma.userpreference.delete({
      where: { id: preference.id },
    });
    return deletedPreference;
  } catch (error) {
    console.error("deletePreferences error:", error);
    throw error;
  }
};

export const getPreferences = async (userId) => {
  try {
    if (!userId) {
      throw new Error('Invalid user ID');
    }

    const preferences = await prisma.userpreference.findMany({
      where: { userId },
    });

    return preferences;
  } catch (error) {
    console.error('getPreferences error:', error);
    throw error;
  }
};

export const getPreferenceById = async (userId, id) => {
  try {
    if (!userId) {
      throw new Error("Invalid user ID");
    }

    const preference = await prisma.userpreference.findUnique({
      where: { id: id },
    });

    return preference;
  } catch (error) {
    console.error("getPreferenceById error:", error);
    throw error;
  }
};
