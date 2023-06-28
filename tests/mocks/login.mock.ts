import bcrypt from 'bcryptjs';

const SALT_ROUNDS = process.env.BCRYPT_SALT_ROUNDS || 10;

const validUsername = 'superuser';
const validPassword = 'superpassword';
const noUsernameLoginBody = { username: '', password: validPassword };
const noPasswordLoginBody = { username: validUsername, password: '' };
const notExistingUserBody = { username: 'usernotfound', password: validPassword };
const existingUserWithWrongPasswordBody = { username: validUsername, password: 'wrongpassword' };
const validLoginBody = { username: validUsername, password: validPassword };
const existingUser = {
  id: 1,
  username: validUsername,
  vocation: 'warrior',
  level: 24,
  password: bcrypt.hashSync(validPassword, SALT_ROUNDS),
};
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJIYWdhciIsImlhdCI6MTY4Njc1NDc1Nn0.jqAuJkcLp0RuvrOd4xKxtj_lm3Z3-73gQQ9IVmwE5gA";

export default {
  noUsernameLoginBody,
  noPasswordLoginBody,
  notExistingUserBody,
  existingUserWithWrongPasswordBody,
  validLoginBody,
  existingUser,
  token,
};