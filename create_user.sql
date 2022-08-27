/**
 * Feel free to change the username as well as the password given to it
 */
CREATE USER 'rexgama'@'localhost' IDENTIFIED BY 'XEI@2k22!';

/* In an ideal world, we should strictly provide the grants the API has access
 * to a specific table rather than all the privileges.
 */
GRANT ALL PRIVILEGES ON `parking`.* TO 'rexgama'@'localhost';

ALTER USER 'rexgama'@'localhost' IDENTIFIED WITH mysql_native_password BY 'XEI@2k22!';

flush privileges;