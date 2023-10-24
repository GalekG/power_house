/*
SQLyog Ultimate v13.1.1 (64 bit)
MySQL - 10.4.28-MariaDB : Database - power_house
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`power_house` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci */;

USE `power_house`;

/*Table structure for table `DaysOfWeek` */

DROP TABLE IF EXISTS `DaysOfWeek`;

CREATE TABLE `DaysOfWeek` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(10) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

/*Data for the table `DaysOfWeek` */

/*Table structure for table `ExerciseMachines` */

DROP TABLE IF EXISTS `ExerciseMachines`;

CREATE TABLE `ExerciseMachines` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `exerciceId` bigint(20) NOT NULL,
  `machineId` bigint(20) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `exerciceId` (`exerciceId`),
  KEY `machineId` (`machineId`),
  CONSTRAINT `exercisemachines_ibfk_1` FOREIGN KEY (`exerciceId`) REFERENCES `Exercises` (`id`),
  CONSTRAINT `exercisemachines_ibfk_2` FOREIGN KEY (`machineId`) REFERENCES `Machines` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

/*Data for the table `ExerciseMachines` */

/*Table structure for table `Exercises` */

DROP TABLE IF EXISTS `Exercises`;

CREATE TABLE `Exercises` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(25) NOT NULL,
  `muscleGroup` varchar(50) NOT NULL,
  `description` text DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

/*Data for the table `Exercises` */

/*Table structure for table `Genders` */

DROP TABLE IF EXISTS `Genders`;

CREATE TABLE `Genders` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(25) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

/*Data for the table `Genders` */

insert  into `Genders`(`id`,`name`,`createdAt`,`updatedAt`) values 
(1,'Hombre','2023-10-23 22:22:20',NULL),
(2,'Mujer','2023-10-23 22:22:27',NULL);

/*Table structure for table `Machines` */

DROP TABLE IF EXISTS `Machines`;

CREATE TABLE `Machines` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(25) NOT NULL,
  `description` text DEFAULT NULL,
  `muscleGroup` varchar(30) NOT NULL,
  `quantity` int(11) DEFAULT 1,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

/*Data for the table `Machines` */

/*Table structure for table `Memberships` */

DROP TABLE IF EXISTS `Memberships`;

CREATE TABLE `Memberships` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `userId` bigint(20) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `memberships_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

/*Data for the table `Memberships` */

/*Table structure for table `Roles` */

DROP TABLE IF EXISTS `Roles`;

CREATE TABLE `Roles` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(25) NOT NULL,
  `description` text DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

/*Data for the table `Roles` */

insert  into `Roles`(`id`,`name`,`description`,`createdAt`,`updatedAt`) values 
(1,'admin','Administrador del sistema','2023-10-23 22:21:53',NULL),
(2,'usuario','Cliente del gimnasio','2023-10-23 22:21:56',NULL);

/*Table structure for table `RoutineSchedules` */

DROP TABLE IF EXISTS `RoutineSchedules`;

CREATE TABLE `RoutineSchedules` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `userId` bigint(20) NOT NULL,
  `routineId` bigint(20) NOT NULL,
  `dayOfWeekId` bigint(20) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `routineId` (`routineId`),
  KEY `dayOfWeekId` (`dayOfWeekId`),
  CONSTRAINT `routineschedules_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`),
  CONSTRAINT `routineschedules_ibfk_2` FOREIGN KEY (`routineId`) REFERENCES `WorkoutRoutines` (`id`),
  CONSTRAINT `routineschedules_ibfk_3` FOREIGN KEY (`dayOfWeekId`) REFERENCES `DaysOfWeek` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

/*Data for the table `RoutineSchedules` */

/*Table structure for table `RoutinesExercises` */

DROP TABLE IF EXISTS `RoutinesExercises`;

CREATE TABLE `RoutinesExercises` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `routineId` bigint(20) NOT NULL,
  `exerciseId` bigint(20) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `routineId` (`routineId`),
  KEY `exerciseId` (`exerciseId`),
  CONSTRAINT `routinesexercises_ibfk_1` FOREIGN KEY (`routineId`) REFERENCES `WorkoutRoutines` (`id`),
  CONSTRAINT `routinesexercises_ibfk_2` FOREIGN KEY (`exerciseId`) REFERENCES `Exercises` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

/*Data for the table `RoutinesExercises` */

/*Table structure for table `Transactions` */

DROP TABLE IF EXISTS `Transactions`;

CREATE TABLE `Transactions` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `membershipId` bigint(20) NOT NULL,
  `startDate` datetime NOT NULL,
  `endDate` datetime NOT NULL,
  `value` float DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `membershipId` (`membershipId`),
  CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`membershipId`) REFERENCES `Memberships` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

/*Data for the table `Transactions` */

/*Table structure for table `UserRoles` */

DROP TABLE IF EXISTS `UserRoles`;

CREATE TABLE `UserRoles` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `userId` bigint(20) NOT NULL,
  `roleId` bigint(20) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `roleId` (`roleId`),
  CONSTRAINT `userroles_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`),
  CONSTRAINT `userroles_ibfk_2` FOREIGN KEY (`roleId`) REFERENCES `Roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

/*Data for the table `UserRoles` */

insert  into `UserRoles`(`id`,`userId`,`roleId`,`createdAt`,`updatedAt`) values 
(1,4,1,'2023-10-24 00:06:51',NULL);

/*Table structure for table `Users` */

DROP TABLE IF EXISTS `Users`;

CREATE TABLE `Users` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `identification` varchar(25) NOT NULL,
  `names` varchar(50) NOT NULL,
  `lastnames` varchar(50) NOT NULL,
  `birthdate` date NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `address` varchar(50) DEFAULT NULL,
  `weight` int(11) NOT NULL,
  `height` int(11) NOT NULL,
  `bloodType` varchar(5) DEFAULT NULL,
  `genderId` bigint(20) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `genderId` (`genderId`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`genderId`) REFERENCES `Genders` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

/*Data for the table `Users` */

insert  into `Users`(`id`,`username`,`password`,`identification`,`names`,`lastnames`,`birthdate`,`email`,`address`,`weight`,`height`,`bloodType`,`genderId`,`createdAt`,`updatedAt`) values 
(4,'admin','$2b$10$.6j9IucWq5AhKA6ypyEwoObBK1MEKUX1KWHEHIKqWwdoGd0sj1vf2','123','Administrador','del sistema','0000-00-00',NULL,NULL,65,178,NULL,1,'2023-10-24 00:06:51',NULL);

/*Table structure for table `WorkoutRoutines` */

DROP TABLE IF EXISTS `WorkoutRoutines`;

CREATE TABLE `WorkoutRoutines` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(25) NOT NULL,
  `description` text DEFAULT NULL,
  `difficulty` varchar(25) DEFAULT 'Principiante',
  `goal` varchar(25) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

/*Data for the table `WorkoutRoutines` */

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
