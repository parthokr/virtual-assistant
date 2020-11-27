import socket

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.connect(('127.0.0.1', 1234))
# s.sendall(b'GET / HTTP/1.1\r\n')
while True:
    msg = s.recv(2048)
    print(msg.decode("utf-8"))


