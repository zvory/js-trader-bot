### JS Trader bot

This is a trader bot written in __JavaScript__ and __Node.js__ created for a certain securities trading competition run by a _Very Cool_ quantative finance firm (Name removed by request). The competition lasted 12 hours.

##### Decision Making Process
The trading algorithm analyses relationships between the __30-tick Moving Average__ and __5-tick Moving Average__. Once the two cross over and the most recent tick contains a favourable move in prices, our bot would execute a trade to take advantage of the trend.

This algorithm produced consistent results netting positive profit to loss ratios. 

##### File Breakdown
__networking.js__ handled networking and would execute the decisions given to it based on analysis in marketlog.js.

__marketLogic.js__ handles the decision making process and contains the trading algorithm.

__createMessage.js__ is used for formatting requests too and from the server.
