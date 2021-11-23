# -*- encoding: utf-8 -*-
"""
Copyright (c) 2019 - present AppSeed.us
"""

from flask.json import jsonify
from app.home import blueprint
from flask import render_template, redirect, url_for, request
from flask_login import login_required, current_user
from app import login_manager
from jinja2 import TemplateNotFound

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
        