/*
SQLyog Community v12.4.1 (64 bit)
MySQL - 10.2.7-MariaDB : Database - sqylztc
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`sqylztc` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `sqylztc`;

/*Table structure for table `address` */

DROP TABLE IF EXISTS `address`;

CREATE TABLE `address` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `value` varchar(20) DEFAULT NULL,
  `label` varchar(50) DEFAULT NULL,
  `d_id` varchar(50) DEFAULT NULL,
  `d_name` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8;

/*Data for the table `address` */

insert  into `address`(`id`,`value`,`label`,`d_id`,`d_name`) values 
(1,'xcfjA15','新城枫景A1-5号楼','zhansan19950721','张三'),
(2,'xcfjA610','新城枫景A6-10号楼','lisi19950721','李四'),
(3,'xcfjB16','新城枫景B1-6号楼','wangwu19950721','王五'),
(4,'xcfjC16','新城枫景C1-6号楼','zhansan19950721','张三'),
(5,'xcfjD17','新城枫景D1-7号楼','zhansan19950721','张三'),
(6,'xcfjD813','新城枫景D8-13号楼','zhansan19950721','张三'),
(7,'hbjshyA19','湖滨教师花园A1-9号楼','zhansan19950721','张三'),
(8,'hbjshyA1018','湖滨教师花园A10-18号楼','zhansan19950721','张三'),
(9,'hbjshyA1926','湖滨教师花园A19-26号楼','zhansan19950721','张三'),
(10,'hbjshyB17','湖滨教师花园B1-7号楼','zhansan19950721','张三'),
(11,'hbjshyB8102123','湖滨教师花园B8-10、21-23号楼','zhansan19950721','张三'),
(12,'hbjshyB24-31','湖滨教师花园B24-31号楼','zhansan19950721','张三'),
(13,'hbjshyB32-39','湖滨教师花园B32-39号楼','zhansan19950721','张三'),
(14,'hbjshyB3945','湖滨教师花园B39-45号楼','zhansan19950721','张三'),
(15,'hbjshyC16','湖滨教师花园C1-6号楼','zhansan19950721','张三'),
(16,'hbjshyC715','湖滨教师花园C7-15号楼','zhansan19950721','张三'),
(17,'blctE14','柏林春天E1-4号楼','zhansan19950721','张三'),
(18,'blctABCDFGH','柏林春天ABCDFGH号楼','zhansan19950721','张三'),
(19,'jxhc19','锦绣华城1-9号楼','zhansan19950721','张三'),
(20,'jxhc1018','锦绣华城10-18号楼','zhansan19950721','张三'),
(21,'bhjy111','滨湖佳苑1-11号楼','zhansan19950721','张三'),
(22,'bzhf111','滨州华府1-11号楼','zhansan19950721','张三'),
(23,'bzhf1221','滨州华府12-21号楼','zhansan19950721','张三'),
(24,'hmjyA17','惠民家园A1-7号楼','zhansan19950721','张三'),
(25,'hmjyA814','惠民家园A8-14号楼','zhansan19950721','张三'),
(26,'hmjyB17','惠民家园B1-7号楼','zhansan19950721','张三'),
(27,'hmjyB814','惠民家园B8-14号楼','zhansan19950721','张三'),
(28,'nsjy110','嫩水家园1-10号楼','zhansan19950721','张三'),
(29,'nsjy1120','嫩水家园11-20号楼','zhansan19950721','张三'),
(30,'ysw210','怡水湾2-10号楼','zhansan19950721','张三'),
(31,'ysw1118','怡水湾11-18号楼','zhansan19950721','张三'),
(32,'ysw1926','怡水湾19-26号楼','zhansan19950721','张三');

/*Table structure for table `admin` */

DROP TABLE IF EXISTS `admin`;

CREATE TABLE `admin` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `a_user` varchar(10) DEFAULT NULL,
  `a_password` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `admin` */

/*Table structure for table `common_phone` */

DROP TABLE IF EXISTS `common_phone`;

CREATE TABLE `common_phone` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `title` varchar(20) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

/*Data for the table `common_phone` */

insert  into `common_phone`(`id`,`title`,`phone`) values 
(1,'急救电话','120'),
(2,'高新区黎明街道社区卫生服务中心','8999211'),
(3,'黎明街道五湖社区卫生服务站','8977118'),
(4,'黎明街道学苑社区卫生服务站','4338831'),
(5,'黎明街道黎明社区卫生服务站','4677590');

/*Table structure for table `doctor` */

DROP TABLE IF EXISTS `doctor`;

CREATE TABLE `doctor` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `d_name` varchar(10) DEFAULT NULL,
  `d_technicalTitle` varchar(10) DEFAULT NULL,
  `d_committee` varchar(10) DEFAULT NULL,
  `d_tel` varchar(11) DEFAULT NULL,
  `d_patientNum` int(10) DEFAULT NULL,
  `d_abstract` text DEFAULT NULL,
  `d_password` varchar(20) DEFAULT NULL,
  `d_face` text DEFAULT NULL,
  `d_id` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

/*Data for the table `doctor` */

