from __future__ import print_function
import pickle
import os.path
from os import getcwd
from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request

class ClassRoom:
    # If modifying these scopes, delete the file token.pickle.
    def class_list(self):
        self.SCOPES = [
            'https://www.googleapis.com/auth/classroom.courses.readonly',
            'https://www.googleapis.com/auth/classroom.announcements.readonly'
        ]
        """Shows basic usage of the Classroom API.
        Prints the names of the first 10 courses the user has access to.
        """
        creds = None
        # The file token.pickle stores the user's access and refresh tokens, and is
        # created automatically when the authorization flow completes for the first
        # time.

        # add \\backend in production
        if os.path.exists(getcwd()+'\\backend\\services\\token\\token2.pickle'):
            with open(getcwd()+'\\backend\\services\\token\\token2.pickle', 'rb') as token:
                creds = pickle.load(token)
        # If there are no (valid) credentials available, let the user log in.
        if not creds or not creds.valid:
            if creds and creds.expired and creds.refresh_token:
                creds.refresh(Request())
            else:
                flow = InstalledAppFlow.from_client_secrets_file(
                    getcwd()+'\\backend\\services\\credentials\\credentials2.json', self.SCOPES)
                creds = flow.run_local_server(port=0)
            # Save the credentials for the next run
            with open(getcwd()+'\\backend\\services\\token\\token2.pickle', 'wb') as token:
                pickle.dump(creds, token)

        service = build('classroom', 'v1', credentials=creds)

        # Call the Classroom API
        results = service.courses().list(pageSize=10).execute()
        courses = results.get('courses', [])
        return courses
    
    def announcement_list(self):
        self.SCOPES = [
            'https://www.googleapis.com/auth/classroom.courses.readonly',
            'https://www.googleapis.com/auth/classroom.announcements.readonly'

        ]
        """Shows basic usage of the Classroom API.
        Prints the names of the first 10 courses the user has access to.
        """
        creds = None
        # The file token.pickle stores the user's access and refresh tokens, and is
        # created automatically when the authorization flow completes for the first
        # time.
        if os.path.exists(getcwd()+'\\backend\\services\\token\\token2.pickle'):
            with open(getcwd()+'\\backend\\services\\token\\token2.pickle', 'rb') as token:
                creds = pickle.load(token)
        # If there are no (valid) credentials available, let the user log in.
        if not creds or not creds.valid:
            if creds and creds.expired and creds.refresh_token:
                creds.refresh(Request())
            else:
                flow = InstalledAppFlow.from_client_secrets_file(
                    getcwd()+'\\backend\\services\\credentials\\credentials2.json', self.SCOPES)
                creds = flow.run_local_server(port=0)
            # Save the credentials for the next run
            with open(getcwd()+'\\backend\\services\\token\\token2.pickle', 'wb') as token:
                pickle.dump(creds, token)

        service = build('classroom', 'v1', credentials=creds)

        # Call the Classroom API
        results = service.courses().list(pageSize=10).execute()
        courses = results.get('courses', [])
        # print(courses)
        announcements = []
        for course in courses:
            course_name = course["name"]
            try: 
                course_ann = service.courses().announcements().list(courseId=course["id"], pageSize=1).execute().get("announcements")
                course_ann = course_ann[0]["text"]
            except:
                course_ann = None
            finally:
                announcements.append({"name": course_name, "announcement": course_ann})
        return announcements