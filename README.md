| **Ethiopian Dating App** |  
|--------------------------|  
| **Description:** Web app created to replicate the functionalities of a dating application, similar to Tinder, but designed specifically for Ethiopian users. |  
| **GitHub Repository:** [https://github.com/FiranmitM/Ethiopian_Dating_App](https://github.com/FiranmitM/Ethiopian_Dating_App) |  

| **Installation Instructions:** |  
|------------------------------|  
| **Prerequisites:** Ensure you have [Docker](https://www.docker.com/) installed and running on your machine. If Docker is not installed, use the `init_docker.sh` script. |  
| **1. Clone the repository:** `git clone https://github.com/FiranmitM/Ethiopian_Dating_App` |  
| **2. Navigate to the project root and run:** `docker-compose up --build` (takes ~3 minutes). |  
| **3. To create users, go to `/script` folder and run:** `docker-compose up --build`. |  
| **4. Open browser:** `localhost:3000` (App) | `localhost:8080` (DB Admin Panel) |  
| **5. Use a pre-generated user for testing:** |  
| **Username:** Nestor4 | **Password:** Matcha1! |  
| **Or create a new user with a profile pic and interests for better matching.** |  

| **Tech Stack:** |  
|---------------|  
| **Frontend:** React, Redux, Material UI |  
| **Backend:** Node.js, Express |  
| **Database:** PostgreSQL (No ORM allowed) |  
| **Chat:** Socket.io |  
| **Containerization:** Docker (docker-compose) |  
| **Architecture:** MVC (Model-View-Controller) |  
| **Design Pattern:** Single-Page Application (SPA) |  

| **Fame Rating System:** |  
|-------------------------|  
| **5 points** for profile setup |  
| **2 points** per picture uploaded |  
| **1 point** per tag added |  
| **10 points** per received like |  
| **5 points** per match |  

| **Matching Algorithm:** |  
|------------------------|  
| **Inputs:** Max browsing criteria (age, fame, distance) & filtered users (sex orientation, max distance). |  
| **Sorting Logic:** Users with at least one common tag are ranked by dividing distance by common tags squared. |  
| **Purpose:** Prioritizes users with shared interests over just geographical proximity. |  

| **Project Constraints:** |  
|-------------------------|  
| ❌ **Forbidden Tech:** ORM, Validators, User Account Managers – implemented manually. |  
| ✅ **Allowed DBs:** Relational (SQL) or Graph-Oriented (No document-based DB like MongoDB). |  
| **Chosen DB:** PostgreSQL |  

| **List of Features:** |  
|----------------------|  
| ✔️ User registration and email verification. |  
| ✔️ Profile creation and editing. |  
| ✔️ Search functionality to find other users. |  
| ✔️ Like and match system. |  
| ✔️ View profile visitors. |  
| ✔️ Real-time chat with matches using Socket.io. |  
| ✔️ Online status indicator. |  
| ✔️ User recommendations based on location and interests. |  
| ✔️ Secure authentication & session management. |  

| **UI Design Goals:** |  
|---------------------|  
| The UI aims to resemble **Tinder**, ensuring a familiar and smooth user experience. |  
| **Screenshots of UI layouts:** *[Link to design document]* |  
| **Database Schema:** *[Link to DB Diagram]* |  

| **Summary:** This Ethiopian Dating App is designed to connect people efficiently using a robust recommendation algorithm and real-time communication features. 🚀 |  
