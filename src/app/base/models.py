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
    game_id = Column(Integer, primary_key=True)
    game_mode = Column(String(7), unique=False, nullable=False)
    map_location= Column(String(100), unique=True, nullable=False)

    def __init__(self, id, game_mode, map_location):
        self.game_id = id
        self.game_mode = game_mode
        self.map_location = map_location
    
    def getId(self):
        return self.game_id
    
    def getGameMode(self):
        return self.game_mode
    
    def getMapLocation(self):
        return self.map_location

    def setId(self, id):
        self.game_id = id
    
    def setGameMode(self, game_mode):
        self.game_mode = game_mode
    
    def setMapLocation(self, map_location):
        self.map_location = map_location
    
    def __repr__(self):
        return f"GameMap('{self.game_mode}','{self.map_location}')"
