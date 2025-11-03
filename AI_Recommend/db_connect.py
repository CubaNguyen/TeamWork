import pyodbc

# Mapping category_id -> category name cho AI
CATEGORY_MAP = {
    10: "ring",
    11: "bracelet",
    12: "necklace",
    13: "earring"
}

def load_products_from_db():
    connection = pyodbc.connect(
        "DRIVER={ODBC Driver 17 for SQL Server};"
        "SERVER=localhost,1433;"          # chỉnh theo server của bạn
        "DATABASE=helios;"                # tên database
        "UID=sa;"                         # user SQL Server
        "PWD=300304Cuba;"              # mật khẩu
    )

    products = []
    try:
        cursor = connection.cursor()
        sql = """
        SELECT p.id, p.category_id, p.name, p.price, p.image, p.description, c.name as category_name
        FROM products p
        JOIN categories c ON p.category_id = c.id
        WHERE p.status = 'Active' AND p.category_id IN (10,11,12,13)
        """
        cursor.execute(sql)
        columns = [col[0] for col in cursor.description]

        for row in cursor.fetchall():
            item = dict(zip(columns, row))
            # map category_id -> nhãn tiếng Anh cho AI
            item["category"] = CATEGORY_MAP.get(item["category_id"])
            products.append(item)
    finally:
        connection.close()

    return products


if __name__ == "__main__":
    data = load_products_from_db()
    print("Số sản phẩm:", len(data))
    print("1 sản phẩm mẫu:", data[0] if data else "Không có dữ liệu")
