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
        results = [{"text": "Hey there!", "id": 1388534400000,}, {"text": "React is *great*!", "id": 1420070400000}]
        self.write(json.dumps(results))


class SearchRenderHandler(BasicHandler):

    def get(self):
        self.render("web/search_result.html")


