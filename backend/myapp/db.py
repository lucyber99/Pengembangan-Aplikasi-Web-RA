from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import scoped_session, sessionmaker
from zope.sqlalchemy import register

DBSession = scoped_session(sessionmaker())
Base = declarative_base()

def initialize_sql(engine):
    DBSession.configure(bind=engine)
    register(DBSession)
    Base.metadata.bind = engine
    Base.metadata.create_all(engine)