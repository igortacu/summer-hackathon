import sqlite3


class User:
    def __init__(
        self,
        name,
        academic_group,
        pbl_group_number,
        email,
        role,
        password,
        project_name,
        github_url,
    ):
        self.name = name
        self.academic_group = academic_group
        self.pbl_group_number = pbl_group_number
        self.email = email
        self.role = role
        self.password = password
        self.project_name = project_name
        self.github_url = github_url

    def __iter__(self):
        for key in self.__dict__:
            yield key, getattr(self, key)


class Task:
    def __init__(
        self,
        id,
        title,
        description,
        assigned_to,
        status,
        priority,
        due_date,
    ):
        self.id = id
        self.title = title
        self.description = description
        self.assigned_to = assigned_to
        self.status = status
        self.priority = priority
        self.due_date = due_date

    def __iter__(self):
        for key in self.__dict__:
            yield key, getattr(self, key)


# 1. Connect to the existing database (or create it if missing)
conn = sqlite3.connect("my_database.db")
cursor = conn.cursor()

# 2. (Development only) Drop the old users table if it exists
#    Comment out the next line if you want to preserve existing data.
# cursor.execute("DROP TABLE IF EXISTS users")

# 3. Create the users table with the correct schema, including github_url
cursor.execute(
    """
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
"""
)

cursor.execute( """
    CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        assigned_to TEXT NOT NULL,
        status TEXT NOT NULL,
        priority TEXT NOT NULL,
        due_date DATE NOT NULL,
        hash TEXT NOT NULL UNIQUE
    )
    """
)

conn.commit()


# 4. sign_in remains unchanged
def sign_in(user: User):
    # Check if a user with the same email already exists
    cursor.execute("SELECT 1 FROM users WHERE email = ?", (user.email,))
    if cursor.fetchone():
        print(f"User with email '{user.email}' already exists.")
        return

    # Check if that role is already taken
    cursor.execute("SELECT 1 FROM users WHERE role = ?", (user.role,))
    if cursor.fetchone():
        print(f"The role '{user.role}' is already taken. Please select another role.")
        return

    # Insert the new user (github_url will default to NULL)
    cursor.execute(
        """
        INSERT INTO users (
            name,
            "Academic group",
            "PBL group number",
            email,
            role,
            password,
            "Project name",
            github_url
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    """,
        (
            user.name,
            user.academic_group,
            user.pbl_group_number,
            user.email,
            user.role,
            user.password,
            user.project_name,
            user.github_url,
        ),
    )
    conn.commit()
    print(f"User '{user.name}' signed in and added to database.")


def log_in(email: str, password: str):
    """
    Checks if the user with the given email and password exists in the database.
    """
    cursor.execute(
        "SELECT 1 FROM users WHERE email = ? AND password = ?", (email, password)
    )
    user = cursor.fetchone()
    return user


# 5. New helper: fetch all GitHub URLs for a given PBL group number
def get_github_urls_by_pbl_group(pbl_group_number):
    """
    Returns a list of all non-null GitHub URLs for users in the specified PBL group.
    """
    cursor.execute(
        'SELECT github_url FROM users WHERE "PBL group number" = ? AND github_url IS NOT NULL',
        (pbl_group_number,),
    )
    return [row[0] for row in cursor.fetchall()]


def new_task(task: Task):
    """
    Adds a new task to the tasks table.
    """
    cursor.execute(
        """
        INSERT INTO tasks (
            title,
            description,
            assigned_to,
            status,
            priority,
            due_date,
            hash
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
        """,
        (
            task.title,
            task.description,
            task.assigned_to,
            task.status,
            task.priority,
            task.due_date,
            hash(
                task.title
                + task.description
                + task.assigned_to
                + task.status
                + task.priority
            ),
        ),
    )
    conn.commit()


def get_tasks():
    """
    Returns a list of tasks assigned to the user with the given id.
    """
    cursor.execute("SELECT * FROM tasks")
    return [Task(*row) for row in cursor.fetchall()]


# 6. Example usage: fetch GitHub links for your existing PBL group
if __name__ == "main":

    pbl_group_number = input("Enter the PBL group number: ")
    links = get_github_urls_by_pbl_group(pbl_group_number)
    print(f"GitHub URLs for PBL group {pbl_group_number}: {links}")

    conn.close()
1


def init_convo_db():

    conn = sqlite3.connect("bublik_convo.db")
    c = conn.cursor()

    c.execute(
        """
        CREATE TABLE IF NOT EXISTS convo (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            role TEXT NOT NULL,
            content TEXT NOT NULL,
            ts DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    """
    )

    conn.commit()

    conn.close()
