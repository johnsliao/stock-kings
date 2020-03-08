DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetUser`( IN usernameVar varchar(30), passwordVar char(100))
BEGIN
 	SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED ;
  	Select `UserID`
  	from useraccount
  	where Username = usernameVar
  	and Password = passwordVar;
  	SET SESSION TRANSACTION ISOLATION LEVEL REPEATABLE READ ;
END$$
DELIMITER ;



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
