# Global dictionaries and sets
students = {}        # Stores all student data: {sid: {details}}
students_id = set()  # Stores unique student IDs
courses = ('ECE','MCA','CSE','AI','CSD')

# Function to add a new student
def add_student():
    sid = int(input("Enter the student id: "))

    if sid in students_id:
        print("Student ID already present")
        return

    name = input("Enter the name: ")
    age = int(input("Enter the age: "))
    branch = input(f"Enter the course {courses}: ")
    mark = float(input("Enter the student mark: "))

    # Use a separate dictionary for this student
    student_data = {
        "Name": name,
        "Age": age,
        "Branch": branch,
        "Mark": mark
    }

    # Update the global students dictionary
    students[sid] = student_data
    students_id.add(sid)
    print("Student added successfully.\n")

# Function to view all students
def view_student():
    if not students:
        print("No student details found.\n")
        return

    for sid, details in students.items():
        print(f"\nStudent ID: {sid}")
        for key, value in details.items():
            print(f"{key}: {value}")
    print()  # extra newline

# Function to search for a student by ID
def search_student():
    sid = int(input("Enter the student id: "))

    if sid not in students:
        print("Student does not exist.\n")
        return

    details = students[sid]
    print("\nStudent Details:")
    for key, value in details.items():
        print(f"{key}: {value}")
    print()

# Function to delete a student by ID
def delete_student():
    sid = int(input("Enter the student id to delete: "))

    if sid in students:
        students.pop(sid)
        students_id.remove(sid)
        print("Student deleted successfully.\n")
    else:
        print("Student not found.\n")

# Main program loop
while True:
    print("""
Student Management System
1. Add student details
2. View student details
3. Search student details
4. Delete student details
5. Exit
""")
    try:
        ch = int(input("Enter your choice (1-5): "))
    except ValueError:
        print("Invalid input! Enter a number between 1-5.\n")
        continue

    if ch == 1:
        add_student()
    elif ch == 2:
        view_student()
    elif ch == 3:
        search_student()
    elif ch == 4:
        delete_student()
    elif ch == 5:
        print("Exiting…")
        break
    else:
        print("Invalid choice! Enter a number between 1-5.\n")
