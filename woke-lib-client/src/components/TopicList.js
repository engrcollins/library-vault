//create users table
create table user_info(
  Id INT NOT NULL AUTO_INCREMENT,
  First_name VARCHAR(16) NOT NULL,
  Last_name VARCHAR(16) NOT NULL,
  Email VARCHAR(24) NOT NULL,
  Password VARCHAR(12) NOT NULL,
  Gender VARCHAR(10) NOT NULL,
  State VARCHAR(20) NOT NULL,
  Country VARCHAR(24) NOT NULL,
  Bio TEXT NOT NULL,
  Date_of_birth DATE NOT NULL,
  Phone_number VARCHAR(16) NOT NULL,
  Reg_date DATETIME NOT NULL,
  Business_owner INT NOT NULL,
  PRIMARY KEY ( Id )
);

//create profile image table
create table profile_image(
  Id INT NULL AUTO_INCREMENT,
  User_Id INT NOT NULL,
  img_path VARCHAR(254) NOT NULL,
  PRIMARY KEY ( Id )
);

//create business data table
create table business_data(
  Id INT NOT NULL AUTO_INCREMENT,
  User_Id INT references User_info(Id),
  Description TEXT,
  Confirmed BOOLEAN Default false,
  City VARCHAR(24) NOT NULL,
  State VARCHAR(20) NOT NULL,
  Category VARCHAR(24) NOT NULL,
  Grand_category VARCHAR(24) NOT NULL,
  Products VARCHAR(24) NOT NULL,
  Country VARCHAR(24) NOT NULL,
  PRIMARY KEY ( Id )
);

//create product table
create table product(
  Id INT NOT NULL AUTO_INCREMENT,
  Bus_data_Id INT references business_data(Id),
  Product_name VARCHAR(24) NOT NULL,
  PRIMARY KEY ( Id )
);

//create specialties/tags table
create table tags(
  Id INT NOT NULL AUTO_INCREMENT,
  Bus_data_Id INT references business_data(Id),
  Tag_name VARCHAR(24) NOT NULL,
  PRIMARY KEY ( Id )
);





//Insert registration data
INSERT INTO user_info
   (First_name, Last_name, Email, Password, Gender, State, Country, Bio, Date_of_birth, Phone_number, Reg_date, Business_owner)
   VALUES
   ('Barrack', 'Obama', 'barackobama@gmail.com', 'sasha', 'Male','Virginia', 'USA', 'The magic seller', '1999-12-17', '08023456789', '2020-05-05 15:30:00', '1' );
