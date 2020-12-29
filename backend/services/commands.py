from .actions import Actions
class Commands:
    """
        This call contains a dictionary of commands 
        which is looked for when a specific command is detected
        and then corresponding action is executed from actions.py

        if any command is queried which relates a non action method, i.e callback > -1
        then run_callback.py is executed from root backend package
    """
    def __init__(self):
        self.commands = {
                "open youtube": ["Opening youtube...", Actions.open_youtube, -1],
                "open explorer": ["Opening explorer...", Actions.open_explorer, -1],
                "open facebook": ["Opening facebook...", Actions.open_facebook, -1],
                "open chrome": ["Opening chrome...", Actions.open_chrome, -1],
                "open github": ["Opening github...", Actions.open_github, -1],

                "messages": ["Checking messages...", lambda x: None, 0],

                "my ip": ["Getting your ip...", lambda x: None, 1],
                "ip": ["Getting your ip...", lambda x: None, 1],


                "covid update": ["Getting covid update...", lambda x: None, 2],
                "covid": ["Getting covid update...", lambda x: None, 2],

                "covid update global": ["Getting covid update...", lambda x: None, 3],
                "covid global update": ["Getting covid update...", lambda x: None, 3],

                "my class": ["Getting your classroom info...", lambda x: None, 4],
                "class update": ["Getting class updates...", lambda x: None, 5],
                "class updates": ["Getting class updates...", lambda x: None, 5],

                "weather": ["Getting your weather info...", lambda x: None, 6],
                "weather update": ["Getting your weather info...", lambda x: None, 6],



            }
    def get_commands(self):
        return self.commands