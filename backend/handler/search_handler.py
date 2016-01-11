# -*- coding: utf-8 -*-

__author__ = 'Administrator'

import traceback
from backend.handler.basic_handler import BasicHandler
from backend.utils.search import SearchBasic


class SearchHandler(BasicHandler, SearchBasic):

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



