from sqlalchemy import Column, Integer, String, DateTime, CheckConstraint
from sqlalchemy.orm import relationship
from datetime import datetime
from ..db import Base

class User(Base):
    __tablename__ = 'users'
    
    id = Column(Integer, primary_key=True)
    name = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    password = Column(String(255), nullable=False)
    role = Column(String(50), nullable=False)
    phone = Column(String(20))
    created_at = Column(DateTime, default=datetime.utcnow)
    
    __table_args__ = (
        CheckConstraint("role IN ('buyer', 'agent', 'admin')", name='users_role_check'),
    )
    
    # Relationships
    properties = relationship('Property', back_populates='agent', foreign_keys='Property.agent_id')
    inquiries = relationship('Inquiry', back_populates='buyer', foreign_keys='Inquiry.buyer_id')
    favorites = relationship('Favorite', back_populates='user')
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'role': self.role,
            'phone': self.phone,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }