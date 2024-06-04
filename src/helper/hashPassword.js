import bcrypt from 'bcrypt';
const saltRounds = 10;

export const hashPassword = (password) => {
    return new Promise(resolve => {
        resolve(bcrypt.hashSync(password, saltRounds))
    })
}
export const comparepassword = (mainPass, passfromDb) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(mainPass, passfromDb, function (err, result) {
            // result == true
            if (err) reject(err)
            resolve(result)
        });
    })

}

// export default hashPassword;
