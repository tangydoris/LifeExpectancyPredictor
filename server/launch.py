__author__ = 'rcj1492'
__created__ = '2015.10'

import os
import sys
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

from server.routes import *

# change werkzeug request handler protocol to enable keep-alive connection
# from werkzeug.serving import WSGIRequestHandler
# WSGIRequestHandler.protocol_version = "HTTP/1.1"

# create keyword argument definitions
config_args = {
    'host': '0.0.0.0',
    'port': 5000
}

# initialize the server
if __name__ == '__main__':
    app.run(**config_args)
