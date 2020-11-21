from .actions import Actions
class Commands:
    def __init__(self):
        self.commands = {
                "open youtube": ["Opening youtube...", Actions.open_youtube],
                "open explorer": ["Opening explorer...", Actions.open_explorer],
                "open facebook": ["Opening facebook...", Actions.open_facebook]
            }
    def get_commands(self):
        return self.commands