insert  into `doctor`(`id`,`d_name`,`d_technicalTitle`,`d_committee`,`d_tel`,`d_patientNum`,`d_abstract`,`d_password`,`d_face`,`d_id`) values 
(1,'张三','全科医生','五湖居委','17611580721',787,'如果你无法简洁的表达你的想法，那只说明你还不够了解它。','123456','../../../static/img/doctor.jpg','zhansan19950721'),
(3,'李四','牙科医生','六洲居委','15776573881',787,'如果你无法简洁的表达你的想法，那只说明你还不够了解它。 ','123456','../../../static/img/doctor.jpg','wangwu19950721'),
(4,'王五','皮肤科医生','朝阳居委','13889898937',878,'如果你无法简洁的表达你的想法，那只说明你还不够了解它。 ','123456','../../../static/img/doctor.jpg','lisi19950721');

/*Table structure for table `patient` */

DROP TABLE IF EXISTS `patient`;

CREATE TABLE `patient` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `p_name` varchar(20) DEFAULT NULL,
  `p_tel` varchar(11) DEFAULT NULL,
  `p_password` varchar(20) DEFAULT NULL,
  `p_houseNum` varchar(20) DEFAULT NULL,
  `p_face` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

/*Data for the table `patient` */

insert  into `patient`(`id`,`p_name`,`p_tel`,`p_password`,`p_houseNum`,`p_face`) values 
(5,'M6-$dtvn','qweqweqwe','qweqweqwe','xcfjA610',NULL),
(6,'v_16358471','aaa','asadasdad','xcfjB16',NULL),
(7,'v_22693476','17611580721','132456','xcfjC16',NULL);

/*Table structure for table `patientgroup` */

DROP TABLE IF EXISTS `patientgroup`;

CREATE TABLE `patientgroup` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `age` int(3) DEFAULT NULL,
  `height` varchar(5) DEFAULT NULL,
  `weight` varchar(10) DEFAULT NULL,
  `profession` varchar(10) DEFAULT NULL,
  `history` text DEFAULT NULL,
  `name` varchar(10) DEFAULT NULL,
  `fromLoginUser` varchar(20) DEFAULT NULL,
  `sex` varchar(5) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

/*Data for the table `patientgroup` */

insert  into `patientgroup`(`id`,`age`,`height`,`weight`,`profession`,`history`,`name`,`fromLoginUser`,`sex`) values 
(5,23,'175cm','101kg','IT程序员','胃病','张三','17611580721','男'),
(6,23,'175','404','去去去',' 凄凄切切','李四','17611580721','男'),
(9,23,'787','8564','45','13','张三','17611580721','女');

/*Table structure for table `record` */

DROP TABLE IF EXISTS `record`;

CREATE TABLE `record` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `record_group_id` int(10) DEFAULT NULL COMMENT '群组id',
  `content` text DEFAULT NULL,
  `time` varchar(20) DEFAULT NULL,
  `receiver` varchar(20) DEFAULT NULL,
  `send` varchar(20) DEFAULT NULL,
  `state` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `record` */

/*Table structure for table `record_group` */

DROP TABLE IF EXISTS `record_group`;

CREATE TABLE `record_group` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `d_id` int(10) DEFAULT NULL COMMENT '医生id',
  `p_id` int(10) DEFAULT NULL COMMENT '患者id',
  `time` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `record_group` */

/*Table structure for table `toutiao` */

DROP TABLE IF EXISTS `toutiao`;

CREATE TABLE `toutiao` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) DEFAULT NULL,
  `abstract` text DEFAULT NULL,
  `see_num` int(10) DEFAULT NULL,
  `time` varchar(20) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `img` text DEFAULT NULL,
  `from` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

/*Data for the table `toutiao` */

insert  into `toutiao`(`id`,`title`,`abstract`,`see_num`,`time`,`content`,`img`,`from`) values 
(1,'春节后如何养生？饮食心理齐调理 ','喜庆团圆的春节七天假期很快过去了，很多朋友难以一下恢复正常状态。该如何帮助大家快速调整好正常的生活工作状态呢，下面大家跟着小固一起学习春节后如何养生吧！',0,'2018-02-26','<img src=\"../../../static/img/healthy1.jpg\" />\r\n<p>喜庆团圆的春节七天假期很快过去了，很多朋友难以一下恢复正常状态。该如何帮助大家快速调整好正常的生活工作状态呢，下面大家跟着小固一起学习春节后如何养生吧！</p>\r\n<img src=\"../../../static/img/healthy2.jpg\" />\r\n<p>我国古代名医孙思邈说过：“春日宜省酸增甘，以养脾气。”意思是说，春季宜少吃酸的，多吃甜的。中医认为春季为肝气旺盛之时，多食酸味食品会使肝气过盛而损害脾胃，所以应少食酸味食品，宜吃甜味食品，以健脾胃之气。红枣正是这样一味春季养脾佳品，既可生吃，亦可做枣粥、枣糕，以及枣米饭。</p>','../../../static/img/healthy1.jpg','admin');

/*Table structure for table `zhishi` */

DROP TABLE IF EXISTS `zhishi`;

CREATE TABLE `zhishi` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `img` text DEFAULT NULL,
  `title` varchar(20) DEFAULT NULL,
  `abstract` text DEFAULT NULL,
  `see_num` int(10) DEFAULT NULL,
  `time` varchar(20) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `from` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `zhishi` */

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
