import webbrowser
import subprocess
class Actions:
    def open_youtube(self):
        webbrowser.open("https://www.youtube.com")
    def open_facebook(self):
        webbrowser.open("https://web.facebook.com")
    def open_explorer(self):
        subprocess.Popen(r'explorer /select')
    