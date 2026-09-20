from sqlalchemy import Column, Integer, String

from app.database.connection import Base


class Score(Base):
    __tablename__ = "scores"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    player_name = Column(
        String(50),
        nullable=False,
        index=True
    )

    score = Column(
        Integer,
        nullable=False,
        index=True
    )