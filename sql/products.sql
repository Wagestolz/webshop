DROP TABLE IF EXISTS products;


CREATE TABLE products (
	id SERIAL NOT NULL PRIMARY KEY,
	fields JSON NOT NULL
);

INSERT INTO products (fields)
VALUES('{ "name": "Product1", "price": 32.99, "brand": "Brand1","tags": ["nice", "awesome", "amazing"],"featured": true,"description": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maxime esse officia dolorem minima, a repudiandae, impedit cum ipsum aut quibusdam aliquid obcaecati deleniti, eius exercitationem. Sunt illo perferendis obcaecati error.","image": [{"id": 1,"url": "https://i.pinimg.com/originals/45/b9/1f/45b91fe58f59a59d429eae0fb8fb46d0.jpg","filename": "45b91fe58f59a59d429eae0fb8fb46d0.jpg","size": 62864,"type": "image/png"}]}');


