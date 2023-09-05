import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
    user: 'bastianpoloni',
    password: '',
    database: 'gemas_preciosas',
});

pool.connect();

async function close () {
    await pool.close(); 
}

export { pool };