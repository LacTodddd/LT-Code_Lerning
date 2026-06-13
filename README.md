# 🚀 Programmer Quiz

A gamified programming quiz platform built to help developers level up their skills from Beginner to Distinguished through an interactive, modern UI.

![Programmer Quiz Banner](https://via.placeholder.com/800x200.png?text=Programmer+Quiz+-+Level+Up+Your+Code)

## ✨ Features

*   **🎮 Multiple Game Modes:**
    *   **Topic Practice:** Learn specific topics step-by-step (e.g., Python Basics, OOP, Generators).
    *   **Daily Challenge:** 5 random questions generated via a daily seed. Every developer faces the same challenge!
    *   **Speed Run:** Test your reflexes by answering 10 questions within 60 seconds.
    *   **Boss Battles:** Prove your mastery. Unlocked only when you achieve 80% progress in a topic.
*   **🧠 Intelligent Question System:**
    *   Supports multiple question types: Multiple Choice (MCQ), Output Guessing, Code Fill, Debugging, and Concept mapping.
    *   Smart randomization prevents seeing the same type of question more than 3 times in a row.
*   **🏆 Gamification & Progression:**
    *   Earn XP for correct answers. Get bonus XP for answering without hints or answering quickly (<5s).
    *   Level up from *Beginner* to *Distinguished*.
    *   Track your daily streak and earn badges for your achievements.
*   **🎨 Premium Modern UI:**
    *   Beautiful Dark Mode developer aesthetic with glassmorphism UI cards.
    *   Smooth transitions and responsive layout across all devices.

## 🛠️ Tech Stack

*   **Frontend:** React 18, Vite, TypeScript
*   **Styling:** Tailwind CSS (with custom glassmorphism utilities)
*   **State Management:** Zustand (with LocalStorage persistence)
*   **Routing:** React Router v6
*   **Testing:** Vitest
*   **Icons:** Lucide React

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

*   Node.js (v18 or higher recommended)
*   npm

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/LacTodddd/LT-Code_Lerning.git
    cd LT-Code_Lerning
    ```

2.  Install the dependencies:
    ```bash
    npm install
    ```

3.  Start the development server:
    ```bash
    npm run dev
    ```

4.  Open your browser and navigate to `http://localhost:5173`

## 📂 Project Structure

```text
src/
├── components/   # Reusable UI components (GlassCard, ProgressBar, QuestionRenderer)
├── constants/    # Game constants and configuration
├── data/         # JSON data containing topics and questions (e.g., python.json)
├── pages/        # Main application views (Home, TopicTree, QuizSession, Profile)
├── store/        # Zustand state stores (userStore, gameStore)
├── types/        # TypeScript interfaces and type definitions
└── utils/        # Helper functions (XP calculation, Daily seed PRNG)
```

## 📝 Adding New Questions

The application is entirely data-driven. To add new questions or a completely new language, simply add or modify the JSON files in the `src/data/` directory.

Example Question Format:
```json
{
  "id": "q-unique-id",
  "language": "python",
  "topic": "py-basics",
  "subtopic": "Lists",
  "difficulty": "beginner",
  "type": "mcq",
  "question": "What does append() do?",
  "options": ["Adds to beginning", "Adds to end", "Removes item"],
  "answer": "Adds to end",
  "explanation": "append() always adds the element to the end of the list.",
  "hint": "Think about appending a signature to a document."
}
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 📄 License

This project is open-source and available under the MIT License.
