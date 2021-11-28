# -*- encoding: utf-8 -*-
"""
Copyright (c) 2019 - present AppSeed.us
"""

from os import abort, error
from flask.blueprints import Blueprint
from flask.helpers import flash
from flask.json import jsonify
from app.home import blueprint
from flask import render_template, redirect, url_for, request, flash
from flask_login import login_required, current_user
from app import login_manager
from jinja2 import TemplateNotFound
import sqlite3

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

@blueprint.route('/submitCommands', methods=["GET", "POST"])
def submitQueue():
    if request.method == "GET":
        try:
            # Establish database Connection
            conn = sqlite3.connect('db.sqlite3')
            c = conn.cursor()
        except:
            return "Fail to connect to database"
        try:
            #Get the queue from AJAX GET request
            queue = request.args.get('qCommands')
            for q in queue:
                #Insert data to DB here
                c.execute("INSERT INTO Queue(Commands) VALUES(?)", (q,))
            conn.commit()
            conn.close()
            return "Success"
        except:
            return "Fail to submit queue commands"
    return "Fail"

@blueprint.route('/api/commands/deqeue', methods=["GET", "POST"])
def dequeue():
    if request.method == "GET":
        # Establish database Connection
        try:
            conn = sqlite3.connect('db.sqlite3')
            c = conn.cursor()
        except:
            return "Fail to connect to database"
        try:
            #Get the queue from AJAX GET request
            c.execute("SELECT commands FROM Queue ORDER BY QueueID ASC LIMIT 1")
            data = c.fetchall()
            c.execute("DELETE FROM Queue WHERE QueueID = (SELECT QueueID FROM Queue ORDER BY QueueID ASC LIMIT 1)")
            conn.commit()
            conn.close()
            return data[0][0] + '\0'
        except:
            # flash("No commands in queue")
            # return render_template('page-500.html'), 500
            return "No commands in queue" + '\0'
    return "Fail"


@blueprint.route('/api/commands/getFirstCommands', methods=["GET", "POST"])
def getFirstCommand():
    if request.method == "GET":
        # Establish database Connection
        conn = sqlite3.connect('db.sqlite3')
        # conn.close()
        c = conn.cursor()
        try:
            #Get the queue from AJAX GET request
            c.execute("SELECT commands FROM Queue ORDER BY QueueID ASC LIMIT 1")
            data = c.fetchall()
            conn.close()
            return data[0][0] + '\0'
        except:
            # flash("No commands in queue")
            # return render_template('page-500.html'), 500
            return "No commands in queue" + '\0'
    return "Fail"

# Route to test the ESP8266 connection
@blueprint.route("/espmodule", methods=['GET'])
def helloHandler():
    if request.method == 'GET':
        return 'Hello ESP8266'

# Route for reciving data from ESP8266
@blueprint.route("/espmodule/recieveData", methods=['GET'])
def recieveData():
    if request.method == 'GET':
        # Get data from URL parameters
        data = request.args.get('data')
        print (data)
        #store the data in the session
        return 'Success'
    return 'Fail'
        