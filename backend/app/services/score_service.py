from sqlalchemy.orm import Session

from app.database.models import Score


def add_score(db: Session, player_name: str, score: int):
    score_data = Score(
        player_name=player_name,
        score=score
    )

    db.add(score_data)
    db.commit()
    db.refresh(score_data)

    return score_data


def get_scores(db: Session):
    return (
        db.query(Score)
        .order_by(Score.score.desc())
        .all()
    )

def get_top_scores(
    db: Session,
    limit: int = 10,
    offset: int = 0
):
    return (
        db.query(Score)
        .order_by(Score.score.desc())
        .offset(offset)
        .limit(limit)
        .all()
    )

def get_total_scores(db: Session):
    return db.query(Score).count()

def get_score_rank(db: Session, score_id: int):
    score = db.query(Score).filter(Score.id == score_id).first()

    if score is None:
        return None

    higher_scores = (
        db.query(Score)
        .filter(Score.score > score.score)
        .count()
    )

    return higher_scores + 1