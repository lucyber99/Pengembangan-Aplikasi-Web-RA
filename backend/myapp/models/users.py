from datetime import datetime

from sqlalchemy import CheckConstraint, Column, DateTime, Integer, String
from sqlalchemy.orm import relationship

from ..db import Base


class User(Base):
    """User accounts for buyers and agents."""

    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    name = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    password = Column(String(255), nullable=False)
    role = Column(String(50), nullable=False)
    phone = Column(String(20))
    created_at = Column(DateTime, default=datetime.utcnow)

    __table_args__ = (
        CheckConstraint("role IN ('buyer', 'agent')", name='users_role_check'),
    )

    # Relationships
    properties = relationship(  # listings created by the agent
        'Property',
        back_populates='agent',
        foreign_keys='Property.agent_id',
        lazy='selectin'
    )
    inquiries = relationship(  # questions sent by the buyer
        'Inquiry',
        back_populates='buyer',
        foreign_keys='Inquiry.buyer_id',
        lazy='selectin'
    )
    favorites = relationship(  # saved properties for the buyer
        'Favorite',
        back_populates='user',
        lazy='selectin'
    )

    def to_dict(self):
        """Serialize safe fields for API responses."""
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'role': self.role,
            'phone': self.phone,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

    def __repr__(self):
        return f"<User id={self.id} email={self.email} role={self.role}>"
