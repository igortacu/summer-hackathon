import sqlite3
conn = sqlite3.connect('my_database.db')
cursor = conn.cursor()
cursor.execute('''
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        "group" TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        role TEXT NOT NULL,
        password TEXT NOT NULL
    )
''')
conn.commit()
def sign_in(name, group, email, role, password):
    cursor.execute("SELECT * FROM users WHERE email = ?", (email,))
    user = cursor.fetchone()

    if user:
        print(f"User with email '{email}' already exists.")
    else:
        cursor.execute('''
            INSERT INTO users (name, "group", email, role, password)
            VALUES (?, ?, ?, ?, ?)
        ''', (name, group, email, role, password))
        conn.commit()
        print(f"User '{name}' signed in and added to database.")

conn.close()
