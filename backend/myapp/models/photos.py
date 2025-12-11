from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from ..db import Base


class PropertyPhoto(Base):
    """Photos attached to a property listing."""

    __tablename__ = 'property_photos'

    id = Column(Integer, primary_key=True)
    property_id = Column(Integer, ForeignKey('properties.id'), nullable=False)
    photo_url = Column(String(500), nullable=False)

    # Relationships
    property = relationship('Property', back_populates='photos')

    def to_dict(self):
        """Serialize photo data for API responses."""
        return {
            'id': self.id,
            'property_id': self.property_id,
            'photo_url': self.photo_url
        }
