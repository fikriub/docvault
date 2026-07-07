from uuid import UUID

from pydantic import BaseModel
from pydantic import ConfigDict
from pydantic import EmailStr


class UserResponse(BaseModel):

    id: UUID

    name: str

    email: EmailStr

    model_config = ConfigDict(
        from_attributes=True
    )