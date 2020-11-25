import os
import webbrowser
import subprocess
from . import gmail
class Actions:
    """
        This class contains methods(non-callback) which is executed
        right after being imported via commands.py
        
        * no callback return

    """
    def open_youtube(self):
        webbrowser.open("https://www.youtube.com")
    def open_facebook(self):
        webbrowser.open("https://web.facebook.com")
    def open_explorer(self):
        subprocess.Popen(r'explorer /select')
    def open_chrome(self):
        os.system("start chrome")
    def open_github(self):
        webbrowser.open("https://github.com/")

    