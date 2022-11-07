
## Vision

A place for users to search jobs and get a liveability (vibes) score for each job's city. The user will be able to save, update with their own rating, and delete job entries.
This solves a pain point of wanting to consider the liveability of a city where a job is located and help users make better decisions in their job search.
People should care about this product because it helps them improve their lives be taking into account the real experience of having a job and living in a particular place.


## Scope

### In
- Job search, city liveability scores
- Saving jobs and ranking them based on a personal score
- Delivering useful data to the user in an attractive and clear way.

### Out
- We aren't showing the individual restaurants, etc, just a score.
- We are not making a wearable device friendly app


## MVP
The job search will return up to 10-20 results with information about the location's liveability.
The user will be able to log in with OAuth and see a personal list of saved jobs, update items on this list, or delete them.

Stretch goals:
- A map of the saved jobs
- Connect to application information for the job with a modal that connects to the user's email.
- Really fancy CSS transitions when a job is clicked or saved, etc

## Functional requirements
- display jobs list with city score
- save jobs
- display more detailed information about city score and allow user to give a rating in a modal when a button is clicked on the job
- delete jobs
- login/logout/user profile information handling with OAuth

## Non-functional requirements

- Security: OAuth to protect the users choices about jobs they're interested in.
- Usability: How to navigate through the site will be clear and interpretable by the user.

