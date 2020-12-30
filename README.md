# Virtual-Assistant
![Virtual-Assistant](https://lh3.googleusercontent.com/uZWelzVD7fkFW5Fsac9YsWy6OFmpeXaawNvqsbPyf7A-geW8f2FEIjR_OhvVasHy1d8KXvbzsq-FLbatv6aqTsLqpIP7EmBbpHB5X99m31B55nLb0q5YvdCaaGv1PHUvZ3650mFiDi4=w2400?source=screenshot.guru)
![Virtual-Assistant](https://i.ibb.co/9tw061S/virtual-assistant.gif)
---
### This repo contains simple virtual assistant app built with
* Node.js for frontend and few api calling
* Python for backend 
    * Speech recognition and running commands background through client server socket
    * API handling for executing commands
---
## How to get this app up and running?
> Make sure you have [Python](https://www.python.org/downloads/) and [Node.js](https://nodejs.org/en/download/) installed onto your system
* Open up terminal at your desired directory
* Enter the following commands sequentially and hit enter

    `git clone -b production https://github.com/ParthoKR/virtual-assistant.git` 

    `cd virtual-assistant`

    `pip install -r backend/requirements.txt`

    `npm install`

    `npm start`

* Bingo! You have successfully set this app up!
* Start exploring

## Available commands

| Command                   |                     Description                         |
| --------------------------|:-------------------------------------------------------:|
| ``open explorer``         |               Open file explorer                        |
| ``open chrome``           |      Open chrome if installed on your system            |
| ``open youtube``          |      Open youtube with your default browser             |
| ``open facebook``         |       Open facebook with your default browser           |
| ``open github``           |       Open github with your default browser             |
| ``messages``              |       Get last 5 messages from gmail                    |
| ``my ip`` or ``ip``       |       Get your public ipv4 address                      |
| ``covid update``          |       Get latest covid update for your locale           |
| ``covid update global``   |       Get latest global covid update                    |
| ``my class``              |       Get your class information from google classroom  |
| ``class update``          |    Get latest class announcements from google classroom |
| ``weather``               |   Get latest weather info for your locale               |

