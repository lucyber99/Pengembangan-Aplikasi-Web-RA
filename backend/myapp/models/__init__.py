"""Expose ORM models for easy imports across the app."""

from .users import User
from .properties import Property
from .photos import PropertyPhoto
from .inquiries import Inquiry
from .favorites import Favorite

__all__ = ['User', 'Property', 'PropertyPhoto', 'Inquiry', 'Favorite']
