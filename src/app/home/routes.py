# -*- encoding: utf-8 -*-
# DELETE FROM Data WHERE dataID IN(1,2)
"""
Copyright (c) 2019 - present AppSeed.us
"""

from sqlite3.dbapi2 import Cursor
from flask.json import jsonify
from app.home import blueprint
from flask import render_template, redirect, url_for, request, Flask,request, make_response
from flask_login import login_required, current_user
from app import login_manager
from jinja2 import TemplateNotFound
import random
import json
from time import time
import sqlite3


def db_connection():
    conn = None
    try:
        conn = sqlite3.connect('Database.db')
    except sqlite3.error as e:
        print(e)
    return conn

@blueprint.route('/index')
@login_required
def index():

    return render_template('index.html', segment='index')

@blueprint.route('/<template>')
@login_required
def route_template(template):

    try:

        if not template.endswith( '.html' ):
            template += '.html'

        # Detect the current page
        segment = get_segment( request )

        # Serve the file (if exists) from app/templates/FILE.html
        return render_template( template, segment=segment )

    except TemplateNotFound:
        return render_template('page-404.html'), 404
    
    except:
        return render_template('page-500.html'), 500

# Helper - Extract current page name from request 
def get_segment( request ): 

    try:

        segment = request.path.split('/')[-1]

        if segment == '':
            segment = 'index'

        return segment    

    except:
        return None  

@blueprint.route('/getCommands', methods=["GET" , "POST"])
@login_required
def getCommands():
    if request.method == "POST":
        commands = request.form['queue']
        # Remove the brackets "" and coma
        commands = commands.replace("[","")
        commands = commands.replace("]","")
        commands = commands.replace("\"","")
        commands = commands.replace(",","")
        return jsonify(commands)
    return jsonify("")

@blueprint.route('/api/car/commands', methods=["GET" , "POST"])
@login_required
def submitQueue():
    if request.method == "GET":
        #Get the queue from AJAX GET request
        queue = request.args.get('qCommands')
        return jsonify(queue)
    return jsonify("")
@blueprint.route('/Dashboard', methods=["GET", "POST"])
def main():
    return render_template('Dashboard.html')

count = 0 
@blueprint.route('/testdata', methods=["GET", "POST"])
def data():
    # This one is to 1 by 1 increment each run of the function
    # global count
    # count += 1
    # str(count)

    # Random value
    carid = random.randint(1, 4)
    # print(carid)
    
    if request.method == "GET":
        # Establish database Connection
        conn = sqlite3.connect('Database.db')
        # conn.close()
        c = conn.cursor()
        try:
            c.execute("SELECT * FROM Data WHERE dataID=" +str(carid))
            for row in c:
                carmovement = row[1]
                speed = row[2]
            data = [time() * 1000, carmovement, speed]
            # data = c.fetchall()
            conn.close()
            response = make_response(json.dumps(data))
            response.content_type = 'application/json'
            return (response)     
        except:
            return "No data" + '\0'
    return "Fail"

