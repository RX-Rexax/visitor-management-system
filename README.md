# visitor-management-system
## Created by Rickson

What you need first to run the application locally:
1. VS Code Installed
2. MySQL Workbench and MySQL installed (Not sure about XAMPP, but I think it's possible).
3. Node.js

How to import Database (MySQL Workbench):
1. Open MySQL Workbench and Connect to your MySQL database (Make sure to run your SQL with the default PORT 3306).
2. Click 'Server' on the main tool bar.
3. Select Data Import.
4. Select 'Import from Self-Contained File' and browse to the .sql file provided and click 'Start Import' on the bottom right.
5. Import Both 'visitor_management_system_user' and 'visitor_management_system_visitor'
6. You should be able to see two tables called 'users' and 'visitor'

How to Run:
1. Open 'visitor-management-system' folder using VSCode
2. After the folder is opened in VSCode, Open 2 Terminals (On toolbar Terminal -> New Terminal)
3. After Opening Both Terminals, Change the folder directory to 'backend' by typing 'CD backend' on the First Terminal.
4. After changing directory, type 'NPM INSTALL' on the First Terminal.
5. After Finished Installing, type 'NPM START' to run the backend.
6. Next, open Second Terminal and change directory to 'client' by typing 'CD client'.
7. After changing the directory, type 'NPM install --legacy-peer-deps' to install the modules.
8. After Installing, type 'NPM START' on the second terminal to run the Web Application.

How to Use the Visitor Management System:
1. When launched, it will redirect to the check-in pages
2. Enter the necessary information before check-in
3. After entering the information, click on the check-in Button
4. It will redirect to the next page where you can check-out when you leave the location.
5. After check-out, you will be redirected to the check-in page again.

How to Login as an admin:
1. Click on the 'Login' in the check-in page
2. When redirected to the 'Login' page, enter the username and password to log into the admin dashboard.
3. You will see all the visitors that has checked-in before and all the necessary details regarding the visitors.
4. When there are visitors that have not checked out yet, you can click on the 'Check Out' button to make the visitor check out.


## Screenshots

#### Check-In Page
![image](https://user-images.githubusercontent.com/80836157/232684845-9efbf6ae-05ab-4e9c-af68-cd15971abcc7.png)

#### Check-Out Page
![image](https://user-images.githubusercontent.com/80836157/232685097-a245fea5-7e0d-4eba-87d9-cf983ff7364d.png)

#### Login Page (for Admin)
![image](https://user-images.githubusercontent.com/80836157/232685509-d3d222d8-4c95-4ffb-a797-f8adac282314.png)

#### Admin Dashboard
![image](https://user-images.githubusercontent.com/80836157/232685836-5db2a357-8863-4dc9-9077-8c2665daa174.png)
