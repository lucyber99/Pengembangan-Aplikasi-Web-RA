from pyramid.view import view_config
from pyramid.httpexceptions import HTTPBadRequest, HTTPNotFound
from sqlalchemy.exc import IntegrityError
from ..db import DBSession
from ..models import Favorite, Property
from ..security import require_auth
import transaction

@view_config(route_name='favorites', renderer='json', request_method='GET')
@require_auth
def list_favorites(request):
    """Get user's favorite properties"""
    user = request.current_user
    
    favorites = DBSession.query(Favorite).filter(Favorite.user_id == user.id).all()
    
    # Get property details for each favorite
    favorite_properties = []
    for favorite in favorites:
        if favorite.property:
            prop_dict = favorite.property.to_dict(include_photos=True)
            prop_dict['favorite_id'] = favorite.id
            favorite_properties.append(prop_dict)
    
    return {
        'success': True,
        'count': len(favorite_properties),
        'favorites': favorite_properties
    }

@view_config(route_name='add_favorite', renderer='json', request_method='POST')
@require_auth
def add_favorite(request):
    """Add property to favorites"""
    try:
        data = request.json_body
        
        if 'property_id' not in data:
            raise HTTPBadRequest('property_id is required')
        
        # Check if property exists
        property = DBSession.query(Property).filter(Property.id == data['property_id']).first()
        if not property:
            raise HTTPNotFound('Property not found')
        
        # Check if already favorited
        existing = DBSession.query(Favorite).filter(
            Favorite.user_id == request.current_user.id,
            Favorite.property_id == data['property_id']
        ).first()
        
        if existing:
            raise HTTPBadRequest('Property already in favorites')
        
        # Create favorite
        favorite = Favorite(
            user_id=request.current_user.id,
            property_id=data['property_id']
        )
        
        DBSession.add(favorite)
        transaction.commit()
        
        return {
            'success': True,
            'message': 'Property added to favorites',
            'favorite': favorite.to_dict()
        }
        
    except (HTTPBadRequest, HTTPNotFound):
        raise
    except IntegrityError:
        transaction.abort()
        raise HTTPBadRequest('Property already in favorites')
    except Exception as e:
        transaction.abort()
        raise HTTPBadRequest(str(e))

@view_config(route_name='remove_favorite', renderer='json', request_method='DELETE')
@require_auth
def remove_favorite(request):
    """Remove property from favorites"""
    try:
        try:
            property_id = int(request.matchdict['property_id'])
        except (ValueError, TypeError):
            raise HTTPBadRequest('Invalid property id')
        
        favorite = DBSession.query(Favorite).filter(
            Favorite.user_id == request.current_user.id,
            Favorite.property_id == property_id
        ).first()
        
        if not favorite:
            raise HTTPNotFound('Favorite not found')
        
        DBSession.delete(favorite)
        transaction.commit()
        
        return {
            'success': True,
            'message': 'Property removed from favorites'
        }
        
    except HTTPNotFound:
        raise
    except Exception as e:
        transaction.abort()
        raise HTTPBadRequest(str(e))

@view_config(route_name='check_favorite', renderer='json', request_method='GET')
@require_auth
def check_favorite(request):
    """Check if property is in user's favorites"""
    try:
        property_id = int(request.matchdict['property_id'])
    except (ValueError, TypeError):
        raise HTTPBadRequest('Invalid property id')
    
    favorite = DBSession.query(Favorite).filter(
        Favorite.user_id == request.current_user.id,
        Favorite.property_id == property_id
    ).first()
    
    return {
        'success': True,
        'is_favorite': favorite is not None,
        'favorite_id': favorite.id if favorite else None
    }
