const bcrypt = require('bcrypt')

const hashPassword = async(pw) =>{
    const salt = await bcrypt.genSalt(12)
    const hash = await bcrypt.hash(pw, salt)
    console.log(salt)
    console.log(hash)
}

const anotherWayHashPassword = async(pw) =>{
    const hash = await bcrypt.hash(pw, 12)
    console.log(hash)
}

const login = async (pw, hashedPw) =>{
    const result = await bcrypt.compare(pw, hashedPw)
    if(result){
        console.log('Welcome back!')
    }else{
        console.log('Wrong password!')
    }
}

// hashPassword('password')
// login('password', '$2b$10$OjCvR6GL3hgpcQUHxMc9Lebkg8vThyXH0IEGqpr.auyYKWdQFsS3W')
// anotherWayHashPassword('1234')
// login('1234', '$2b$12$6gPjrpAaCAmkVv7qlMDu6OutMKyGd6VokKe63cRXech4vXbf/cNQC')
// login('122334', '$2b$12$6gPjrpAaCAmkVv7qlMDu6OutMKyGd6VokKe63cRXech4vXbf/cNQC')