__author__ = 'Administrator'

import toolbox.sphinxapi as sphinx


class SearchBasic(object):

    SPHINX_IP = "192.168.1.107"
    SPHINX_PORT = 9312

    def _get_client(self):
        # Ini the sphinx search engine
        client = sphinx.SphinxClient()
        client.SetServer(self.SPHINX_IP, self.SPHINX_PORT)
        client.SetConnectTimeout(3.0)
        client.SetMatchMode(sphinx.SPH_MATCH_EXTENDED2)
        client.SetRankingMode(sphinx.SPH_RANK_NONE)
        return client



