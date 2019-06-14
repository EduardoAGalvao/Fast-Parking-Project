# Fast Parking System
The project was created with the purpose of evaluating compliance with the Algorithms discipline of the technical course of Systems Development, realized at the vocational technical school SENAI Prof. "Vicente Amato".
---

## Proposal and Requirements
The main objective was to create, through a hypothetical situation, a vehicle control system for a parking lot called "Fast Parking", where the operator could have freedom to register customers and view the parking lots, as well as control the amount of charge per hour, without relying on a database or Internet access. No framework should be used to mount the system and it should follow specified wireframes.

In this way, the project should focus on creating JavaScript CRUD in its direct interaction with Web Storage, and should:

- Store vehicle information, including current date and time;

- Generate proof of vehicle and customer data at the time of entry;

- Enable the editing of the customer's name or vehicle license plate;

- Store prices per hour and other hours;

- Calculate the payment amount at the withdrawal of the vehicle;

- Display daily report containing the list of the vehicles that made payment and the daily yield;

- Validate all data entry fields.
---

## Technologies Used

- HTML / CSS

The basic structure of the system was assembled in HTML and CSS, without the use of frameworks, seeking a layout that was clean and efficient to the user.

- JavaScript

The language was used based on functional programming methodology, using arrow functions and auxiliary methods such as map(), filter(), reduce() and pipe(). Its use is also highlighted in the animations, as interaction with modal, and mainly for the communication with the local storage by Web Storage.

- Web Storage

One of the main requirements was that there was no reliance on communication with the internet and with servers, so Web Storage was defined as the most viable option. Two databases are created in it to store customer information, vehicles and parking prices.

*Everything made with a lot of curiosity and programming passion*
