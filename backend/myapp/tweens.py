def cors_tween_factory(handler, registry):
    """CORS tween factory for handling cross-origin requests"""
    
    def cors_tween(request):
        # Handle preflight OPTIONS request
        if request.method == 'OPTIONS':
            response = request.response
            response.status = 200
        else:
            response = handler(request)
        
        # Add CORS headers
        response.headers.update({
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            'Access-Control-Max-Age': '3600',
        })
        
        return response
    
    return cors_tween