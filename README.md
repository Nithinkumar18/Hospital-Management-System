
# Hospital Management System (Backend Service)

This backend service manages hospital operations, including patients, doctors, appointments, billing, and user access management efficiently.

## Project Setup
- **Install Dependencies:** `npm install`
- **Run Application:** `npm start` (Runs on the port defined in the `.env` file)
- **Run Tests:** `npm test`

## Application Overview
The system comprises five core modules:
1. **User Management**
2. **Patient Management**
3. **Doctor Management**
4. **Appointment Management**
5. **Billing Management**

## Access Control
Users can have one of the following roles:
- **Admin**: Full access to manage hospital operations.
- **Staff**: Can manage patients, doctors, and appointments.
- **Doctor**: Can manage patient appointments and their records.

---

# 1. User Management

### 1.1 User Registration [#POST]
**Endpoint:** `POST /user/api/signup`

**Payload:**
```json
{
    "username": "",
    "password": "",
    "role": "",  
    "email": "",
    "contactNumber": ""
}
```

### 1.2 User Login [#POST]
**Endpoint:** `POST /user/api/login`

**Payload:**
```json
{
    "email": "",
    "password": ""
}
```
**Response:** If successful, returns a token (valid for 900 seconds) required for authenticated requests.

### 1.3 View Users [#GET]
**Endpoint:** `GET /user/api/view`
- Accessible only by Admin.
- Unauthorized access returns an error.

### 1.4 Update User [#PUT]
**Endpoint:** `PUT /user/api/update/{id}`
- Requires authentication token in headers.

### 1.5 Delete User [#DELETE]
**Endpoint:** `DELETE /user/api/deactivateAcc/{id}`
- Only Admins can delete user accounts.

---

# 2. Doctor Management

### Doctor Model
```json
{
    "user": "User ID (Reference)",
    "specialization": "",
    "patients": []
}
```

### 2.1 View All Doctors [#GET]
**Endpoint:** `GET /api/doctor/viewdoctors`

### 2.2 Get Total Doctors Count [#GET]
**Endpoint:** `GET /api/doctor/records`

### 2.3 Add Doctor [#POST]
**Endpoint:** `POST /api/doctor/addDoctor`

### 2.4 Assign Patients to Doctor [#PUT]
**Endpoint:** `PUT /api/doctor/bookConsultation/{id}`

**Payload:**
```json
{
    "patientID": ""
}
```

---

# 3. Patient Management

### Patient Model
```json
{
    "name": "",
    "age": ,
    "email": "",
    "gender": "",
    "address": "",
    "contactNumber": "",
    "medicalHistory": [],
    "isActive": true
}
```

### 3.1 Register Patient [#POST]
**Endpoint:** `POST /patient/api/register`

### 3.2 View Total Patient Count [#GET]
**Endpoint:** `GET /patient/api/records`

### 3.3 View All Patients [#GET]
**Endpoint:** `GET /patient/api/viewPatients`

### 3.4 Update Patient Record [#PUT]
**Endpoint:** `PUT /patient/api/profileupdate/{pid}`

### 3.5 Deactivate Patient Record [#PUT]
**Endpoint:** `PUT /patient/api/deactivate/{pid}`
- Sets `isActive` to `false`.

### 3.6 View Patient Profile [#GET]
**Endpoint:** `GET /patient/api/profile/{id}`

---

# 4. Appointment Management

### Appointment Model
```json
{
    "patient": "Patient ID (Reference)",
    "doctor": "Doctor ID (Reference)",
    "date": "",
    "time": "",
    "visitReason": "",
    "status": "Scheduled"
}
```

### 4.1 Schedule Appointment [#POST]
**Endpoint:** `POST /appointment/api/schedule`

**Payload:**
```json
{
    "patient": "",
    "doctor": "",
    "date": "",
    "time": "",
    "visitReason": "",
    "status": "Scheduled"
}
```

### 4.2 View All Appointments [#GET]
**Endpoint:** `GET /appointment/api/appointments`

### 4.3 View Appointments for Doctor [#GET]
**Endpoint:** `GET /appointment/api/doctor/{doctorId}`

### 4.4 View Appointments for Patient [#GET]
**Endpoint:** `GET /appointment/api/patient/{patientId}`

### 4.5 Update Appointment [#PUT]
**Endpoint:** `PUT /appointment/api/update/{appointmentID}`

### 4.6 Delete Appointment [#DELETE]
**Endpoint:** `DELETE /appointment/api/remove/{appointmentId}`

### 4.7 View Appointments by Status [#GET]
**Endpoint:** `GET /appointment/api/byStatus/{status}`

---

# 5. Billing Management

### Billing Model
```json
{
    "patient": "Patient ID (Reference)",
    "appointment": "Appointment ID (Reference)",
    "amount": 2500,
    "status": "Unpaid"
}
```

### 5.1 View All Bills [#GET]
**Endpoint:** `GET /bill/api/allbills`

### 5.2 View Patient Bills [#GET]
**Endpoint:** `GET /bill/api/patientBill/{pid}`

### 5.3 Add Bill [#POST]
**Endpoint:** `POST /bill/api/upload`

**Payload:**
```json
{
    "patient": "",
    "appointment": "",
    "amount": 2500,
    "status": "Unpaid"
}
```

### 5.4 Update Bill [#PUT]
**Endpoint:** `PUT /bill/api/updatebill/{bid}`

### 5.5 Delete Bill [#DELETE]
**Endpoint:** `DELETE /bill/api/delete/{bid}`

### 5.6 Get Total Revenue [#GET]
**Endpoint:** `GET /bill/api/revenue`

### 5.7 Get Revenue for Date Range [#GET]
**Endpoint:** `GET /bill/api/customRange/{date_range1}/{date_range2}`

---

## Summary
- **Admin**: Full access to manage users, doctors, patients, appointments, and billing.
- **Staff**: Manages doctors, patients, and appointments.
- **Doctors**: Manages patient appointments and records.

This structured API documentation ensures efficient hospital management through well-defined access controls and functionalities.

