__author__ = 'rcj1492'
__created__ = '2015.10'

'''
flask documentation:
http://flask.pocoo.org/docs/0.10/api/

flask restful module documentation:
https://flask-restful.readthedocs.org/en/latest/

client frameworks:
http://jinja.pocoo.org/
https://pypi.python.org/pypi/Genshi/
https://pypi.python.org/pypi/Mako/1.0.2

server framework:
http://docs.gunicorn.org/en/latest/settings.html#settings

app tutorials:
http://tutsbucket.com/tutorials/building-a-blog-using-flask-and-angularjs-part-1/
'''

from flask import Flask

# construct flask app object
flask_args = {
    'import_name': __name__
    # 'static_folder': 'assets',
    # 'template_folder': 'views'
}
app = Flask(**flask_args)
