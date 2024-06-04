import bcrypt from 'bcrypt';
const saltRounds = 10;

const hashPassword = (password) => {
    return new Promise(resolve => {
        resolve(bcrypt.hashSync(password, saltRounds))
    })
}

export default hashPassword;
