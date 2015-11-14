__author__ = 'rcj1492'
__created__ = '2015.10'

from server.config import *
from flask import json, jsonify, request, url_for, render_template

@app.route('/')
@app.route('/<user_name>')
def dashboard_page(user_name=''):
    return render_template('landing.html', userName=user_name)

# error handling with response codes
@app.errorhandler(404)
def page_not_found(error):
    return render_template('404.html'), 404

# @processor.route('/')
# def landing_page():
#     return '<h2>Processor Landing Page</h2>'

# injecting variables
# @processor.route('/user/<user_name>')
# def user_page(user_name):
#     return '<h2>Welcome, ' + user_name + '</h2>'

# request method types
# @server.route('/login', methods=['POST', 'GET'])
# def login_page():
#     error = None
#     if request.method == 'POST':
#         if validateLogin(request.form['username'], request.form['password']):
#             return render_template('dashboard.html', userName=request.form['username'])
#         else:
#             error = 'Invalid username/password'
#     # the code below is executed if the request method
#     # was GET or the credentials were invalid
#     return render_template('login.html', error=error)

# creating static pages
# url_for('static', filename='bootstrap.css')

# using templates with injected variables
# http://flask.pocoo.org/docs/0.10/patterns/templateinheritance/#template-inheritance

