def includeme(config):
    """Configure routes for the application"""
    
    # Authentication routes
    config.add_route('register', '/api/auth/register')
    config.add_route('login', '/api/auth/login')
    config.add_route('me', '/api/auth/me')
    config.add_route('update_profile', '/api/auth/profile')
    
    # Property routes
    config.add_route('properties', '/api/properties')
    config.add_route('property_detail', '/api/properties/detail/{id}')
    config.add_route('create_property', '/api/properties/create')
    config.add_route('update_property', '/api/properties/update/{id}')
    config.add_route('delete_property', '/api/properties/delete/{id}')
    
    # Property photo routes
    config.add_route('add_photo', '/api/properties/photos-add/{id}')
    config.add_route('delete_photo', '/api/properties/photos-delete/{photo_id}')
    
    # Inquiry routes
    config.add_route('inquiries', '/api/inquiries')
    config.add_route('property_inquiries', '/api/properties/inquiries/{id}')
    config.add_route('create_inquiry', '/api/inquiries/create')
    config.add_route('inquiry_detail', '/api/inquiries/detail/{id}')
    config.add_route('delete_inquiry', '/api/inquiries/delete/{id}')
    
    # Favorites routes
    config.add_route('favorites', '/api/favorites')
    config.add_route('add_favorite', '/api/favorites/add')
    config.add_route('remove_favorite', '/api/favorites/remove/{property_id}')
    config.add_route('check_favorite', '/api/favorites/check/{property_id}')