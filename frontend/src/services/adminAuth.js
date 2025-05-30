export const loginAdmin = async (credentials) => {
  try {
    const adminCredentials = {
      email: 'admin@space.com',
      password: 'admin123',
    };

    if (credentials.email !== adminCredentials.email || credentials.password !== adminCredentials.password) {
      throw new Error('Invalid credentials');
    }

    return {
      token: 'fake-admin-token',
      email: credentials.email,
      role: 'admin'
    };
  } catch (error) {
    throw error;
  }
};
