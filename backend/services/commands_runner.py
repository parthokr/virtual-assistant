from .commands import Commands
class CommandRunner:
    def __init__(self, cmd):
        self.commands = Commands().get_commands()
        self.command = self.commands.get(cmd,[])
    def getAssistantReply(self):
        return "not_found" if len(self.command)==0 else self.command[0]

    def getCallBackId(self):
        return self.command[2]

    def run(self):
        if(len(self.command)>0):
            self.command[1](self)