module.exports = {
    development: {
        username: "sa",
        password: "300304Cuba",
        database: "helios",
        host: "localhost",
        dialect: "mssql",
        dialectOptions: {
            options: { encrypt: false } // Nếu có lỗi SSL
        }
    }
};
