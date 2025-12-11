import jwt
import bcrypt
from datetime import datetime, timedelta
from pyramid.httpexceptions import HTTPForbidden, HTTPUnauthorized
from functools import wraps

SECRET_KEY = 'ykdwh2Jkbps2TZNmn3axjG39eJuVVLQOQFbzOs5PGXUHqe2tPRlhs+e9+Z499Bg8e+17oIVhjsp0x7GiS+bIlw=='
ALGORITHM = 'HS256'
ACCESS_TOKEN_EXPIRE_MINUTES = 1440  # 24 hours

def hash_password(password):
    """Hash a password using bcrypt"""
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def verify_password(plain_password, hashed_password):
    """Verify a password against its hash"""
    return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))

def create_access_token(data):
    """Create JWT token"""
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def decode_token(token):
    """Decode JWT token"""
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None

def get_current_user(request):
    """Get current user from request"""
    from .models import User
    from .db import DBSession
    
    auth_header = request.headers.get('Authorization')
    if not auth_header or not auth_header.startswith('Bearer '):
        raise HTTPUnauthorized('Missing or invalid authorization header')
    
    token = auth_header.split(' ')[1]
    payload = decode_token(token)
    
    if not payload:
        raise HTTPUnauthorized('Invalid or expired token')
    
    user_id = payload.get('user_id')
    user = DBSession.query(User).filter(User.id == user_id).first()
    
    if not user:
        raise HTTPUnauthorized('User not found')
    
    return user

def require_auth(func):
    """Decorator to require authentication"""
    @wraps(func)
    def wrapper(request):
        request.current_user = get_current_user(request)
        return func(request)
    return wrapper

def require_role(*roles):
    """Decorator to require specific role(s)"""
    def decorator(func):
        @wraps(func)
        def wrapper(request):
            request.current_user = get_current_user(request)
            if request.current_user.role not in roles:
                raise HTTPForbidden('Insufficient permissions')
            return func(request)
        return wrapper
    return decorator
