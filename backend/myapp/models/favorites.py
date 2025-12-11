from sqlalchemy import Column, Integer, ForeignKey, UniqueConstraint
from sqlalchemy.orm import relationship
from ..db import Base

class Favorite(Base):
    __tablename__ = 'favorites'
    
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    property_id = Column(Integer, ForeignKey('properties.id'), nullable=False)
    
    __table_args__ = (
        UniqueConstraint('user_id', 'property_id', name='favorites_user_id_property_id_key'),
    )
    
    # Relationships
    user = relationship('User', back_populates='favorites')
    property = relationship('Property', back_populates='favorites')
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'property_id': self.property_id
        }