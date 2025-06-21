import os
import subprocess
import gitParser
import shutil
FILE_DIR = os.path.dirname(os.path.abspath(__file__))
PATH = os.path.join(FILE_DIR, "git_data")
TEST_GROUP_URL = "https://github.com/The1Dani/cubes.git"

def get_group_url(group_number: int) -> str:
    return TEST_GROUP_URL

def get_git_data_from_path(group_number: int, path=PATH) -> list[dict[str, any]]:
    cmd = ["git", "clone", get_group_url(group_number), "--bare", path]
    try:
        subprocess.run(cmd, check=True)
    except subprocess.CalledProcessError as e:
        print(f"Error cloning repository: {e}")
        return []
    
    os.chdir(path)
    data = gitParser.get_git_data()
    os.chdir(FILE_DIR)
    shutil.rmtree(PATH)
    
    return data