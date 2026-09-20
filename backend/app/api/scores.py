from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.schemas.score import (
    ScoreCreate,
    ScoreResponse,
    LeaderboardResponse,
)
from app.services.score_service import (
    add_score,
    get_scores,
    get_top_scores,
    get_total_scores,
)


router = APIRouter(
    prefix="/api/scores",
    tags=["Scores"]
)


@router.post("", response_model=ScoreResponse)
def create_score(
    score_data: ScoreCreate,
    db: Session = Depends(get_db)
):
    return add_score(
        db,
        score_data.player_name,
        score_data.score
    )


@router.get("", response_model=list[ScoreResponse])
def list_scores(
    db: Session = Depends(get_db)
):
    return get_scores(db)

@router.get("/top", response_model=LeaderboardResponse)
def top_scores(
    limit: int = Query(
        default=10,
        ge=1,
        le=100
    ),
    offset: int = Query(
        default=0,
        ge=0
    ),
    db: Session = Depends(get_db)
):
    scores = get_top_scores(
        db,
        limit,
        offset
    )

    total = get_total_scores(db)

    return {
        "scores": scores,
        "total": total,
        "limit": limit,
        "offset": offset,
    }