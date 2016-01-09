__author__ = 'Administrator'


from backend.handler.basic_handler import *


class VersionHandler(BasicHandler):

    def get(self):
        self.write("SearchMax version v1.0.0")




