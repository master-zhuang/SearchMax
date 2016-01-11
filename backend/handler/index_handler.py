# -*- coding: utf-8 -*-
__author__ = 'Administrator'


from backend.handler.basic_handler import *


class IndexHandler(BasicHandler):

    def get(self):
        self.render("web/search_result.html")