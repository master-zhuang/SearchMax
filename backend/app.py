__author__ = 'Administrator'

import tornado.ioloop
import tornado.web


from backend.handler.index_handler import *
from backend.handler.search_handler import *
from backend.handler.version_handler import *


class Application(tornado.web.Application):
    def __init__(self):
        handlers = [
            (r"/", IndexHandler),
            (r"/search", SearchHandler),
            (r"/version", VersionHandler)
        ]
        tornado.web.Application.__init__(self, handlers)


def main():
    # Add a file handler here
    application = Application()
    application.listen(8888)
    tornado.ioloop.IOLoop.instance().start()


if __name__ == "__main__":
    main()