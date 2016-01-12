# -*- coding: utf-8 -*-
__author__ = 'Administrator'

import os
import tornado.ioloop
import tornado.web


from backend.handler.index_handler import *
from backend.handler.search_handler import *
from backend.handler.version_handler import *
from backend.config import *


class Application(tornado.web.Application):
    def __init__(self):
        settings = {
            "static_path": APP_ROOT + "/handler/web/assets",
            'template_path':APP_ROOT + "/handler/web/template",
            "cookie_secret": "61oETzKXQAGaYdkL5gEmGeJJFuYh7EQnp2XdTP1o/Vo=",
            "login_url": "/login",
            "xsrf_cookies": True,
        }
        handlers = [
            (r"/", IndexHandler),
            (r"/api/comments",SearchHandler ),
            (r"/search", SearchRenderHandler),
            (r"/version", VersionHandler),
            (r"/assets/(.*)", tornado.web.StaticFileHandler, dict(path=settings['static_path'])),
        ]
        tornado.web.Application.__init__(self, handlers)


def main():
    # Add a file handler here
    application = Application()
    application.listen(8888)
    tornado.ioloop.IOLoop.instance().start()


if __name__ == "__main__":
    main()