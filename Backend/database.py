import sqlite3

# 1. Connect to the existing database (or create it if missing)
conn = sqlite3.connect('my_database.db')
cursor = conn.cursor()

# 2. (Development only) Drop the old users table if it exists
#    Comment out the next line if you want to preserve existing data.
cursor.execute('DROP TABLE IF EXISTS users')

# 3. Create the users table with the correct schema, including github_url
cursor.execute('''
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        "Academic group" TEXT NOT NULL,
        "PBL group number" TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        role TEXT NOT NULL,
        password TEXT NOT NULL,
        "Project name" TEXT NOT NULL,
        github_url TEXT          -- new column for GitHub URL
    )
''')
conn.commit()

# 4. sign_in remains unchanged
def sign_in(name, academic_group, pbl_group_number, email, role, password, project_name):
    # Check if a user with the same email already exists
    cursor.execute("SELECT 1 FROM users WHERE email = ?", (email,))
    if cursor.fetchone():
        print(f"User with email '{email}' already exists.")
        return

    # Check if that role is already taken
    cursor.execute("SELECT 1 FROM users WHERE role = ?", (role,))
    if cursor.fetchone():
        print(f"The role '{role}' is already taken. Please select another role.")
        return

    # Insert the new user (github_url will default to NULL)
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

# 5. New helper: fetch all GitHub URLs for a given PBL group number
def get_github_urls_by_pbl_group(pbl_group_number):
    """
    Returns a list of all non-null GitHub URLs for users in the specified PBL group.
    """
    cursor.execute(
        'SELECT github_url FROM users WHERE "PBL group number" = ? AND github_url IS NOT NULL',
        (pbl_group_number,)
    )
    return [row[0] for row in cursor.fetchall()]

# 6. Example usage: fetch GitHub links for your existing PBL group
if __name__ == "main":
   
    pbl_group_number = input("Enter the PBL group number: ")
    links = get_github_urls_by_pbl_group(pbl_group_number)
    print(f"GitHub URLs for PBL group {pbl_group_number}: {links}")

    conn.close()