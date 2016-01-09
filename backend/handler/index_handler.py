__author__ = 'Administrator'


from backend.handler.basic_handler import *


class IndexHandler(BasicHandler):

    def get(self):
        self.write("This is the home page!")