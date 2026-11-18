# Aarogyam — Mental Health Care & Patient Management System (MHC-PMS)

**Aarogyam** is an enterprise-grade, multi-role psychiatric healthcare information and patient management system (MHC-PMS) designed for mental health hospital networks, outpatient specialty clinics, and regional satellite centers.

---

## 🏛️ System Role Hierarchy & Authority Structure

MHC-PMS implements a strict 4-tier Role-Based Access Control (RBAC) hierarchy where **Admin possesses universal authority**, followed by **Receptionist**, **Doctor**, and **Patient**:

```
┌─────────────────────────────────────────────────────────────┐
│  1. System Administrator (Super Admin: Shounak Sarkar)      │
│     ★ Universal Authority across all entities, credentials, │
│       accounts, clinical sync, and audit governance         │
└──────────────────────────────┬──────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────┐
│  2. Front Desk Receptionist (Medha Banerjee)                │
│     ★ Master appointment scheduling, admissions, visitor    │
│       waiting lounge, token tracking & billing invoicing    │
└──────────────────────────────┬──────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────┐
│  3. Attending Doctor (Dr. Shashank Pandey)                  │
│     ★ Clinical consultation queue, psychiatric EHR,         │
│       e-prescribing, psychometric scales & clinical risk    │
└──────────────────────────────┬──────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────┐
│  4. Outpatient Health Portal                                │
│     ★ Patient 1: Aaryan Kumar | Patient 2: Agniva Samaddar   │
│     ★ Personal EHR, self-booking, e-Rx & profile editing    │
└─────────────────────────────────────────────────────────────┘
```

---

## 👥 Real Stakeholder Profiles (No Dummy Doctors)

All roles represent real named stakeholders with individual login capabilities, editable photos, and credential management:

1. **System Administrator (Universal Authority)**
   - **Name**: Shounak Sarkar
   - **User ID**: `ADM-001`
   - **Email**: `shounak.sarkar@mhc-pms.org`
   - **Default Password**: `admin123`
   - **Authority**: Full root governance over all user accounts, credential creation/override, role assignments, cross-clinic synchronization, and statutory legal reports.

2. **Receptionist (Front Desk Operations)**
   - **Name**: Medha Banerjee
   - **User ID**: `REC-104`
   - **Email**: `medha.banerjee@mhc-pms.org`
   - **Default Password**: `reception123`
   - **Authority**: Patient registration, master appointments calendar (book/reschedule/cancel), visitor lounge check-ins, fee invoicing (UPI/Card/Cash), and counselling session allotments.

3. **Attending Doctor (Clinical Director - No Dummy Doctors)**
   - **Name**: Dr. Shashank Pandey
   - **User ID**: `DOC-001`
   - **Email**: `shashank.pandey@mhc-pms.org`
   - **Title**: Chief Consultant Psychiatrist & Clinical Director
   - **Qualifications**: MBBS, MD (Psychiatry - NIMHANS), DNB, FIPS
   - **OPD Suite**: Suite 204, East Wing (Timings: 09:00 AM - 04:00 PM, Fee: ₹1200)
   - **Default Password**: `doctor123`
   - **Authority**: Clinical queue management, psychiatric EHR, signing electronic prescriptions (e-Rx), ordering diagnostic & psychometric tests (PHQ-9, GAD-7, EEG), and clinical risk alerts.

4. **Patient 1 (Outpatient)**
   - **Name**: Aaryan Kumar
   - **User ID**: `PT-88204`
   - **Email**: `aaryan.kumar@example.com`
   - **Age / Blood Group**: 21 Years • A+
   - **Primary Diagnosis**: Generalized Anxiety Disorder (GAD)
   - **Default Password**: `patient123`
   - **Photo & Details**: Editable by personal login.

5. **Patient 2 (Outpatient)**
   - **Name**: Agniva Samaddar
   - **User ID**: `PT-88205`
   - **Email**: `agniva.samaddar@example.com`
   - **Age / Blood Group**: 22 Years • B+
   - **Primary Diagnosis**: Adult Attention & Sleep Phase Dysregulation
   - **Default Password**: `patient123`
   - **Photo & Details**: Editable by personal login.

---

## 🧭 Application Flow & Navigation

1. **Public Hospital Landing Page (`LandingView`)**
   - High-contrast clinical typography, responsive navigation menu mirroring Apollo Hospitals (Centers of Excellence, Find Doctors, Hospital Services, Emergency 24x7, Patient Portal).
   - Interactive breakdown of key psychiatric specialties and clinical excellence statistics.
   - Attending doctor showcase (Dr. Shashank Pandey) with room, consultation schedule, and fee.
   - Quick direct links to Portal Sign In and Patient Registration.

2. **Authentication Portal (`LoginView`)**
   - **Staff Login**:
     - Sub-tab: **Doctor Login** (Dr. Shashank Pandey)
     - Sub-tab: **Receptionist Login** (Medha Banerjee)
   - **Admin Login**:
     - System Administrator (Shounak Sarkar — Universal Authority)
   - **Patient Portal**:
     - Select **Patient 1: Aaryan Kumar** or **Patient 2: Agniva Samaddar** (or custom email/ID)
     - Patient Self-Registration / Sign Up
   - Password Change Modal
   - Auto-fill helper buttons for immediate evaluation.

3. **Individual Photo & Detail Editing**
   - **Patients**: Edit full name, email, phone, DOB, blood group, address, emergency contact, insurance, and photo (local file upload via FileReader or image URL).
   - **Doctor**: Edit clinical bio, medical degrees, consultation fee, OPD room, schedule, and photo.
   - **Receptionist**: Edit front-desk details, shift hours, desk location, contact info, and photo.
   - **Admin**: Edit admin profile and photo, plus Universal Authority to edit ANY user's credentials, role, status, and password.

---

## 🛠️ Build & Verification

```bash
# Run local development server
npm run dev

# Run production build
npm run build
```
