
DROP procedure if exists `GetUser`;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetUser`( IN usernameVar varchar(30), passwordVar char(100))
BEGIN
 	SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED ;
  	Select `UserID`, `username`, `buyingpower`
  	from useraccount
  	where Username = usernameVar
  	and Password = passwordVar
  	and END_DATE IS NULL;
  	SET SESSION TRANSACTION ISOLATION LEVEL REPEATABLE READ ;
END$$
DELIMITER ;


DROP procedure if exists `GetPortfolioByUser`;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetPortfolioByUser`(IN userIDVar int)
BEGIN
 	SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED ;
  	Select NumberOwned, MarketPrice, ShortName, Symbol, MarketPrice, ShortName, Symbol, MarketChange
  	from 	portfolio
  	where 	UserAccountID = userIDVar;
  	SET SESSION TRANSACTION ISOLATION LEVEL REPEATABLE READ ;
END$$
DELIMITER ;

DROP procedure if exists `GetFriendsListByUserID`;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetFriendsListByUserID`(IN userIDVar int)
BEGIN
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
DELIMITER ;

DROP procedure if exists `CreateFriendshipRecord`;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `CreateFriendshipRecord`(IN userIDOneVar int, userIDTwoVar int)
BEGIN
 	SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED ;
  	
	SET @countExistingFriendship = (select Count(friendshipId)	from friendship where (FriendOneUserAccountId = userIDOneVar and FriendTwoUserAccountID = userIDTwoVar) or (FriendOneUserAccountId = userIDTwoVar and FriendTwoUserAccountID = userIDOneVar));

	IF @countExistingFriendship = 0 THEN
	
	 	INSERT INTO `Friendship` (friendoneuseraccountid, friendtwouseraccountid) 
		VALUES (userIDOneVar, userIDTwoVar);
	END IF;

  	SET SESSION TRANSACTION ISOLATION LEVEL REPEATABLE READ ;
END$$
DELIMITER ;


DROP procedure if exists `UpsertPortfolioRecord`;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `UpsertPortfolioRecord`(IN userIDVar int, numOwnedVar int, marketPriceVar decimal(10,0), shortNameVar varchar(50), symbolVar varchar(10), marketChangeVar decimal(10,0))
BEGIN
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


DROP procedure if exists `CreateUser`;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `CreateUser`( IN usernameVar varchar(30), passwordVar char(100), emailVar varchar(80))
BEGIN
 	SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED ;
	INSERT INTO `useraccount` (username, password, emailaddress, BuyingPower)
	VALUES (usernameVar, passwordVar, emailVar, 2000); 	
  	SET SESSION TRANSACTION ISOLATION LEVEL REPEATABLE READ ;
END$$
DELIMITER ;


DROP procedure if exists `UpdateBuyingPower`;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `UpdateBuyingPower`( IN userIdVar int, buyingPowerVar decimal(10,2))
BEGIN
 	SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED ;
	UPDATE `useraccount`
	SET 	buyingpower = buyingPowerVar
	WHERE	userId = userIdVar; 	
  	SET SESSION TRANSACTION ISOLATION LEVEL REPEATABLE READ ;
END$$
DELIMITER ;

ALTER TABLE `useraccount` CHANGE `BuyingPower` `BuyingPower` DECIMAL(10,2) NOT NULL DEFAULT '2000.00';



DROP procedure if exists `GetLatestForumMessages`;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetLatestForumMessages`()
BEGIN
    SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED ;
        select  acc.UserName as 'UserName',
                f.message as 'Message'
        from    forummessages f,
                useraccount acc
        WHERE   f.UserID = acc.UserID
        AND     TIMESTAMPDIFF(HOUR,CURRENT_TIMESTAMP,f.Create_Date) >= -2
		ORDER BY f.Create_Date desc;
    SET SESSION TRANSACTION ISOLATION LEVEL REPEATABLE READ ;
END$$


DROP procedure if exists `InsertForumMessage`;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `InsertForumMessage`(IN userIDVar int, messageVar varchar(255))
BEGIN
 	SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED ;
  		INSERT INTO `forummessages` (UserID, message)
		VALUES (userIDVar, messageVar);

		CALL `GetLatestForumMessages`();
	SET SESSION TRANSACTION ISOLATION LEVEL REPEATABLE READ ;		
END$$
DELIMITER ;		




DROP procedure if exists `UpdateBuyingPower`;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `UpdateBuyingPower`( IN userIdVar int, buyingPowerVar decimal(10,2))
BEGIN
 	SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED ;
		select 	acc.UserName as `UserName`,
				f.message as 'Message'
		from 	forummessages f,
				useraccount acc
		WHERE 	f.UserID = acc.UserID
		AND 	TIMESTAMPDIFF(HOUR,GETDATE(),f.CreateDate) >= -2;
  	SET SESSION TRANSACTION ISOLATION LEVEL REPEATABLE READ ;
END$$