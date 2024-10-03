export const jwtConfig = () =>({
    jwt: {
        accessKey: process.env.ACCES_TOKEN_SECRET_KEY,
        accessTime: parseInt(process.env.ACCES_TOKEN_EXPIRE_TIME),
        refreshKey: process.env.REFRESH_TOKEN_SECRET_KEY,
        refreshTime: process.env.REFRESH_TOKEN_EXPIRE_TIME,
    }
})