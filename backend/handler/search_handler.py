# -*- coding: utf-8 -*-

__author__ = 'Administrator'

import traceback,json
from backend.handler.basic_handler import BasicHandler
from backend.utils.search import SearchBasic


class SearchSphinxHandler(BasicHandler, SearchBasic):

    def get(self):
        client = self._get_client()

        QUERY = "test"

        try:
            query_str = self.get_argument("query_str")
            print(query_str)
            result = client.Query(query_str.encode('utf-8'), '*')
            print(result)
            self.write(str(result))
        except Exception as e:
            print(traceback.format_exc())
        finally:
            client.Close()


class SearchHandler(BasicHandler):

    def get(self):
        start_page = self.get_argument("start_page")
        results = [{"title": "Java Engineer"+str(start_page), "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ut orci urna. Morbi blandit enim eget risus posuere dapibus. Vestibulum velit nisi, tempus in placerat non, auctor eu purus. Morbi suscipit porta libero, ac tempus tellus consectetur non. Praesent eget consectetur nunc. Aliquam erat volutpat. Suspendisse ultrices eros eros, consectetur facilisis urna posuere id."},\
                   {"title": "Web Design - 1 - Introduction to Web Design", "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ut orci urna. Morbi blandit enim eget risus posuere dapibus. Vestibulum velit nisi, tempus in placerat non, auctor eu purus. Morbi suscipit porta libero, ac tempus tellus consectetur non. Praesent eget consectetur nunc. Aliquam erat volutpat. Suspendisse ultrices eros eros, consectetur facilisis urna posuere id."},\
                   {"title": "Web Design - Website Design Tutorials, Articles", "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
                   ]
        self.write(json.dumps(results))


class SearchRenderHandler(BasicHandler):

    def get(self):
        self.render("web/search_result.html")


