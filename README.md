# React boiler template by QuanTM

## Problem resolved

### Router permission by role

You can declare route in `src/routes` and it will auto generate nav and Routers  
It will get list permission in format `{resource}:{action}` example `employee:import` from api get user information and
check permission to display navigation menu and routes

### Import csv file and validate, preview data from client

Example in `http://localhost:3000/employees/import`  
Example file csv `example_import_employee.csv`

Used react-window to build `src/components/shared/VirtualTable`  to preview Big import data  
Virtual table is Available in Ant 5
