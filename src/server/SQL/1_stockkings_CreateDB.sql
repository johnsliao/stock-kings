-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Mar 06, 2020 at 01:26 AM
-- Server version: 5.7.24
-- PHP Version: 7.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `stockkings`
--
CREATE DATABASE IF NOT EXISTS `stockkings` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `stockkings`;

DROP TABLE IF EXISTS FRIENDSHIP;
DROP TABLE IF EXISTS PORTFOLIO;
DROP TABLE IF EXISTS STOCKNAMESLOOKUP;
DROP TABLE IF EXISTS USERACCOUNT;
DROP TABLE IF EXISTS TRANSACTIONS;

-- --------------------------------------------------------

--
-- Table structure for table `friendship`
--

CREATE TABLE IF NOT EXISTS `friendship` (
  `FriendshipID` int(11) NOT NULL AUTO_INCREMENT,
  `FriendOneUserAccountID` int(11) NOT NULL,
  `FriendTwoUserAccountID` int(11) NOT NULL,
  `CREATE_DATE` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `END_DATE` datetime DEFAULT NULL,
  PRIMARY KEY (`FriendshipID`),
  KEY `friendshipOneForeignKey` (`FriendOneUserAccountID`),
  KEY `friendshipTwoForeignKey` (`FriendTwoUserAccountID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `friendship`
--

INSERT INTO `friendship` (`FriendshipID`, `FriendOneUserAccountID`, `FriendTwoUserAccountID`, `CREATE_DATE`, `END_DATE`) VALUES
(1, 3, 4, '2020-02-20 18:40:42', NULL),
(2, 5, 3, '2020-02-20 18:40:51', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `portfolio`
--

CREATE TABLE IF NOT EXISTS `portfolio` (
  `StockID` int(11) NOT NULL AUTO_INCREMENT,
  `UserAccountID` int(11) NOT NULL,
  `NumberOwned` decimal(10,0) NOT NULL,
  `MarketPrice` decimal(10,0) NOT NULL,
  `ShortName` varchar(50) NOT NULL,
  `Symbol` varchar(10) NOT NULL,
  `MarketChange` decimal(10,0) NOT NULL,
  `PURCHASE_DATE` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `LAST_MODIFIED_DATE` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`StockID`),
  KEY `userIDForeignKey` (`UserAccountID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `portfolio`
--

INSERT INTO `portfolio` (`StockID`, `UserAccountID`, `NumberOwned`, `MarketPrice`, `ShortName`, `Symbol`, `MarketChange`, `PURCHASE_DATE`, `LAST_MODIFIED_DATE`) VALUES
(1, 3, '100', '350', 'Apple', 'APPL', '0', '2020-02-20 19:12:54', '2020-02-20 19:12:54');

-- --------------------------------------------------------

--
-- Table structure for table `stocknameslookup`
--

CREATE TABLE IF NOT EXISTS `stocknameslookup` (
  `Symbol` varchar(10) NOT NULL,
  `ShortName` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `useraccount`
--

CREATE TABLE IF NOT EXISTS `useraccount` (
  `UserID` int(11) NOT NULL AUTO_INCREMENT,
  `Username` varchar(30) NOT NULL,
  `Password` char(100) NOT NULL,
  `EmailAddress` varchar(80) NOT NULL,
  `BuyingPower` decimal(10,0) NOT NULL DEFAULT '2000',
  `CREATE_DATE` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `LAST_UPDATED_DATE` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `END_DATE` datetime DEFAULT NULL,
  PRIMARY KEY (`UserID`),
  UNIQUE KEY `UserID` (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `useraccount`
--

INSERT INTO `useraccount` (`UserID`, `Username`, `Password`, `EmailAddress`, `BuyingPower`, `CREATE_DATE`, `LAST_UPDATED_DATE`, `END_DATE`) VALUES
(3, 'zimei', 'value-3', 'value-4', '2000', '2020-02-13 18:46:49', '2020-02-13 18:46:49', NULL),
(4, 'ralph', 'value-3', 'value-4', '2000', '2020-02-20 18:39:29', '2020-02-20 18:39:29', NULL),
(5, 'marko', 'value-3', 'value-4', '2000', '2020-02-20 18:39:36', '2020-03-05 18:06:42', NULL);

--
-- Table structure for table `transactions`
--

CREATE TABLE IF NOT EXISTS `transactions` (
  `TransactionID` int(11) NOT NULL AUTO_INCREMENT,
  `UserAccountID` int(11) NOT NULL,
  `PurchasePrice` decimal(10,0) NOT NULL,
  `ShortName` varchar(50) NOT NULL,
  `Symbol` varchar(10) NOT NULL,
  `PURCHASE_DATE` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`TransactionID`),
  KEY `userIDForeignKeyTransactions` (`UserAccountID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `transactions`
--

-- --------------------------------------------------------


--
-- Constraints for dumped tables
--

--
-- Constraints for table `friendship`
--
ALTER TABLE `friendship`
  ADD CONSTRAINT `friendshipOneForeignKey` FOREIGN KEY (`FriendOneUserAccountID`) REFERENCES `useraccount` (`UserID`),
  ADD CONSTRAINT `friendshipTwoForeignKey` FOREIGN KEY (`FriendTwoUserAccountID`) REFERENCES `useraccount` (`UserID`);

--
-- Constraints for table `portfolio`
--
ALTER TABLE `portfolio`
  ADD CONSTRAINT `userIDForeignKey` FOREIGN KEY (`UserAccountID`) REFERENCES `useraccount` (`UserID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

DELIMITER $$
--
-- Procedures
--

DROP PROCEDURE IF EXISTS `CreateFriendshipRecord`;
DROP PROCEDURE IF EXISTS `GetFriendsListByUserID`;
DROP PROCEDURE IF EXISTS `GetPortfolioByUserID`;
DROP PROCEDURE IF EXISTS `GetUserByUserID`;
DROP PROCEDURE IF EXISTS `UpsertPortfolioRecord`;


CREATE DEFINER=`root`@`localhost` PROCEDURE `CreateFriendshipRecord` (IN `userIDOneVar` INT, `userIDTwoVar` INT)  BEGIN
 	SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED ;
  	
	SET @countExistingFriendship = (select Count(friendshipId)	from friendship where (FriendOneUserAccountId = userIDOneVar and FriendTwoUserAccountID = userIDTwoVar) or (FriendOneUserAccountId = userIDTwoVar and FriendTwoUserAccountID = userIDOneVar));

	IF @countExistingFriendship = 0 THEN
	
	 	INSERT INTO `Friendship` (friendoneuseraccountid, friendtwouseraccountid) 
		VALUES (userIDOneVar, userIDTwoVar);
	END IF;

  	SET SESSION TRANSACTION ISOLATION LEVEL REPEATABLE READ ;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `GetFriendsListByUserID` (IN `userIDVar` INT)  BEGIN
 	SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED ;
  	
    
		select 	acc.UserName as `FriendName`,
				acc.BuyingPower
		from 	friendship fri,
				useraccount acc
		WHERE 	fri.friendoneuseraccountid = userIDVar
		AND 	acc.UserID = fri.friendTwoUserAccountId

		UNION

		select 	acc.UserName as `FriendName`,
				acc.BuyingPower
		from 	friendship fri,
				useraccount acc
		WHERE 	fri.friendtwouseraccountid = userIDVar
		AND 	acc.UserID = fri.friendoneuseraccountid;
		    
  	SET SESSION TRANSACTION ISOLATION LEVEL REPEATABLE READ ;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `GetPortfolioByUserID` (IN `userIDVar` INT)  BEGIN
 	SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED ;
  	Select NumberOwned, MarketPrice, ShortName, Symbol, MarketPrice, ShortName, Symbol, MarketChange
  	from 	portfolio
  	where 	UserAccountID = userIDVar;
  	SET SESSION TRANSACTION ISOLATION LEVEL REPEATABLE READ ;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `GetUserByUserID` (IN `usernameVar` VARCHAR(30), IN `passwordVar` CHAR(100))  BEGIN
 	SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED ;
  	Select `UserID`
  	from useraccount
  	where Username = usernameVar
  	and Password = passwordVar;
  	SET SESSION TRANSACTION ISOLATION LEVEL REPEATABLE READ ;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `UpsertPortfolioRecord` (IN `userIDVar` INT, `numOwnedVar` INT, `marketPriceVar` DECIMAL(10,0), `shortNameVar` VARCHAR(50), `symbolVar` VARCHAR(10), `marketChangeVar` DECIMAL(10,0))  BEGIN
 	SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED ;
  	
	SET @countExistingStock = (select Count(stockID)	from portfolio where UserAccountId = userIDVar and ShortName = shortNameVar and symbol = symbolVar);

	IF @countExistingStock = 0 THEN
	
		INSERT INTO `portfolio` (UserAccountID, NumberOwned, MarketPrice, ShortName, Symbol, MarketChange)
		VALUES (userIDVar, numOwnedVar, marketPriceVar, shortNameVar, symbolVar, 0);

	ELSE

		UPDATE `portfolio`
		set  	NumberOwned = NumberOwned + numOwnedVar,
				MarketPrice = marketPriceVar,
				MarketChange = marketChangeVar
		where   UserAccountId = userIDVar
		and 	ShortName = shortNameVar
		and 	Symbol = symbolVar;


	END IF;


  	SET SESSION TRANSACTION ISOLATION LEVEL REPEATABLE READ ;
END$$

DELIMITER ;


