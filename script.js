
//1.......

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  add(value) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
  }

  remove(value) {
    if (!this.head) {
      return;
    }
    if (this.head.value === value) {
      this.head = this.head.next;
      return;
    }
    let current = this.head;
    while (current.next) {
      if (current.next.value === value) {
        current.next = current.next.next;
        return;
      }
      current = current.next;
    }
  }

  print() {
    let current = this.head;
    let result = "LinkedList{";
    while (current) {
      result += current.value;
      if (current.next) {
        result += ",";
      }
      current = current.next;
    }
    result += "}";
    console.log(result);
  }
}

// Example usage
let linkedList = new LinkedList();
linkedList.add(1);
linkedList.add(2);
linkedList.add(3);
linkedList.print(); // Output: LinkedList{1,2,3}
linkedList.remove(3);
linkedList.print(); // Output: LinkedList{1,2}



//2.....
// Student constructor function
function Student(studentId) {
    this.studentId = studentId;
    this.answers = [];

    // Method to add a student's answer for a question
    this.addAnswer = function(question) {
        this.answers.push(question);
    };
}

// Question constructor function
function Question(qid, answer) {
    this.qid = qid;
    this.answer = answer;

    // Method to check if the student's answer is correct
    this.checkAnswer = function(studentAnswer) {
        return studentAnswer === this.answer;
    };
}

// Quiz constructor function
function Quiz(questions, students) {
    this.questions = new Map();
    this.students = students;

    // Initialize the questions map
    questions.forEach(question => {
        this.questions.set(question.qid, question.answer);
    });

    // Method to compute the quiz score for a student by studentId
    this.scoreStudentBySid = function(studentId) {
        const student = this.students.find(student => student.studentId === studentId);
        if (!student) return 0;
        let score = 0;
        student.answers.forEach(answer => {
            if (this.questions.has(answer.qid) && this.questions.get(answer.qid) === answer.answer) {
                score++;
            }
        });
        return score;
    };

    // Method to compute the average score for all students
    this.getAverageScore = function() {
        if (this.students.length === 0) return 0;
        const totalScore = this.students.reduce((acc, student) => {
            return acc + this.scoreStudentBySid(student.studentId);
        }, 0);
        return totalScore / this.students.length;
    };
}

// Examples
const student1 = new Student(10);
student1.addAnswer(new Question(2, 'a'));
student1.addAnswer(new Question(3, 'b'));
student1.addAnswer(new Question(1, 'b'));

const student2 = new Student(11);
student2.addAnswer(new Question(3, 'b'));
student2.addAnswer(new Question(2, 'a'));
student2.addAnswer(new Question(1, 'd'));

const students = [student1, student2];
const questions = [new Question(1, 'b'), new Question(2, 'a'), new Question(3, 'b')];
const quiz = new Quiz(questions, students);

let scoreforStudent10 = quiz.scoreStudentBySid(10);
console.log(scoreforStudent10); //Expected Result: 3

let scoreforStudent11 = quiz.scoreStudentBySid(11);
console.log(scoreforStudent11); //Expected Result: 2

let average = quiz.getAverageScore();
console.log(average); //Expected Result: 2.5
