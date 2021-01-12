DROP TABLE IF EXISTS products;


CREATE TABLE products (
	id SERIAL NOT NULL PRIMARY KEY,
	fields JSON NOT NULL
);

INSERT INTO products (fields)
VALUES('{ "name": "Strategy Consulting", "price": 4999.99, "category": "Consulting & Innovation","tags": ["nice", "awesome", "amazing"],"featured": true,"description": "Many companies today still act according to traditional rules and market understanding. Those who want to shape the future and be successful in the long term must be able to react quickly to changing conditions, technological trends and an increasingly dynamic and complex competitive landscape. Only companies that pursue clear digital goals and know what needs to be done to achieve them will differentiate themselves from the competition and be successful in the long term.","image": [{"id": 1,"url": "https://social.hays.com/wp-content/uploads/2017/11/people-digitalisation-643x372.png","filename": "people-digitalisation-643x372.png","size": 62864,"type": "image/png"}]}');

INSERT INTO products (fields)
VALUES('{ "name": "Digital Commerce", "price": 2999.99, "category": "Solutions & Experiences","tags": ["nice", "awesome", "amazing"],"featured": true,"description": "New technologies and changing consumer behaviour are constantly altering the business world. To be successful, companies need to develop digital business models and solutions. New digital business models complement, extend or even replace existing organisations. At diva-e, we know the challenges companies face.","image": [{"id": 2,"url": "https://d3i2s57s2jetfw.cloudfront.net/wp-content/uploads/2018/12/Fotolia_207963156_Subscription_Monthly_M-1200x0-c-default.jpg","filename": "Fotolia_207963156_Subscription_Monthly_M-1200x0-c-default.jpg","size": 62864,"type": "image/jpg"}]}');

INSERT INTO products (fields)
VALUES('{ "name": "IoT Services", "price": 1499.99, "category": "Data & Intelligence","tags": ["nice", "awesome", "amazing"],"featured": true,"description": "Whether it is Industry 4.0, networked mobility in the automotive sector or Smart Homes with connected energy systems: Networked solutions and Internet of Things (IoT) technologies are the future – and already offer companies competitive advantages today. diva-e is ideally integrated in the IoT area. Many years of experience, technical expertise and a spirit of innovation form the basis of diva-e’s IoT services, which range from strategy development and implementation to operation. As an integrated Transactional Experience Partner, we also rely on strategic partnerships in the IoT area, to expand our comprehensive IoT competencies and to gain direct access to cutting-edge market developments and innovative technology.","image": [{"id": 3,"url": "https://zdnet3.cbsistatic.com/hub/i/r/2020/09/28/6b225a1a-381a-4ceb-b13c-d2d314d41bd7/thumbnail/570x322/89b85ff28d7dcb6b55efcd5fe3455021/what-is-the-iot-everything-you-need-to-k-5f6cc13d5f60de4b41b7f3d4-1-sep-28-2020-16-19-38-poster.jpg","filename": "what-is-the-iot-everything-you-need-to-k-5f6cc13d5f60de4b41b7f3d4-1-sep-28-2020-16-19-38-poster.jpg","size": 62864,"type": "image/jpg"}]}');


