# =====================================
#        PYTHON PASSWORD GENERATOR
# =====================================

import random
import string

# Store generated passwords
password_history = []

# ---------- Password Generation Function ----------
def generate_password(length, use_upper, use_lower, use_digits, use_symbols):
    characters = ""

    if use_upper:
        characters += string.ascii_uppercase
    if use_lower:
        characters += string.ascii_lowercase
    if use_digits:
        characters += string.digits
    if use_symbols:
        characters += string.punctuation

    if characters == "":
        return None

    password = ''.join(random.choice(characters) for _ in range(length))
    password_history.append(password)
    return password

# ---------- Input Validation ----------
def get_yes_no(prompt):
    while True:
        choice = input(prompt + " (y/n): ").lower()
        if choice in ['y', 'n']:
            return choice == 'y'
        print("Invalid input! Enter y or n.")

def get_length():
    while True:
        try:
            length = int(input("Enter password length (minimum 6): "))
            if length >= 6:
                return length
            print("Password length must be at least 6.")
        except ValueError:
            print("Please enter a valid number.")

# ---------- Utility Functions ----------
def show_history():
    if not password_history:
        print("\nNo passwords generated yet.")
    else:
        print("\n--- PASSWORD HISTORY ---")
        for i, pwd in enumerate(password_history, start=1):
            print(f"{i}. {pwd}")

def clear_history():
    password_history.clear()
    print("Password history cleared.")

# ---------- Main Menu ----------
def main():
    while True:
        print("\n===============================")
        print("     PASSWORD GENERATOR MENU   ")
        print("===============================")
        print("1. Generate New Password")
        print("2. View Password History")
        print("3. Clear Password History")
        print("4. Exit")

        choice = input("Enter your choice (1-4): ")

        if choice == "1":
            length = get_length()
            upper = get_yes_no("Include uppercase letters?")
            lower = get_yes_no("Include lowercase letters?")
            digits = get_yes_no("Include numbers?")
            symbols = get_yes_no("Include special characters?")

            password = generate_password(length, upper, lower, digits, symbols)

            if password:
                print("\nGenerated Password:", password)
            else:
                print("Error! Select at least one character type.")

        elif choice == "2":
            show_history()

        elif choice == "3":
            clear_history()

        elif choice == "4":
            print("Exiting Password Generator. Goodbye!")
            break

        else:
            print("Invalid choice! Try again.")

# ---------- Program Execution ----------
if __name__ == "__main__":
    main()
