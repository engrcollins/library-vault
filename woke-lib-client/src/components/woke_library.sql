
CREATE TABLE `library_topics` (
    `topic_id` int NOT NULL AUTO_INCREMENT,
    `title` varchar(255) NOT NULL,
    `content` text NOT NULL,
    `category` varchar(24) NOT NULL,
    `tags` varchar(255) DEFAULT NULL,
    `author` varchar(16) DEFAULT NULL,
    `createdAt` varchar(36) DEFAULT NULL,
    `updatedAt` varchar(36) DEFAULT NULL,
    PRIMARY KEY (`topic_id`)
  ) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8;

  CREATE TABLE `library_users` (
    `user_id` int NOT NULL AUTO_INCREMENT,
    `firstName` varchar(16) NOT NULL,
    `lastName` varchar(16) NOT NULL,
    `gender` varchar(12) NOT NULL,
    `birthDATE` varchar(36) NULL,
    `username` varchar(16) NOT NULL,
    `phone` varchar(16) NOT NULL,
    `email` varchar(32) NOT NULL,
    `password` varchar(255) NOT NULL,
    `createdAt` varchar(36) NOT NULL,
    `updatedAt`  varchar(36) DEFAULT NULL,
    PRIMARY KEY (`user_id`)
  ) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8;
  

  