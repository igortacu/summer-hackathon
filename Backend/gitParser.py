import subprocess
# import os

"""
{
    hash:
    message:
    files:
    author:
    email:
    date:
}
"""

""" Format
# commit <hash> #! [-1]
# <Merge: <hash1> <hash2>> 
# Author: <author> <\<email\>> [0]
# AuthorDate: <date> [1]
# Commit: <author> <\<email\>> #! [2]
# CommitDate: <date> #! [3]

#     <message>

# <file1> | <insertions> +<deletions> -<changes>
# <file2> | <insertions> +<deletions> -<changes>
# ...
# <number of files changed> files changed, <insertions> insertions(+), <deletions> deletions(-)
"""
# TODO: Add the last line to the parsing

def get_commits(out: str) -> dict[str, list[str]]:

    recent_hash = ""

    tps: dict[str, list[str]] = {}

    l: list[str] = list(out[:].decode().split("\n"))

    for s in l:
        if s.startswith("commit"):
            commit_hash = s.split(" ")[1]
            tps[commit_hash] = []
            recent_hash = commit_hash
        elif s != "" and not s.startswith("Merge"):
            tps[recent_hash].append(s)
    return tps


def parse_commit(commits: dict[str, list[str]]) -> list[dict[str, any]]:
    """
    - Commit: <author> <\<email\>> #! [2]
    - CommitDate: <date> #! [3]
    """
    out = []
    for hash, lines in commits.items():
        o = {}
        author_line = list(filter(lambda x: x != "", lines[2].split(" ")))
        date_line = list(filter(lambda x: x != "", lines[3].split(" ")))
        o["hash"] = hash
        o["message"] = lines[4].strip()
        o["files"] = lines[5:]

        o["author"] = " ".join(author_line[1:-1]).strip()
        o["email"] = author_line[-1].strip().replace("<", "").replace(">", "")
        o["date"] = " ".join(date_line[1:])
        o["footer"] = lines[-1].strip()
        out.append(o)
    return out


def get_git_data() -> list[dict[str, any]]:
    """
    Returns a dictionary with the git data.
    """
    # git log --stat --pretty=fuller
    cmd = ["git", "log", "--stat", "--pretty=fuller"]

    # path = "/home/dani/faf/faf_bot_go"
    # os.chdir(path)

    res = subprocess.check_output(cmd)

    out = get_commits(res)
    return parse_commit(out)
