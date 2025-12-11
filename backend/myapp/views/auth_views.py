from pyramid.view import view_config
from pyramid.httpexceptions import HTTPBadRequest, HTTPUnauthorized
from ..db import DBSession
from ..models import User
from ..security import hash_password, verify_password, create_access_token, require_auth
import transaction

@view_config(route_name='register', renderer='json', request_method='POST')
def register(request):
    """Register a new user"""
    try:
        data = request.json_body
        
        # Validate required fields
        required_fields = ['name', 'email', 'password', 'role']
        for field in required_fields:
            if field not in data:
                raise HTTPBadRequest(f'Missing required field: {field}')
        
        # Check if email already exists
        existing_user = DBSession.query(User).filter(User.email == data['email']).first()
        if existing_user:
            raise HTTPBadRequest('Email already registered')
        
        # Validate role
        valid_roles = ['buyer', 'agent', 'admin']
        if data['role'] not in valid_roles:
            raise HTTPBadRequest(f'Invalid role. Must be one of: {", ".join(valid_roles)}')
        
        # Create new user
        user = User(
            name=data['name'],
            email=data['email'],
            password=hash_password(data['password']),
            role=data['role'],
            phone=data.get('phone')
        )
        
        DBSession.add(user)
        transaction.commit()
        
        # Create token
        token = create_access_token({'user_id': user.id, 'role': user.role})
        
        return {
            'success': True,
            'message': 'User registered successfully',
            'token': token,
            'user': user.to_dict()
        }
        
    except HTTPBadRequest:
        raise
    except Exception as e:
        transaction.abort()
        raise HTTPBadRequest(str(e))

@view_config(route_name='login', renderer='json', request_method='POST')
def login(request):
    """Login user"""
    try:
        data = request.json_body
        
        # Validate required fields
        if 'email' not in data or 'password' not in data:
            raise HTTPBadRequest('Email and password are required')
        
        # Find user
        user = DBSession.query(User).filter(User.email == data['email']).first()
        
        if not user or not verify_password(data['password'], user.password):
            raise HTTPUnauthorized('Invalid email or password')
        
        # Create token
        token = create_access_token({'user_id': user.id, 'role': user.role})
        
        return {
            'success': True,
            'message': 'Login successful',
            'token': token,
            'user': user.to_dict()
        }
        
    except (HTTPBadRequest, HTTPUnauthorized):
        raise
    except Exception as e:
        raise HTTPBadRequest(str(e))

@view_config(route_name='me', renderer='json', request_method='GET')
@require_auth
def get_current_user_info(request):
    """Get current user information"""
    return {
        'success': True,
        'user': request.current_user.to_dict()
    }

@view_config(route_name='update_profile', renderer='json', request_method='PUT')
@require_auth
def update_profile(request):
    """Update user profile"""
    try:
        data = request.json_body
        user = request.current_user
        
        # Update allowed fields
        if 'name' in data:
            user.name = data['name']
        if 'phone' in data:
            user.phone = data['phone']
        if 'password' in data:
            user.password = hash_password(data['password'])
        
        transaction.commit()
        
        return {
            'success': True,
            'message': 'Profile updated successfully',
            'user': user.to_dict()
        }
        
    except Exception as e:
        transaction.abort()
        raise HTTPBadRequest(str(e))