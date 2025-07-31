import * as bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

const hashValue = (value: string) => bcrypt.hash(value, SALT_ROUNDS);

const compareHash = (value: string | Buffer, hash: string) =>
  bcrypt.compare(value, hash);

export { hashValue, compareHash };
