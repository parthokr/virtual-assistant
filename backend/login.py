import json
import mysql.connector
from sys import argv
from passlib.hash import pbkdf2_sha256

def encrypt_password(password):
    return pwd_context.encrypt(password)

def check_encrypted_password(password, hashed):
    return pwd_context.verify(password, hashed)


def test(args):
    res = ""
    for arg in args:
        res += arg
    return res


def login(text_arg):
    res = {}
    mydb = mysql.connector.connect(
        host="localhost",
        user="root",
        password="",
        database="virtual_assistant"
    )
    mycursor = mydb.cursor()
    sql = "SELECT * FROM user_info WHERE username=%s"
    val = (text_arg[1],)
    try:
        mycursor.execute(sql, val)
        result = mycursor.fetchone()
        if(pbkdf2_sha256.verify(text_arg[2], result[3])):
            res["logged_in"] = True
        else:
            res["logged_in"] = False
            res["error"] = "auth_error"
    except:
        res["logged_in"] = False
        res["error"] = "username_not_found"
    return json.dumps(res)


if __name__ == '__main__':
    print(login(argv))
