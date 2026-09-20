from pydantic import BaseModel, ConfigDict, Field


class ScoreCreate(BaseModel):
    player_name: str = Field(
        min_length=1,
        max_length=50
    )

    score: int = Field(
        ge=0
    )


class ScoreResponse(BaseModel):
    id: int
    player_name: str
    score: int

    model_config = ConfigDict(from_attributes=True)


class LeaderboardResponse(BaseModel):
    scores: list[ScoreResponse]
    total: int
    limit: int
    offset: int