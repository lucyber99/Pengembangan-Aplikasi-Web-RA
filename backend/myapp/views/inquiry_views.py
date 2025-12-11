from pyramid.view import view_config
from pyramid.httpexceptions import HTTPBadRequest, HTTPForbidden, HTTPNotFound

from ..db import DBSession
from ..models import Inquiry, Property
from ..security import require_auth
import transaction

@view_config(route_name='inquiries', renderer='json', request_method='GET')
@require_auth
def list_inquiries(request):
    """Get inquiries (filtered by user role)"""
    user = request.current_user
    
    if user.role == 'buyer':
        # Buyers see their own inquiries
        inquiries = DBSession.query(Inquiry).filter(Inquiry.buyer_id == user.id).all()
    elif user.role == 'agent':
        # Agents see inquiries for their properties
        inquiries = DBSession.query(Inquiry).join(Property).filter(
            Property.agent_id == user.id
        ).all()
    else:
        # Admins see all inquiries
        inquiries = DBSession.query(Inquiry).all()
    
    return {
        'success': True,
        'count': len(inquiries),
        'inquiries': [inquiry.to_dict() for inquiry in inquiries]
    }

@view_config(route_name='property_inquiries', renderer='json', request_method='GET')
@require_auth
def get_property_inquiries(request):
    """Get all inquiries for a specific property (agent/admin only)"""
    try:
        property_id = int(request.matchdict['id'])
    except (ValueError, TypeError):
        raise HTTPBadRequest('Invalid property id')
    
    property = DBSession.query(Property).filter(Property.id == property_id).first()
    
    if not property:
        raise HTTPNotFound('Property not found')

    # Only the owner agent or admin can view inquiries for this listing
    if request.current_user.role != 'admin' and property.agent_id != request.current_user.id:
        raise HTTPForbidden('You do not have permission to view these inquiries')
    
    inquiries = DBSession.query(Inquiry).filter(Inquiry.property_id == property_id).all()
    
    return {
        'success': True,
        'count': len(inquiries),
        'inquiries': [inquiry.to_dict() for inquiry in inquiries]
    }

@view_config(route_name='create_inquiry', renderer='json', request_method='POST')
@require_auth
def create_inquiry(request):
    """Create new inquiry"""
    try:
        data = request.json_body
        
        # Validate required fields
        if 'property_id' not in data or 'message' not in data:
            raise HTTPBadRequest('property_id and message are required')
        
        # Check if property exists
        property = DBSession.query(Property).filter(Property.id == data['property_id']).first()
        if not property:
            raise HTTPNotFound('Property not found')
        
        # Create inquiry
        inquiry = Inquiry(
            property_id=data['property_id'],
            buyer_id=request.current_user.id,
            message=data['message']
        )
        
        DBSession.add(inquiry)
        transaction.commit()
        
        return {
            'success': True,
            'message': 'Inquiry created successfully',
            'inquiry': inquiry.to_dict()
        }
        
    except (HTTPBadRequest, HTTPNotFound):
        raise
    except Exception as e:
        transaction.abort()
        raise HTTPBadRequest(str(e))

@view_config(route_name='inquiry_detail', renderer='json', request_method='GET')
@require_auth
def get_inquiry(request):
    """Get single inquiry with role-based access"""
    try:
        inquiry_id = int(request.matchdict['id'])
    except (ValueError, TypeError):
        raise HTTPBadRequest('Invalid inquiry id')

    inquiry = DBSession.query(Inquiry).filter(Inquiry.id == inquiry_id).first()
    
    if not inquiry:
        raise HTTPNotFound('Inquiry not found')

    # Buyer can view own inquiry, agent can view inquiries on their properties, admin can view all
    if request.current_user.role != 'admin':
        is_buyer_owner = request.current_user.role == 'buyer' and inquiry.buyer_id == request.current_user.id
        is_agent_owner = request.current_user.role == 'agent' and inquiry.property and inquiry.property.agent_id == request.current_user.id
        if not (is_buyer_owner or is_agent_owner):
            raise HTTPForbidden('You do not have permission to view this inquiry')
    
    return {
        'success': True,
        'inquiry': inquiry.to_dict()
    }

@view_config(route_name='delete_inquiry', renderer='json', request_method='DELETE')
@require_auth
def delete_inquiry(request):
    """Delete inquiry with role-based access"""
    try:
        try:
            inquiry_id = int(request.matchdict['id'])
        except (ValueError, TypeError):
            raise HTTPBadRequest('Invalid inquiry id')

        inquiry = DBSession.query(Inquiry).filter(Inquiry.id == inquiry_id).first()
        
        if not inquiry:
            raise HTTPNotFound('Inquiry not found')

        # Buyer can delete own inquiry; agent/admin can delete inquiries for their listings
        if request.current_user.role != 'admin':
            is_buyer_owner = request.current_user.role == 'buyer' and inquiry.buyer_id == request.current_user.id
            is_agent_owner = request.current_user.role == 'agent' and inquiry.property and inquiry.property.agent_id == request.current_user.id
            if not (is_buyer_owner or is_agent_owner):
                raise HTTPForbidden('You do not have permission to delete this inquiry')
        
        DBSession.delete(inquiry)
        transaction.commit()
        
        return {
            'success': True,
            'message': 'Inquiry deleted successfully'
        }
        
    except HTTPNotFound:
        raise
    except Exception as e:
        transaction.abort()
        raise HTTPBadRequest(str(e))
