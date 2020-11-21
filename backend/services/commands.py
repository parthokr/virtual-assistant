from .actions import Actions
class Commands:
    def __init__(self):
        self.commands = {
                "open youtube": ["Opening youtube...", Actions.open_youtube, -1],
                "open explorer": ["Opening explorer...", Actions.open_explorer, -1],
                "open facebook": ["Opening facebook...", Actions.open_facebook, -1],
                "recent unread messages": ["Checking messages...", lambda x: None, 0]
            }
    def get_commands(self):
        return self.commands