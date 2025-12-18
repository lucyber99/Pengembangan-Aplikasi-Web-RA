"""Seed sample data for the property listing app."""

import sys
from datetime import datetime
from pathlib import Path

from pyramid.paster import get_appsettings
from sqlalchemy import engine_from_config

from myapp.db import Base, DBSession
from myapp.models import Favorite, Inquiry, Property, PropertyPhoto, User
from myapp.security import hash_password


def get_or_create_user(session, email, **kwargs):
    user = session.query(User).filter_by(email=email).first()
    if user:
        return user
    user = User(email=email, **kwargs)
    session.add(user)
    session.flush()
    return user


def get_or_create_property(session, agent_id, title, **kwargs):
    prop = (
        session.query(Property)
        .filter_by(agent_id=agent_id, title=title)
        .first()
    )
    if prop:
        return prop
    prop = Property(agent_id=agent_id, title=title, **kwargs)
    session.add(prop)
    session.flush()
    return prop


def resolve_settings_path(settings_path: str) -> str:
    """Return absolute path to the ini file, relative to this script if needed."""
    path = Path(settings_path)
    if not path.is_absolute():
        path = Path(__file__).resolve().parent / path
    return str(path)


def seed_database(settings_path: str):
    settings = get_appsettings(resolve_settings_path(settings_path))
    engine = engine_from_config(settings, "sqlalchemy.")
    DBSession.configure(bind=engine)
    Base.metadata.create_all(engine)

    session = DBSession()
    try:
        # Users
        agent = get_or_create_user(
            session,
            email="agent@example.com",
            name="Agen Properti",
            password=hash_password("password123"),
            role="agent",
            phone="+628111111111",
            created_at=datetime.utcnow(),
        )
        agent2 = get_or_create_user(
            session,
            email="agent2@example.com",
            name="Agen Properti 2",
            password=hash_password("password123"),
            role="agent",
            phone="+628133333333",
            created_at=datetime.utcnow(),
        )
        buyer = get_or_create_user(
            session,
            email="buyer@example.com",
            name="Pembeli Properti",
            password=hash_password("password123"),
            role="buyer",
            phone="+628122222222",
            created_at=datetime.utcnow(),
        )
        buyer2 = get_or_create_user(
            session,
            email="buyer2@example.com",
            name="Pembeli Properti 2",
            password=hash_password("password123"),
            role="buyer",
            phone="+628144444444",
            created_at=datetime.utcnow(),
        )

        # Properties
        prop1 = get_or_create_property(
            session,
            agent_id=agent.id,
            title="Rumah Minimalis Jakarta Selatan",
            description="Siap huni, lokasi strategis dekat tol.",
            price=1200000000,
            type="house",
            location="Jakarta Selatan",
            bedrooms=3,
            bathrooms=2,
            area=120,
            created_at=datetime.utcnow(),
        )
        prop2 = get_or_create_property(
            session,
            agent_id=agent.id,
            title="Apartemen Tengah Kota",
            description="Dekat mall dan transportasi umum.",
            price=850000000,
            type="apartment",
            location="Jakarta Pusat",
            bedrooms=2,
            bathrooms=1,
            area=70,
            created_at=datetime.utcnow(),
        )
        prop3 = get_or_create_property(
            session,
            agent_id=agent2.id,
            title="Rumah Cluster Bandung",
            description="Lingkungan nyaman, one gate system.",
            price=950000000,
            type="house",
            location="Bandung",
            bedrooms=3,
            bathrooms=2,
            area=110,
            created_at=datetime.utcnow(),
        )
        prop4 = get_or_create_property(
            session,
            agent_id=agent2.id,
            title="Studio Apartemen Surabaya",
            description="Cocok untuk investasi, dekat kampus.",
            price=450000000,
            type="apartment",
            location="Surabaya",
            bedrooms=1,
            bathrooms=1,
            area=35,
            created_at=datetime.utcnow(),
        )
        prop5 = get_or_create_property(
            session,
            agent_id=agent.id,
            title="Rumah Hook Bekasi",
            description="Luas tanah lebar, akses tol Timur.",
            price=780000000,
            type="house",
            location="Bekasi",
            bedrooms=4,
            bathrooms=3,
            area=150,
            created_at=datetime.utcnow(),
        )

        # Photos helper
        def add_photos_if_empty(prop, urls):
            if not prop.photos:
                session.add_all(
                    [
                        PropertyPhoto(property_id=prop.id, photo_url=u)
                        for u in urls
                    ]
                )

        add_photos_if_empty(
            prop1,
            [
                "https://placehold.co/600x400?text=Rumah1",
                "https://placehold.co/600x400?text=Rumah2",
            ],
        )
        add_photos_if_empty(
            prop2,
            [
                "https://placehold.co/600x400?text=Apart1",
                "https://placehold.co/600x400?text=Apart2",
            ],
        )
        add_photos_if_empty(
            prop3,
            [
                "https://placehold.co/600x400?text=Bandung1",
                "https://placehold.co/600x400?text=Bandung2",
            ],
        )
        add_photos_if_empty(
            prop4,
            [
                "https://placehold.co/600x400?text=Studio1",
                "https://placehold.co/600x400?text=Studio2",
            ],
        )
        add_photos_if_empty(
            prop5,
            [
                "https://placehold.co/600x400?text=Bekasi1",
                "https://placehold.co/600x400?text=Bekasi2",
            ],
        )

        # Inquiries
        inquiries_to_seed = [
            (prop1.id, buyer.id, "Apakah bisa jadwalkan survei akhir pekan?"),
            (prop2.id, buyer.id, "Apakah parkir tersedia?"),
            (prop3.id, buyer2.id, "Harga masih bisa nego?"),
            (prop4.id, buyer2.id, "Biaya maintenance berapa per bulan?"),
        ]
        for prop_id, buyer_id, msg in inquiries_to_seed:
            exists = (
                session.query(Inquiry)
                .filter(
                    Inquiry.property_id == prop_id,
                    Inquiry.buyer_id == buyer_id,
                )
                .first()
            )
            if not exists:
                session.add(
                    Inquiry(
                        property_id=prop_id,
                        buyer_id=buyer_id,
                        message=msg,
                        date=datetime.utcnow(),
                    )
                )

        # Favorites
        favorites_to_seed = [
            (buyer.id, prop2.id),
            (buyer.id, prop3.id),
            (buyer2.id, prop1.id),
            (buyer2.id, prop4.id),
            (buyer2.id, prop5.id),
        ]
        for user_id, prop_id in favorites_to_seed:
            exists = (
                session.query(Favorite)
                .filter(
                    Favorite.user_id == user_id,
                    Favorite.property_id == prop_id,
                )
                .first()
            )
            if not exists:
                session.add(Favorite(property_id=prop_id, user_id=user_id))

        session.commit()
        print("Seed data inserted successfully.")
    except Exception as exc:  # pragma: no cover - manual script
        session.rollback()
        raise exc
    finally:
        DBSession.remove()


if __name__ == "__main__":
    ini_path = sys.argv[1] if len(sys.argv) > 1 else "development.ini"
    seed_database(ini_path)
