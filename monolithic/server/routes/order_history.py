from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse

from ..database import order_history_collection
from .user import get_current_user

router = APIRouter()

# @router.