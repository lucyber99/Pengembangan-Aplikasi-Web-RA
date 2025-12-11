from sqlalchemy import Column, Integer, String, Text, Numeric, DateTime, ForeignKey, CheckConstraint
from sqlalchemy.orm import relationship
from datetime import datetime
from ..db import Base

class Property(Base):
    __tablename__ = 'properties'
    
    id = Column(Integer, primary_key=True)
    agent_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    title = Column(String(255), nullable=False)
    description = Column(Text)
    price = Column(Numeric(15, 2), nullable=False)
    type = Column(String(50), nullable=False)
    location = Column(String(255), nullable=False)
    bedrooms = Column(Integer)
    bathrooms = Column(Integer)
    area = Column(Numeric(10, 2))
    created_at = Column(DateTime, default=datetime.utcnow)
    
    __table_args__ = (
        CheckConstraint("type IN ('house', 'apartment', 'land', 'commercial')", name='properties_type_check'),
    )
    
    # Relationships
    agent = relationship('User', back_populates='properties', foreign_keys=[agent_id])
    photos = relationship('PropertyPhoto', back_populates='property', cascade='all, delete-orphan')
    inquiries = relationship('Inquiry', back_populates='property', cascade='all, delete-orphan')
    favorites = relationship('Favorite', back_populates='property', cascade='all, delete-orphan')
    
    def to_dict(self, include_photos=False):
        result = {
            'id': self.id,
            'agent_id': self.agent_id,
            'title': self.title,
            'description': self.description,
            'price': float(self.price) if self.price else None,
            'type': self.type,
            'location': self.location,
            'bedrooms': self.bedrooms,
            'bathrooms': self.bathrooms,
            'area': float(self.area) if self.area else None,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }
        
        if include_photos:
            result['photos'] = [photo.to_dict() for photo in self.photos]
            
        return result