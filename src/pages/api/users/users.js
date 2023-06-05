import { getSession } from 'next-auth/react';
import { getUsersWithContactCount } from '../../../../prisma/users';

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session || session.user.role !== 'ADMIN') {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  if (req.method === 'GET') {
    try {
      const users = await getUsersWithContactCount();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch users' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
