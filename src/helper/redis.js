import redis from "redis";
const client = await redis.createClient(process.env.REDIS_URL)


client.on("error", function (error) {
    console.log(error);
}).connect();

export const setJWT = async (key, value) => {
    return new Promise((resolve, reject) => {
        try {
            return client.set(key, value, (err, res) => {
                if (err) reject(err);
                resolve(res);
            });
        } catch (error) {
            reject(error);
        }
    });
}
export const getJWT = (key, value) => {
    return new Promise((resolve, reject) => {
        try {
            return client.get(key, value, (err, res) => {
                if (err) reject(err);
                resolve(res);
            });
        } catch (error) {
            reject(error);
        }
    });
}

export const deleteJWT = (key) => {
    try {
        client.del(key);
    }
    catch (error) {
        console.log(error)
    };
}
