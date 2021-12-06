# -*- encoding: utf-8 -*-
"""
Copyright (c) 2019 - present AppSeed.us
"""

from flask_login import UserMixin
from sqlalchemy import Binary, Column, Integer, String

from app import db, login_manager

from app.base.util import hash_pass

class User(db.Model, UserMixin):

    __tablename__ = 'User'

    id = Column(Integer, primary_key=True)
    username = Column(String, unique=True)
    email = Column(String, unique=True)
    password = Column(Binary)

    def __init__(self, **kwargs):
        for property, value in kwargs.items():
            # depending on whether value is an iterable or not, we must
            # unpack it's value (when **kwargs is request.form, some values
            # will be a 1-element list)
            if hasattr(value, '__iter__') and not isinstance(value, str):
                # the ,= unpack of a singleton fails PEP8 (travis flake8 test)
                value = value[0]

            if property == 'password':
                value = hash_pass( value ) # we need bytes here (not plain str)
                
            setattr(self, property, value)

    def __repr__(self):
        return str(self.username)


@login_manager.user_loader
def user_loader(id):
    return User.query.filter_by(id=id).first()

@login_manager.request_loader
def request_loader(request):
    username = request.form.get('username')
    user = User.query.filter_by(username=username).first()
    return user if user else None

class GameMap(db.Model):
    __tablename__ = 'GameMap'
    map_id = Column(Integer, primary_key=True)
    map_mode = Column(String(7), unique=False, nullable=False)
    map_string= Column(String(200), unique=True, nullable=False)

    def __init__(self, map_id, map_mode, map_string):
        self.map_id = map_id
        self.map_mode = map_mode
        self.map_string = map_string
    
    def getMapId(self):
        return self.map_id
    
    def getMapMode(self):
        return self.map_mode
    
    def getMapString(self):
        return self.map_string

    def setMapId(self, map_id):
        self.map_id = map_id
    
    def setMapMode(self, map_mode):
        self.map_mode = map_mode
    
    def setMapString(self, map_string):
        self.map_string = map_string
    
    def __repr__(self):
        return f"GameMap('{self.map_mode}','{self.map_string}')"
