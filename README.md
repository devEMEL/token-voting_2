### TOKEN VOTING

A simple beaker application that allows voters to vote by holding a specific amount of ASA

- The ASA has already been created
- you can optin to both the contract and ASA, and transfer some ASA to yourself.
- You can cast your vote provided you meet the requirement of the specified amount of the token.
- You can clear your vote.

N/B: Uncomment the requirements.txt for usage.

Demo link: https://zingy-pixie-bb6d45.netlify.app/

### How to vote

please enter an amount of the asset ENS you would like the contract to send to you, then click transfer asset button. Remember, if you request less than 1000, when you cast your vote it wont be recorded and you cant be able to vote

Create registration and voting (sets the period of time for registration)
Registration is between 2 to 10 minutes of clicking this button - (create_registration_and_voting)
casting vote and clearing vote is between 15 minutes to 3 hour of clicking this function - (create_registration_and_voting)
so the interval between registration and voting is 10 minutes, during registration period, please register all the wallet you would use for testing and wait for voting period.
In voting period, you can cast vote or clear vote. 
Number of voters and vote count only increment if you vote yes.
You can always call the function (create_registration_and_voting) to reset the time again.