const Pool = require("pg").Pool;

const poolConfig = process.env.DATABASE_URL
	? {
			connectionString: process.env.DATABASE_URL,
			ssl: {
				rejectUnauthorized: false,
			},
	  }
	: {
			user: "postgres",
			password: "MyPa$$4Dew",
			database: "test_db",
			host: "localhost",
			port: 5433,
	  };

const pool = new Pool(poolConfig);

module.exports = pool;
