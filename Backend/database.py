import sqlite3

# Connect to the existing database (or create it if missing)
conn = sqlite3.connect('my_database.db')
cursor = conn.cursor()

# 1. Drop the old users table if it exists (development only)
#    Comment out the next line if you want to preserve existing data.
cursor.execute('DROP TABLE IF EXISTS users')

# 2. Create the users table with the correct schema
cursor.execute('''
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        "Academic group" TEXT NOT NULL,
        "PBL group number" TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        role TEXT NOT NULL,
        password TEXT NOT NULL,
        "Project name" TEXT NOT NULL
    )
''')
conn.commit()

# 3. Define the sign_in function

def sign_in(name, academic_group, pbl_group_number, email, role, password, project_name):
    # Check if a user with the same email already exists
    cursor.execute("SELECT * FROM users WHERE email = ?", (email,))
    if cursor.fetchone():
        print(f"User with email '{email}' already exists.")
        return

    # Check if that role is already taken
    cursor.execute("SELECT * FROM users WHERE role = ?", (role,))
    if cursor.fetchone():
        print(f"The role '{role}' is already taken. Please select another role.")
        return

    # Insert the new user
    cursor.execute('''
        INSERT INTO users (
            name,
            "Academic group",
            "PBL group number",
            email,
            role,
            password,
            "Project name"
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
    ''', (name, academic_group, pbl_group_number, email, role, password, project_name))
    conn.commit()
    print(f"User '{name}' signed in and added to database.")


# 4. Example usage
if __name__ == "__main__":
    # Replace with your own test data or call this function dynamically
    sign_in(
        'Ina Pancenco',
        'FAF-242',
        '1',
        'ina.pancenco@isa.utm.md',
        'Backend Developer',
        '12345678',
        'Earthquake'
    )

    # Close the connection when done
    conn.close()
