import json
import mysql.connector
from sys import argv
from passlib.hash import pbkdf2_sha256


def signup(text_arg):
    res = {}
    mydb = mysql.connector.connect(
        host="localhost",
        user="root",
        password="",
        database="virtual_assistant"
    )
    mycursor = mydb.cursor()
    sql = "INSERT INTO user_info (username, email, password) VALUES (%s, %s, %s)"
    val = (text_arg[1], text_arg[2], pbkdf2_sha256.hash(text_arg[3]))
    try:
        mycursor.execute(sql, val)
        mydb.commit()
        res["signed_up"] = True
    except:
        res["signed_up"] = False
    return json.dumps(res)


if __name__ == '__main__':
    print(signup(argv))
