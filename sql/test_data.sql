USE trip_advisor;

INSERT INTO restaurant(id, name, avgPrice, maxDiscount, menuName, menuLastModified)
VALUES (1,'La luna piena',20,20,"menu",'2019-10-12');

INSERT INTO user(id,username,password)
VALUES (1,'u1','asd'),
(2,'u2','asd'),
(3,'u3','asd');

INSERT INTO food_need(id,need)
VALUES (1,"Vegetariano"),
(2,"Celiaco");

INSERT INTO set_menu(id,restaurant,name,description,price)
VALUES (1,1,"Pizza + bibita",NULL,20),
(2,1,"Pasta e caffe","Senza dolce",30);

INSERT INTO feedback(restaurant,userId,rating)
VALUES (1,1,5),
(1,2,2),
(1,3,3);

INSERT INTO menu_entry(id,restaurant,name,price)
VALUES (1,1,"pesce",20),
(2,1,"pizza",5),
(3,1,"carne",10),
(4,1,"pasta",5);

INSERT INTO opinion(userId,restaurant,opinion,rating)
VALUES (1,1,"ottimo",10),
(2,1,"meh",5),
(3,1,"non male",7);

INSERT INTO rating(restaurant,userId,rating)
VALUES (1,1,5),
(1,2,2),
(1,3,10);


INSERT INTO restaurant_image(id,restaurant,image)
VALUES (1,1,'https://media-cdn.tripadvisor.com/media/photo-s/12/c1/c3/f5/restaurant-araz.jpg');

INSERT INTO restaurant_tag(id,restaurant,tag)
VALUES (1,1,'Cucina italiana'),
(2,1,'Pizza');

INSERT INTO restaurant_food_need(need,restaurant)
VALUES (1,1),
(2,1);
