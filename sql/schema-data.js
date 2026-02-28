const SCHEMAS = {
  ecommerce_db: {
    label: "E-Commerce Platform",
    icon: "",
    tables: [
      {
        name: "users", columns: [
          { n: "user_id", t: "SERIAL", pk: true }, { n: "username", t: "VARCHAR(50)", u: true, nn: true }, { n: "email", t: "VARCHAR(100)", u: true, nn: true },
          { n: "password_hash", t: "TEXT", nn: true }, { n: "full_name", t: "VARCHAR(100)" }, { n: "phone", t: "VARCHAR(20)" },
          { n: "role", t: "VARCHAR(20)", def: "'customer'" }, { n: "is_active", t: "BOOLEAN", def: "TRUE" },
          { n: "created_at", t: "TIMESTAMP", def: "NOW()" }, { n: "updated_at", t: "TIMESTAMP", def: "NOW()" }
        ]
      },
      {
        name: "addresses", columns: [
          { n: "address_id", t: "SERIAL", pk: true }, { n: "user_id", t: "INT", fk: "users(user_id)", fkdel: "CASCADE" },
          { n: "label", t: "VARCHAR(50)" }, { n: "street", t: "TEXT", nn: true }, { n: "city", t: "VARCHAR(100)" },
          { n: "state", t: "VARCHAR(100)" }, { n: "country", t: "VARCHAR(100)" }, { n: "postal_code", t: "VARCHAR(20)" },
          { n: "is_default", t: "BOOLEAN", def: "FALSE" }
        ]
      },
      {
        name: "categories", columns: [
          { n: "category_id", t: "SERIAL", pk: true }, { n: "name", t: "VARCHAR(100)", nn: true },
          { n: "parent_id", t: "INT", fk: "categories(category_id)" }, { n: "description", t: "TEXT" },
          { n: "slug", t: "VARCHAR(150)", u: true }
        ]
      },
      {
        name: "brands", columns: [
          { n: "brand_id", t: "SERIAL", pk: true }, { n: "name", t: "VARCHAR(100)", u: true, nn: true },
          { n: "country", t: "VARCHAR(100)" }, { n: "founded_year", t: "INT" }
        ]
      },
      {
        name: "products", columns: [
          { n: "product_id", t: "SERIAL", pk: true }, { n: "name", t: "VARCHAR(200)", nn: true }, { n: "description", t: "TEXT" },
          { n: "category_id", t: "INT", fk: "categories(category_id)" }, { n: "brand_id", t: "INT", fk: "brands(brand_id)" },
          { n: "base_price", t: "NUMERIC(10,2)", nn: true }, { n: "sku", t: "VARCHAR(100)", u: true },
          { n: "is_active", t: "BOOLEAN", def: "TRUE" }, { n: "created_at", t: "TIMESTAMP", def: "NOW()" }
        ]
      },
      {
        name: "product_variants", columns: [
          { n: "variant_id", t: "SERIAL", pk: true }, { n: "product_id", t: "INT", fk: "products(product_id)", fkdel: "CASCADE" },
          { n: "size", t: "VARCHAR(50)" }, { n: "color", t: "VARCHAR(50)" }, { n: "weight_kg", t: "NUMERIC(6,3)" },
          { n: "price", t: "NUMERIC(10,2)" }, { n: "stock_qty", t: "INT", def: "0" }, { n: "barcode", t: "VARCHAR(100)" }
        ]
      },
      {
        name: "product_images", columns: [
          { n: "image_id", t: "SERIAL", pk: true }, { n: "product_id", t: "INT", fk: "products(product_id)" },
          { n: "url", t: "TEXT", nn: true }, { n: "is_primary", t: "BOOLEAN", def: "FALSE" }, { n: "sort_order", t: "INT" }
        ]
      },
      {
        name: "reviews", columns: [
          { n: "review_id", t: "SERIAL", pk: true }, { n: "product_id", t: "INT", fk: "products(product_id)" },
          { n: "user_id", t: "INT", fk: "users(user_id)" }, { n: "rating", t: "SMALLINT", chk: "1-5" },
          { n: "title", t: "VARCHAR(200)" }, { n: "body", t: "TEXT" }, { n: "is_verified", t: "BOOLEAN", def: "FALSE" },
          { n: "created_at", t: "TIMESTAMP", def: "NOW()" }
        ]
      },
      {
        name: "carts", columns: [
          { n: "cart_id", t: "SERIAL", pk: true }, { n: "user_id", t: "INT", fk: "users(user_id)" },
          { n: "created_at", t: "TIMESTAMP", def: "NOW()" }
        ]
      },
      {
        name: "cart_items", columns: [
          { n: "cart_item_id", t: "SERIAL", pk: true }, { n: "cart_id", t: "INT", fk: "carts(cart_id)", fkdel: "CASCADE" },
          { n: "variant_id", t: "INT", fk: "product_variants(variant_id)" }, { n: "quantity", t: "INT", def: "1" }
        ]
      },
      {
        name: "orders", columns: [
          { n: "order_id", t: "SERIAL", pk: true }, { n: "user_id", t: "INT", fk: "users(user_id)" },
          { n: "address_id", t: "INT", fk: "addresses(address_id)" }, { n: "status", t: "VARCHAR(50)", def: "'pending'" },
          { n: "total_amount", t: "NUMERIC(12,2)" }, { n: "discount_amount", t: "NUMERIC(12,2)", def: "0" },
          { n: "tax_amount", t: "NUMERIC(12,2)", def: "0" }, { n: "shipping_fee", t: "NUMERIC(8,2)", def: "0" },
          { n: "payment_method", t: "VARCHAR(50)" }, { n: "payment_status", t: "VARCHAR(50)", def: "'unpaid'" },
          { n: "notes", t: "TEXT" }, { n: "placed_at", t: "TIMESTAMP", def: "NOW()" },
          { n: "shipped_at", t: "TIMESTAMP" }, { n: "delivered_at", t: "TIMESTAMP" }
        ]
      },
      {
        name: "order_items", columns: [
          { n: "order_item_id", t: "SERIAL", pk: true }, { n: "order_id", t: "INT", fk: "orders(order_id)", fkdel: "CASCADE" },
          { n: "variant_id", t: "INT", fk: "product_variants(variant_id)" },
          { n: "quantity", t: "INT", nn: true }, { n: "unit_price", t: "NUMERIC(10,2)", nn: true }, { n: "discount", t: "NUMERIC(10,2)", def: "0" }
        ]
      },
      {
        name: "coupons", columns: [
          { n: "coupon_id", t: "SERIAL", pk: true }, { n: "code", t: "VARCHAR(50)", u: true, nn: true },
          { n: "discount_type", t: "VARCHAR(20)" }, { n: "discount_value", t: "NUMERIC(8,2)" },
          { n: "min_order_amt", t: "NUMERIC(10,2)" }, { n: "max_uses", t: "INT" }, { n: "used_count", t: "INT", def: "0" },
          { n: "valid_from", t: "DATE" }, { n: "valid_until", t: "DATE" }, { n: "is_active", t: "BOOLEAN", def: "TRUE" }
        ]
      },
      {
        name: "shipments", columns: [
          { n: "shipment_id", t: "SERIAL", pk: true }, { n: "order_id", t: "INT", fk: "orders(order_id)" },
          { n: "tracking_no", t: "VARCHAR(100)" }, { n: "carrier", t: "VARCHAR(100)" },
          { n: "shipped_at", t: "TIMESTAMP" }, { n: "estimated_delivery", t: "DATE" },
          { n: "actual_delivery", t: "TIMESTAMP" }, { n: "status", t: "VARCHAR(50)" }
        ]
      },
      {
        name: "payments", columns: [
          { n: "payment_id", t: "SERIAL", pk: true }, { n: "order_id", t: "INT", fk: "orders(order_id)" },
          { n: "amount", t: "NUMERIC(12,2)" }, { n: "method", t: "VARCHAR(50)" },
          { n: "transaction_id", t: "VARCHAR(200)" }, { n: "status", t: "VARCHAR(50)" }, { n: "paid_at", t: "TIMESTAMP" }
        ]
      },
      {
        name: "page_views", columns: [
          { n: "view_id", t: "BIGSERIAL", pk: true }, { n: "user_id", t: "INT", fk: "users(user_id)" },
          { n: "product_id", t: "INT", fk: "products(product_id)" }, { n: "ip_address", t: "INET" },
          { n: "user_agent", t: "TEXT" }, { n: "viewed_at", t: "TIMESTAMP", def: "NOW()" }
        ]
      },
      {
        name: "wishlists", columns: [
          { n: "wishlist_id", t: "SERIAL", pk: true }, { n: "user_id", t: "INT", fk: "users(user_id)" },
          { n: "variant_id", t: "INT", fk: "product_variants(variant_id)" }, { n: "added_at", t: "TIMESTAMP", def: "NOW()" }
        ]
      }
    ]
  },
  hospital_db: {
    label: "Hospital Management",
    icon: "",
    tables: [
      {
        name: "departments", columns: [
          { n: "dept_id", t: "SERIAL", pk: true }, { n: "name", t: "VARCHAR(100)", nn: true },
          { n: "head_doc_id", t: "INT", fk: "staff(staff_id)" }, { n: "floor", t: "INT" }, { n: "phone_ext", t: "VARCHAR(20)" }
        ]
      },
      {
        name: "staff", columns: [
          { n: "staff_id", t: "SERIAL", pk: true }, { n: "first_name", t: "VARCHAR(50)", nn: true }, { n: "last_name", t: "VARCHAR(50)", nn: true },
          { n: "email", t: "VARCHAR(100)", u: true }, { n: "phone", t: "VARCHAR(20)" },
          { n: "role", t: "VARCHAR(50)" }, { n: "dept_id", t: "INT", fk: "departments(dept_id)" },
          { n: "hire_date", t: "DATE" }, { n: "salary", t: "NUMERIC(12,2)" }, { n: "is_active", t: "BOOLEAN", def: "TRUE" }
        ]
      },
      {
        name: "doctors", columns: [
          { n: "doctor_id", t: "SERIAL", pk: true }, { n: "staff_id", t: "INT", u: true, fk: "staff(staff_id)" },
          { n: "specialization", t: "VARCHAR(100)" }, { n: "license_number", t: "VARCHAR(100)", u: true },
          { n: "qualification", t: "TEXT" }, { n: "consultation_fee", t: "NUMERIC(8,2)" }, { n: "available_days", t: "VARCHAR(100)" }
        ]
      },
      {
        name: "patients", columns: [
          { n: "patient_id", t: "SERIAL", pk: true }, { n: "first_name", t: "VARCHAR(50)", nn: true }, { n: "last_name", t: "VARCHAR(50)", nn: true },
          { n: "dob", t: "DATE" }, { n: "gender", t: "VARCHAR(10)" }, { n: "blood_group", t: "VARCHAR(5)" },
          { n: "email", t: "VARCHAR(100)" }, { n: "phone", t: "VARCHAR(20)" }, { n: "address", t: "TEXT" },
          { n: "emergency_contact_name", t: "VARCHAR(100)" }, { n: "emergency_contact_phone", t: "VARCHAR(20)" },
          { n: "registered_at", t: "TIMESTAMP", def: "NOW()" }
        ]
      },
      {
        name: "appointments", columns: [
          { n: "appointment_id", t: "SERIAL", pk: true }, { n: "patient_id", t: "INT", fk: "patients(patient_id)" },
          { n: "doctor_id", t: "INT", fk: "doctors(doctor_id)" }, { n: "scheduled_at", t: "TIMESTAMP", nn: true },
          { n: "duration_min", t: "INT", def: "30" }, { n: "type", t: "VARCHAR(50)" }, { n: "status", t: "VARCHAR(50)", def: "'scheduled'" },
          { n: "reason", t: "TEXT" }, { n: "notes", t: "TEXT" }, { n: "created_at", t: "TIMESTAMP", def: "NOW()" }
        ]
      },
      {
        name: "medical_records", columns: [
          { n: "record_id", t: "SERIAL", pk: true }, { n: "patient_id", t: "INT", fk: "patients(patient_id)" },
          { n: "doctor_id", t: "INT", fk: "doctors(doctor_id)" }, { n: "appointment_id", t: "INT", fk: "appointments(appointment_id)" },
          { n: "diagnosis", t: "TEXT" }, { n: "symptoms", t: "TEXT" }, { n: "treatment", t: "TEXT" },
          { n: "notes", t: "TEXT" }, { n: "record_date", t: "DATE", def: "CURRENT_DATE" }
        ]
      },
      {
        name: "prescriptions", columns: [
          { n: "prescription_id", t: "SERIAL", pk: true }, { n: "record_id", t: "INT", fk: "medical_records(record_id)" },
          { n: "patient_id", t: "INT", fk: "patients(patient_id)" }, { n: "doctor_id", t: "INT", fk: "doctors(doctor_id)" },
          { n: "issued_at", t: "TIMESTAMP", def: "NOW()" }, { n: "valid_until", t: "DATE" }, { n: "notes", t: "TEXT" }
        ]
      },
      {
        name: "medications", columns: [
          { n: "medication_id", t: "SERIAL", pk: true }, { n: "name", t: "VARCHAR(200)", nn: true },
          { n: "generic_name", t: "VARCHAR(200)" }, { n: "category", t: "VARCHAR(100)" },
          { n: "unit", t: "VARCHAR(50)" }, { n: "manufacturer", t: "VARCHAR(200)" },
          { n: "stock_qty", t: "INT", def: "0" }, { n: "unit_price", t: "NUMERIC(8,2)" }
        ]
      },
      {
        name: "prescription_items", columns: [
          { n: "item_id", t: "SERIAL", pk: true }, { n: "prescription_id", t: "INT", fk: "prescriptions(prescription_id)" },
          { n: "medication_id", t: "INT", fk: "medications(medication_id)" },
          { n: "dosage", t: "VARCHAR(100)" }, { n: "frequency", t: "VARCHAR(100)" },
          { n: "duration_days", t: "INT" }, { n: "instructions", t: "TEXT" }
        ]
      },
      {
        name: "lab_tests", columns: [
          { n: "test_id", t: "SERIAL", pk: true }, { n: "name", t: "VARCHAR(200)", nn: true },
          { n: "category", t: "VARCHAR(100)" }, { n: "normal_range", t: "VARCHAR(100)" },
          { n: "unit", t: "VARCHAR(50)" }, { n: "price", t: "NUMERIC(8,2)" }
        ]
      },
      {
        name: "lab_orders", columns: [
          { n: "lab_order_id", t: "SERIAL", pk: true }, { n: "patient_id", t: "INT", fk: "patients(patient_id)" },
          { n: "doctor_id", t: "INT", fk: "doctors(doctor_id)" },
          { n: "ordered_at", t: "TIMESTAMP", def: "NOW()" }, { n: "status", t: "VARCHAR(50)", def: "'pending'" }
        ]
      },
      {
        name: "lab_order_items", columns: [
          { n: "item_id", t: "SERIAL", pk: true }, { n: "lab_order_id", t: "INT", fk: "lab_orders(lab_order_id)" },
          { n: "test_id", t: "INT", fk: "lab_tests(test_id)" }, { n: "result_value", t: "VARCHAR(200)" },
          { n: "result_notes", t: "TEXT" }, { n: "is_abnormal", t: "BOOLEAN" }, { n: "tested_at", t: "TIMESTAMP" }
        ]
      },
      {
        name: "rooms", columns: [
          { n: "room_id", t: "SERIAL", pk: true }, { n: "room_no", t: "VARCHAR(20)", u: true },
          { n: "dept_id", t: "INT", fk: "departments(dept_id)" }, { n: "type", t: "VARCHAR(50)" },
          { n: "capacity", t: "INT", def: "1" }, { n: "rate_per_day", t: "NUMERIC(8,2)" }
        ]
      },
      {
        name: "admissions", columns: [
          { n: "admission_id", t: "SERIAL", pk: true }, { n: "patient_id", t: "INT", fk: "patients(patient_id)" },
          { n: "room_id", t: "INT", fk: "rooms(room_id)" }, { n: "admitting_doctor_id", t: "INT", fk: "doctors(doctor_id)" },
          { n: "admitted_at", t: "TIMESTAMP", def: "NOW()" }, { n: "discharged_at", t: "TIMESTAMP" },
          { n: "reason", t: "TEXT" }, { n: "discharge_notes", t: "TEXT" }, { n: "total_bill", t: "NUMERIC(12,2)" }
        ]
      },
      {
        name: "bills", columns: [
          { n: "bill_id", t: "SERIAL", pk: true }, { n: "patient_id", t: "INT", fk: "patients(patient_id)" },
          { n: "admission_id", t: "INT", fk: "admissions(admission_id)" },
          { n: "total_amount", t: "NUMERIC(12,2)" }, { n: "paid_amount", t: "NUMERIC(12,2)", def: "0" },
          { n: "status", t: "VARCHAR(50)", def: "'unpaid'" }, { n: "issued_at", t: "TIMESTAMP", def: "NOW()" }, { n: "paid_at", t: "TIMESTAMP" }
        ]
      }
    ]
  },
  university_db: {
    label: "University / LMS",
    icon: "",
    tables: [
      {
        name: "universities", columns: [
          { n: "university_id", t: "SERIAL", pk: true }, { n: "name", t: "VARCHAR(200)", nn: true },
          { n: "country", t: "VARCHAR(100)" }, { n: "established", t: "INT" }, { n: "website", t: "VARCHAR(200)" }
        ]
      },
      {
        name: "faculties", columns: [
          { n: "faculty_id", t: "SERIAL", pk: true }, { n: "university_id", t: "INT", fk: "universities(university_id)" },
          { n: "name", t: "VARCHAR(200)", nn: true }, { n: "dean_name", t: "VARCHAR(100)" }
        ]
      },
      {
        name: "departments", columns: [
          { n: "dept_id", t: "SERIAL", pk: true }, { n: "faculty_id", t: "INT", fk: "faculties(faculty_id)" },
          { n: "name", t: "VARCHAR(200)", nn: true }, { n: "code", t: "VARCHAR(20)", u: true }, { n: "hod_name", t: "VARCHAR(100)" }
        ]
      },
      {
        name: "programs", columns: [
          { n: "program_id", t: "SERIAL", pk: true }, { n: "dept_id", t: "INT", fk: "departments(dept_id)" },
          { n: "name", t: "VARCHAR(200)" }, { n: "level", t: "VARCHAR(50)" }, { n: "duration_years", t: "INT" }, { n: "total_credits", t: "INT" }
        ]
      },
      {
        name: "instructors", columns: [
          { n: "instructor_id", t: "SERIAL", pk: true }, { n: "dept_id", t: "INT", fk: "departments(dept_id)" },
          { n: "first_name", t: "VARCHAR(50)", nn: true }, { n: "last_name", t: "VARCHAR(50)", nn: true },
          { n: "email", t: "VARCHAR(100)", u: true }, { n: "designation", t: "VARCHAR(100)" },
          { n: "specialization", t: "VARCHAR(200)" }, { n: "hire_date", t: "DATE" }, { n: "salary", t: "NUMERIC(12,2)" }
        ]
      },
      {
        name: "students", columns: [
          { n: "student_id", t: "SERIAL", pk: true }, { n: "program_id", t: "INT", fk: "programs(program_id)" },
          { n: "first_name", t: "VARCHAR(50)", nn: true }, { n: "last_name", t: "VARCHAR(50)", nn: true },
          { n: "email", t: "VARCHAR(100)", u: true }, { n: "dob", t: "DATE" }, { n: "gender", t: "VARCHAR(10)" },
          { n: "roll_no", t: "VARCHAR(50)", u: true }, { n: "batch_year", t: "INT" },
          { n: "status", t: "VARCHAR(50)", def: "'active'" }, { n: "gpa", t: "NUMERIC(4,2)" }, { n: "enrolled_at", t: "TIMESTAMP", def: "NOW()" }
        ]
      },
      {
        name: "courses", columns: [
          { n: "course_id", t: "SERIAL", pk: true }, { n: "dept_id", t: "INT", fk: "departments(dept_id)" },
          { n: "code", t: "VARCHAR(20)", u: true, nn: true }, { n: "name", t: "VARCHAR(200)", nn: true },
          { n: "credits", t: "INT" }, { n: "level", t: "VARCHAR(50)" }, { n: "description", t: "TEXT" },
          { n: "is_elective", t: "BOOLEAN", def: "FALSE" }
        ]
      },
      {
        name: "course_prerequisites", columns: [
          { n: "prerequisite_id", t: "SERIAL", pk: true }, { n: "course_id", t: "INT", fk: "courses(course_id)" },
          { n: "required_course_id", t: "INT", fk: "courses(course_id)" }
        ]
      },
      {
        name: "semesters", columns: [
          { n: "semester_id", t: "SERIAL", pk: true }, { n: "name", t: "VARCHAR(50)" },
          { n: "year", t: "INT" }, { n: "term", t: "VARCHAR(20)" }, { n: "start_date", t: "DATE" }, { n: "end_date", t: "DATE" }
        ]
      },
      {
        name: "sections", columns: [
          { n: "section_id", t: "SERIAL", pk: true }, { n: "course_id", t: "INT", fk: "courses(course_id)" },
          { n: "semester_id", t: "INT", fk: "semesters(semester_id)" }, { n: "instructor_id", t: "INT", fk: "instructors(instructor_id)" },
          { n: "capacity", t: "INT", def: "40" }, { n: "room", t: "VARCHAR(50)" }, { n: "schedule", t: "VARCHAR(200)" }
        ]
      },
      {
        name: "enrollments", columns: [
          { n: "enrollment_id", t: "SERIAL", pk: true }, { n: "student_id", t: "INT", fk: "students(student_id)" },
          { n: "section_id", t: "INT", fk: "sections(section_id)" }, { n: "enrolled_at", t: "TIMESTAMP", def: "NOW()" },
          { n: "status", t: "VARCHAR(50)", def: "'active'" }, { n: "final_grade", t: "VARCHAR(5)" }, { n: "grade_points", t: "NUMERIC(3,1)" }
        ]
      },
      {
        name: "assignments", columns: [
          { n: "assignment_id", t: "SERIAL", pk: true }, { n: "section_id", t: "INT", fk: "sections(section_id)" },
          { n: "title", t: "VARCHAR(200)" }, { n: "description", t: "TEXT" }, { n: "type", t: "VARCHAR(50)" },
          { n: "total_marks", t: "NUMERIC(6,2)" }, { n: "due_date", t: "TIMESTAMP" }, { n: "weight_percent", t: "NUMERIC(5,2)" }
        ]
      },
      {
        name: "submissions", columns: [
          { n: "submission_id", t: "SERIAL", pk: true }, { n: "assignment_id", t: "INT", fk: "assignments(assignment_id)" },
          { n: "student_id", t: "INT", fk: "students(student_id)" }, { n: "submitted_at", t: "TIMESTAMP", def: "NOW()" },
          { n: "marks_obtained", t: "NUMERIC(6,2)" }, { n: "feedback", t: "TEXT" }, { n: "is_late", t: "BOOLEAN", def: "FALSE" }
        ]
      },
      {
        name: "attendance", columns: [
          { n: "attendance_id", t: "SERIAL", pk: true }, { n: "section_id", t: "INT", fk: "sections(section_id)" },
          { n: "student_id", t: "INT", fk: "students(student_id)" }, { n: "class_date", t: "DATE" },
          { n: "status", t: "VARCHAR(20)" }
        ]
      },
      {
        name: "scholarships", columns: [
          { n: "scholarship_id", t: "SERIAL", pk: true }, { n: "name", t: "VARCHAR(200)" },
          { n: "amount", t: "NUMERIC(10,2)" }, { n: "criteria", t: "TEXT" }, { n: "funded_by", t: "VARCHAR(200)" }
        ]
      },
      {
        name: "scholarship_awards", columns: [
          { n: "award_id", t: "SERIAL", pk: true }, { n: "scholarship_id", t: "INT", fk: "scholarships(scholarship_id)" },
          { n: "student_id", t: "INT", fk: "students(student_id)" }, { n: "awarded_year", t: "INT" }, { n: "amount", t: "NUMERIC(10,2)" }
        ]
      }
    ]
  },
  bank_db: {
    label: "Banking & Finance",
    icon: "",
    tables: [
      {
        name: "banks", columns: [
          { n: "bank_id", t: "SERIAL", pk: true }, { n: "name", t: "VARCHAR(200)", nn: true },
          { n: "swift_code", t: "VARCHAR(20)", u: true }, { n: "country", t: "VARCHAR(100)" }, { n: "founded_year", t: "INT" }
        ]
      },
      {
        name: "branches", columns: [
          { n: "branch_id", t: "SERIAL", pk: true }, { n: "bank_id", t: "INT", fk: "banks(bank_id)" },
          { n: "name", t: "VARCHAR(200)" }, { n: "ifsc_code", t: "VARCHAR(20)", u: true }, { n: "address", t: "TEXT" },
          { n: "city", t: "VARCHAR(100)" }, { n: "state", t: "VARCHAR(100)" },
          { n: "manager_name", t: "VARCHAR(100)" }, { n: "phone", t: "VARCHAR(20)" }
        ]
      },
      {
        name: "customers", columns: [
          { n: "customer_id", t: "SERIAL", pk: true }, { n: "first_name", t: "VARCHAR(50)", nn: true }, { n: "last_name", t: "VARCHAR(50)", nn: true },
          { n: "email", t: "VARCHAR(100)", u: true }, { n: "phone", t: "VARCHAR(20)" }, { n: "dob", t: "DATE" }, { n: "gender", t: "VARCHAR(10)" },
          { n: "pan_number", t: "VARCHAR(20)", u: true }, { n: "aadhar_number", t: "VARCHAR(20)", u: true },
          { n: "address", t: "TEXT" }, { n: "kyc_status", t: "VARCHAR(20)", def: "'pending'" },
          { n: "created_at", t: "TIMESTAMP", def: "NOW()" }, { n: "is_active", t: "BOOLEAN", def: "TRUE" }
        ]
      },
      {
        name: "account_types", columns: [
          { n: "type_id", t: "SERIAL", pk: true }, { n: "name", t: "VARCHAR(100)" },
          { n: "interest_rate", t: "NUMERIC(5,2)" }, { n: "min_balance", t: "NUMERIC(12,2)", def: "0" }, { n: "description", t: "TEXT" }
        ]
      },
      {
        name: "accounts", columns: [
          { n: "account_id", t: "SERIAL", pk: true }, { n: "customer_id", t: "INT", fk: "customers(customer_id)" },
          { n: "branch_id", t: "INT", fk: "branches(branch_id)" }, { n: "type_id", t: "INT", fk: "account_types(type_id)" },
          { n: "account_no", t: "VARCHAR(20)", u: true, nn: true }, { n: "balance", t: "NUMERIC(15,2)", def: "0" },
          { n: "currency", t: "VARCHAR(10)", def: "'INR'" }, { n: "status", t: "VARCHAR(30)", def: "'active'" },
          { n: "opened_at", t: "DATE", def: "CURRENT_DATE" }, { n: "closed_at", t: "DATE" }
        ]
      },
      {
        name: "transactions", columns: [
          { n: "txn_id", t: "BIGSERIAL", pk: true }, { n: "account_id", t: "INT", fk: "accounts(account_id)" },
          { n: "type", t: "VARCHAR(30)" }, { n: "amount", t: "NUMERIC(15,2)", nn: true },
          { n: "balance_after", t: "NUMERIC(15,2)" }, { n: "description", t: "TEXT" },
          { n: "reference_no", t: "VARCHAR(100)" }, { n: "channel", t: "VARCHAR(50)" },
          { n: "txn_date", t: "TIMESTAMP", def: "NOW()" }, { n: "is_reversed", t: "BOOLEAN", def: "FALSE" }
        ]
      },
      {
        name: "transfers", columns: [
          { n: "transfer_id", t: "SERIAL", pk: true }, { n: "from_account", t: "INT", fk: "accounts(account_id)" },
          { n: "to_account", t: "INT", fk: "accounts(account_id)" }, { n: "amount", t: "NUMERIC(15,2)" },
          { n: "mode", t: "VARCHAR(50)" }, { n: "status", t: "VARCHAR(30)" },
          { n: "initiated_at", t: "TIMESTAMP", def: "NOW()" }, { n: "completed_at", t: "TIMESTAMP" }, { n: "remarks", t: "TEXT" }
        ]
      },
      {
        name: "loans", columns: [
          { n: "loan_id", t: "SERIAL", pk: true }, { n: "customer_id", t: "INT", fk: "customers(customer_id)" },
          { n: "branch_id", t: "INT", fk: "branches(branch_id)" }, { n: "loan_type", t: "VARCHAR(100)" },
          { n: "principal", t: "NUMERIC(15,2)" }, { n: "interest_rate", t: "NUMERIC(5,2)" },
          { n: "tenure_months", t: "INT" }, { n: "emi_amount", t: "NUMERIC(12,2)" }, { n: "status", t: "VARCHAR(30)" },
          { n: "disbursed_at", t: "DATE" }, { n: "closure_date", t: "DATE" }
        ]
      },
      {
        name: "loan_repayments", columns: [
          { n: "repayment_id", t: "SERIAL", pk: true }, { n: "loan_id", t: "INT", fk: "loans(loan_id)" },
          { n: "due_date", t: "DATE" }, { n: "paid_date", t: "DATE" }, { n: "amount_due", t: "NUMERIC(12,2)" },
          { n: "amount_paid", t: "NUMERIC(12,2)" }, { n: "penalty", t: "NUMERIC(8,2)", def: "0" }, { n: "status", t: "VARCHAR(30)" }
        ]
      },
      {
        name: "cards", columns: [
          { n: "card_id", t: "SERIAL", pk: true }, { n: "account_id", t: "INT", fk: "accounts(account_id)" },
          { n: "card_type", t: "VARCHAR(30)" }, { n: "card_no", t: "VARCHAR(20)", u: true },
          { n: "network", t: "VARCHAR(50)" }, { n: "expiry_date", t: "DATE" },
          { n: "credit_limit", t: "NUMERIC(12,2)" }, { n: "is_active", t: "BOOLEAN", def: "TRUE" },
          { n: "issued_at", t: "DATE", def: "CURRENT_DATE" }
        ]
      },
      {
        name: "card_transactions", columns: [
          { n: "card_txn_id", t: "BIGSERIAL", pk: true }, { n: "card_id", t: "INT", fk: "cards(card_id)" },
          { n: "merchant", t: "VARCHAR(200)" }, { n: "category", t: "VARCHAR(100)" },
          { n: "amount", t: "NUMERIC(12,2)" }, { n: "currency", t: "VARCHAR(10)", def: "'INR'" },
          { n: "txn_date", t: "TIMESTAMP", def: "NOW()" }, { n: "status", t: "VARCHAR(30)" },
          { n: "is_international", t: "BOOLEAN", def: "FALSE" }
        ]
      },
      {
        name: "fixed_deposits", columns: [
          { n: "fd_id", t: "SERIAL", pk: true }, { n: "customer_id", t: "INT", fk: "customers(customer_id)" },
          { n: "account_id", t: "INT", fk: "accounts(account_id)" }, { n: "principal", t: "NUMERIC(15,2)" },
          { n: "interest_rate", t: "NUMERIC(5,2)" }, { n: "tenure_days", t: "INT" },
          { n: "maturity_date", t: "DATE" }, { n: "maturity_amount", t: "NUMERIC(15,2)" },
          { n: "status", t: "VARCHAR(30)", def: "'active'" }, { n: "created_at", t: "DATE", def: "CURRENT_DATE" }
        ]
      },
      {
        name: "kyc_documents", columns: [
          { n: "doc_id", t: "SERIAL", pk: true }, { n: "customer_id", t: "INT", fk: "customers(customer_id)" },
          { n: "doc_type", t: "VARCHAR(50)" }, { n: "doc_number", t: "VARCHAR(50)" },
          { n: "verified", t: "BOOLEAN", def: "FALSE" }, { n: "uploaded_at", t: "TIMESTAMP", def: "NOW()" }
        ]
      },
      {
        name: "employees", columns: [
          { n: "employee_id", t: "SERIAL", pk: true }, { n: "branch_id", t: "INT", fk: "branches(branch_id)" },
          { n: "name", t: "VARCHAR(100)" }, { n: "role", t: "VARCHAR(100)" },
          { n: "email", t: "VARCHAR(100)", u: true }, { n: "hire_date", t: "DATE" }, { n: "salary", t: "NUMERIC(12,2)" }
        ]
      }
    ]
  },
  social_db: {
    label: "Social Media",
    icon: "",
    tables: [
      {
        name: "users", columns: [
          { n: "user_id", t: "SERIAL", pk: true }, { n: "username", t: "VARCHAR(50)", u: true, nn: true },
          { n: "email", t: "VARCHAR(100)", u: true, nn: true }, { n: "display_name", t: "VARCHAR(100)" },
          { n: "bio", t: "TEXT" }, { n: "avatar_url", t: "TEXT" }, { n: "website", t: "VARCHAR(200)" },
          { n: "location", t: "VARCHAR(100)" }, { n: "is_verified", t: "BOOLEAN", def: "FALSE" },
          { n: "is_private", t: "BOOLEAN", def: "FALSE" }, { n: "role", t: "VARCHAR(20)", def: "'user'" },
          { n: "joined_at", t: "TIMESTAMP", def: "NOW()" }, { n: "last_seen", t: "TIMESTAMP" }
        ]
      },
      {
        name: "follows", columns: [
          { n: "follow_id", t: "SERIAL", pk: true }, { n: "follower_id", t: "INT", fk: "users(user_id)", fkdel: "CASCADE" },
          { n: "following_id", t: "INT", fk: "users(user_id)", fkdel: "CASCADE" },
          { n: "followed_at", t: "TIMESTAMP", def: "NOW()" }, { n: "status", t: "VARCHAR(20)", def: "'active'" }
        ]
      },
      {
        name: "posts", columns: [
          { n: "post_id", t: "SERIAL", pk: true }, { n: "user_id", t: "INT", fk: "users(user_id)", fkdel: "CASCADE" },
          { n: "content", t: "TEXT" }, { n: "type", t: "VARCHAR(30)" }, { n: "visibility", t: "VARCHAR(30)", def: "'public'" },
          { n: "is_pinned", t: "BOOLEAN", def: "FALSE" }, { n: "is_archived", t: "BOOLEAN", def: "FALSE" },
          { n: "view_count", t: "INT", def: "0" }, { n: "created_at", t: "TIMESTAMP", def: "NOW()" },
          { n: "updated_at", t: "TIMESTAMP", def: "NOW()" }
        ]
      },
      {
        name: "post_media", columns: [
          { n: "media_id", t: "SERIAL", pk: true }, { n: "post_id", t: "INT", fk: "posts(post_id)", fkdel: "CASCADE" },
          { n: "url", t: "TEXT", nn: true }, { n: "media_type", t: "VARCHAR(30)" }, { n: "duration_sec", t: "INT" }, { n: "sort_order", t: "INT" }
        ]
      },
      {
        name: "hashtags", columns: [
          { n: "hashtag_id", t: "SERIAL", pk: true }, { n: "tag", t: "VARCHAR(100)", u: true, nn: true },
          { n: "post_count", t: "INT", def: "0" }, { n: "created_at", t: "TIMESTAMP", def: "NOW()" }
        ]
      },
      {
        name: "post_hashtags", columns: [
          { n: "post_id", t: "INT", fk: "posts(post_id)", fkdel: "CASCADE" },
          { n: "hashtag_id", t: "INT", fk: "hashtags(hashtag_id)", fkdel: "CASCADE" }
        ]
      },
      {
        name: "likes", columns: [
          { n: "like_id", t: "SERIAL", pk: true }, { n: "user_id", t: "INT", fk: "users(user_id)", fkdel: "CASCADE" },
          { n: "post_id", t: "INT", fk: "posts(post_id)", fkdel: "CASCADE" },
          { n: "reaction", t: "VARCHAR(20)", def: "'like'" }, { n: "liked_at", t: "TIMESTAMP", def: "NOW()" }
        ]
      },
      {
        name: "comments", columns: [
          { n: "comment_id", t: "SERIAL", pk: true }, { n: "post_id", t: "INT", fk: "posts(post_id)", fkdel: "CASCADE" },
          { n: "user_id", t: "INT", fk: "users(user_id)", fkdel: "CASCADE" },
          { n: "parent_id", t: "INT", fk: "comments(comment_id)" }, { n: "content", t: "TEXT", nn: true },
          { n: "like_count", t: "INT", def: "0" }, { n: "is_edited", t: "BOOLEAN", def: "FALSE" },
          { n: "created_at", t: "TIMESTAMP", def: "NOW()" }
        ]
      },
      {
        name: "comment_likes", columns: [
          { n: "like_id", t: "SERIAL", pk: true }, { n: "comment_id", t: "INT", fk: "comments(comment_id)", fkdel: "CASCADE" },
          { n: "user_id", t: "INT", fk: "users(user_id)", fkdel: "CASCADE" }
        ]
      },
      {
        name: "stories", columns: [
          { n: "story_id", t: "SERIAL", pk: true }, { n: "user_id", t: "INT", fk: "users(user_id)" },
          { n: "media_url", t: "TEXT" }, { n: "media_type", t: "VARCHAR(30)" }, { n: "caption", t: "TEXT" },
          { n: "expires_at", t: "TIMESTAMP" }, { n: "view_count", t: "INT", def: "0" },
          { n: "created_at", t: "TIMESTAMP", def: "NOW()" }
        ]
      },
      {
        name: "story_views", columns: [
          { n: "view_id", t: "SERIAL", pk: true }, { n: "story_id", t: "INT", fk: "stories(story_id)", fkdel: "CASCADE" },
          { n: "viewer_id", t: "INT", fk: "users(user_id)" }, { n: "viewed_at", t: "TIMESTAMP", def: "NOW()" }
        ]
      },
      {
        name: "messages", columns: [
          { n: "message_id", t: "BIGSERIAL", pk: true }, { n: "sender_id", t: "INT", fk: "users(user_id)" },
          { n: "receiver_id", t: "INT", fk: "users(user_id)" }, { n: "content", t: "TEXT" }, { n: "media_url", t: "TEXT" },
          { n: "is_read", t: "BOOLEAN", def: "FALSE" }, { n: "read_at", t: "TIMESTAMP" },
          { n: "sent_at", t: "TIMESTAMP", def: "NOW()" }, { n: "is_deleted_by_sender", t: "BOOLEAN", def: "FALSE" },
          { n: "is_deleted_by_receiver", t: "BOOLEAN", def: "FALSE" }
        ]
      },
      {
        name: "notifications", columns: [
          { n: "notification_id", t: "SERIAL", pk: true }, { n: "user_id", t: "INT", fk: "users(user_id)" },
          { n: "actor_id", t: "INT", fk: "users(user_id)" }, { n: "type", t: "VARCHAR(50)" },
          { n: "post_id", t: "INT", fk: "posts(post_id)" }, { n: "comment_id", t: "INT", fk: "comments(comment_id)" },
          { n: "message", t: "TEXT" }, { n: "is_read", t: "BOOLEAN", def: "FALSE" },
          { n: "created_at", t: "TIMESTAMP", def: "NOW()" }
        ]
      },
      {
        name: "bookmarks", columns: [
          { n: "bookmark_id", t: "SERIAL", pk: true }, { n: "user_id", t: "INT", fk: "users(user_id)", fkdel: "CASCADE" },
          { n: "post_id", t: "INT", fk: "posts(post_id)", fkdel: "CASCADE" },
          { n: "saved_at", t: "TIMESTAMP", def: "NOW()" }
        ]
      },
      {
        name: "polls", columns: [
          { n: "poll_id", t: "SERIAL", pk: true }, { n: "post_id", t: "INT", fk: "posts(post_id)", fkdel: "CASCADE" },
          { n: "question", t: "TEXT" }, { n: "expires_at", t: "TIMESTAMP" }
        ]
      },
      {
        name: "poll_options", columns: [
          { n: "option_id", t: "SERIAL", pk: true }, { n: "poll_id", t: "INT", fk: "polls(poll_id)" },
          { n: "option_text", t: "VARCHAR(200)" }, { n: "vote_count", t: "INT", def: "0" }
        ]
      },
      {
        name: "poll_votes", columns: [
          { n: "vote_id", t: "SERIAL", pk: true }, { n: "poll_id", t: "INT", fk: "polls(poll_id)" },
          { n: "option_id", t: "INT", fk: "poll_options(option_id)" },
          { n: "user_id", t: "INT", fk: "users(user_id)" }, { n: "voted_at", t: "TIMESTAMP", def: "NOW()" }
        ]
      },
      {
        name: "reports", columns: [
          { n: "report_id", t: "SERIAL", pk: true }, { n: "reporter_id", t: "INT", fk: "users(user_id)" },
          { n: "post_id", t: "INT", fk: "posts(post_id)" }, { n: "comment_id", t: "INT", fk: "comments(comment_id)" },
          { n: "user_id", t: "INT", fk: "users(user_id)" }, { n: "reason", t: "VARCHAR(100)" },
          { n: "details", t: "TEXT" }, { n: "status", t: "VARCHAR(30)", def: "'pending'" },
          { n: "created_at", t: "TIMESTAMP", def: "NOW()" }
        ]
      },
      {
        name: "user_settings", columns: [
          { n: "setting_id", t: "SERIAL", pk: true }, { n: "user_id", t: "INT", u: true, fk: "users(user_id)" },
          { n: "email_notifications", t: "BOOLEAN", def: "TRUE" }, { n: "push_notifications", t: "BOOLEAN", def: "TRUE" },
          { n: "two_factor_enabled", t: "BOOLEAN", def: "FALSE" }, { n: "language", t: "VARCHAR(20)", def: "'en'" },
          { n: "theme", t: "VARCHAR(20)", def: "'light'" }
        ]
      }
    ]
  }
};
