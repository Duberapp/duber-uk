import { customerClient } from '../../config/createClient'

export async function getUser(email: string) {
  const user = await customerClient
    .from('Customers')
    .select('*')
    .eq('email', email);

  return user;
}