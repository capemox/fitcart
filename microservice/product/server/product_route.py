from fastapi import APIRouter, Body, Depends, UploadFile, File
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from PIL import Image
from io import BytesIO
import base64

from .database import test_collection

from .product_model import ProductSchema, ProductUpload

router = APIRouter()


def product_helper(product) -> dict:
    return {
        "name": str(product["name"]),
        "price": int(product["price"]),
        "description": str(product["description"]),
        "image": "data:image/png;base64," + product["image"].decode(),
    }


async def retrieve_products():
    products = []
    async for product in test_collection.find():
        products.append(product_helper(product))

    return products


async def add_product(product: ProductSchema):
    product = await test_collection.insert_one(
        product.model_dump(by_alias=True, exclude=["id"])
    )
    return product


async def retrieve_product(name: str):
    product = await test_collection.find_one({"name": name})
    if product:
        return product_helper(product)
    else:
        return None


@router.post("/add_product")
async def add_product_data(
    image: UploadFile = File(...), product: ProductUpload = Depends()
):
    im = Image.open(image.file)
    im_io = BytesIO()
    im.save(im_io, "JPEG", quality=50)
    im_io.seek(0)
    im_bytes = im_io.getvalue()
    encoded_bytes = base64.b64encode(im_bytes)
    updated_product = product
    updated_product = ProductSchema(
        name=product.name,
        price=product.price,
        description=product.description,
        image=encoded_bytes,
    )
    new_product = await add_product(updated_product)
    return product


@router.get("/get_products")
async def get_all_products():
    products = await retrieve_products()
    json_data = JSONResponse(content=products)
    # print(json_data.body)
    return JSONResponse(content=products, status_code=200)


@router.get("/get_product")
async def get_product(data: dict):
    return await retrieve_product(data["name"])
