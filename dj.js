 const questions = [
            {
                id: 1,
                text: "Explain different data types in C language with their size and range. Write a program to demonstrate the use of each data type. Differentiate between automatic, static, register, and external storage classes in C. Explain with suitable examples.",
                priority: "medium",
                details: "Focus on: int, float, double, char sizes and ranges. Explain auto, static, register, extern with memory allocation examples."
            },
            {
                id: 2,
                text: "What are arrays in C? Explain one-dimensional and two-dimensional arrays with examples. Write programs for matrix addition and multiplication.",
                priority: "high",
                details: "Must include: Array declaration, initialization, memory layout, complete matrix operations programs with proper logic."
            },
            {
                id: 3,
                text: "Explain string handling functions in C. Write programs to demonstrate strcpy(), strcat(), strlen(), and strcmp() functions.",
                priority: "high",
                details: "Cover: String as character array, null terminator, header files, practical examples of each function."
            },
            {
                id: 4,
                text: "What are the differences between arrays and pointers? Explain array of pointers and pointer to arrays with examples.",
                priority: "high",
                details: "Key differences: Memory allocation, arithmetic operations, function parameters. Include syntax differences."
            },
            {
                id: 5,
                text: "What are pointers in C? Explain pointer declaration, initialization, and operations. Write a program using pointers to swap two numbers.",
                priority: "high",
                details: "Most critical topic: Address operator (&), indirection (*), null pointers, pointer arithmetic basics."
            },
            {
                id: 6,
                text: "Explain pointer to pointer concept. Write a program to demonstrate double pointers and their applications.",
                priority: "high",
                details: "Advanced pointers: Multiple indirection levels, practical applications like dynamic 2D arrays."
            },
            {
                id: 7,
                text: "What is pointer arithmetic? Explain various operations that can be performed on pointers with examples.",
                priority: "high",
                details: "Operations: increment, decrement, addition, subtraction, comparison. Memory address calculations."
            },
            {
                id: 8,
                text: "Explain different types of functions in C. What is the difference between call by value and call by reference? Write programs to demonstrate both.",
                priority: "high",
                details: "Function types: library, user-defined. Parameter passing mechanisms with memory diagrams."
            },
            {
                id: 9,
                text: "What is recursion? Explain recursive functions with examples. Write recursive programs for factorial and Fibonacci series.",
                priority: "high",
                details: "Base case, recursive case, stack mechanism, complete working programs with trace."
            },
            {
                id: 10,
                text: "Explain the concept of function pointers. Write a program to demonstrate the use of function pointers.",
                priority: "high",
                details: "Advanced concept: Function address, pointer to function syntax, practical applications."
            },
            {
                id: 11,
                text: "What are structures in C? Explain structure declaration, initialization, and accessing structure members. Write a program to maintain student records using structures.",
                priority: "high",
                details: "User-defined data types: Declaration syntax, dot operator, practical database-like program."
            },
            {
                id: 12,
                text: "Differentiate between structures and unions. Explain nested structures and array of structures with examples.",
                priority: "high",
                details: "Memory allocation differences, practical applications, complex data organization."
            },
            {
                id: 13,
                text: "Explain file handling in C. What are the different modes of opening a file? Write programs to demonstrate file read and write operations.",
                priority: "high",
                details: "FILE pointer, fopen modes (r, w, a, r+, w+, a+), fclose, practical I/O programs."
            },
            {
                id: 14,
                text: "What are the differences between text files and binary files? Explain file pointers and various file handling functions.",
                priority: "high",
                details: "Storage differences, file functions: fread, fwrite, fseek, ftell, rewind with examples."
            },
            {
                id: 15,
                text: "Explain dynamic memory allocation in C. What are malloc(), calloc(), realloc(), and free() functions? Write programs to demonstrate their usage.",
                priority: "medium",
                details: "Heap vs stack, memory management functions, avoiding memory leaks, practical examples."
            },
            {
                id: 16,
                text: "Explain different types of loops in C (for, while, do-while). What are the differences between them? Write programs using nested loops.",
                priority: "medium",
                details: "Loop mechanisms: entry-controlled vs exit-controlled, syntax differences, nested loop patterns."
            },
            {
                id: 17,
                text: "What are conditional statements in C? Explain if-else, switch-case statements with examples. Compare their efficiency.",
                priority: "medium",
                details: "Decision making: if-else ladder, switch-case syntax, break statements, efficiency comparison."
            },
            {
                id: 18,
                text: "Explain different types of operators in C (arithmetic, relational, logical, bitwise). What is operator precedence and associativity?",
                priority: "additional",
                details: "Operator categories, precedence table, associativity rules, practical examples of evaluation."
            },
            {
                id: 19,
                text: "What are macros in C? Explain the difference between macros and functions. Write programs using #define, #ifdef, #ifndef preprocessor directives.",
                priority: "additional",
                details: "Preprocessor: macro expansion, conditional compilation, debugging techniques."
            },
            {
                id: 20,
                text: "Explain command line arguments in C. Write a program to demonstrate argc and argv parameters.",
                priority: "additional",
                details: "Command line interface: argc (argument count), argv (argument vector), practical applications."
            },
            {
                id: 21,
                text: "Explain the features and characteristics of C language. Discuss the structure of a C program with examples.",
                priority: "additional",
                details: "C features: portability, efficiency, modularity. Program structure: headers, main function, syntax."
            }
        ];

        let completedQuestions = JSON.parse(localStorage.getItem('completedQuestions') || '[]');
        let currentFilter = 'all';
        let showCompletedOnly = false;

        function renderQuestions() {
            const container = document.getElementById('questionContainer');
            const filteredQuestions = questions.filter(q => {
                if (showCompletedOnly) {
                    return completedQuestions.includes(q.id);
                }
                return currentFilter === 'all' || q.priority === currentFilter;
            });

            container.innerHTML = filteredQuestions.map(q => `
                <div class="question-card ${completedQuestions.includes(q.id) ? 'completed' : ''}" 
                     data-priority="${q.priority}" onclick="toggleQuestion(${q.id})">
                    <div class="question-header">
                        <div class="question-number">Question ${q.id}</div>
                        <div class="priority-badge ${q.priority}">${q.priority.charAt(0).toUpperCase() + q.priority.slice(1)} Priority</div>
                    </div>
                    <div class="question-text">${q.text}</div>
                    <div class="question-details" id="details-${q.id}">
                        <p><strong>Key Points to Cover:</strong></p>
                        <p>${q.details}</p>
                        <button class="mark-complete ${completedQuestions.includes(q.id) ? 'completed' : ''}" 
                                onclick="event.stopPropagation(); toggleComplete(${q.id})" id="btn-${q.id}">
                            ${completedQuestions.includes(q.id) ? '✓ Completed' : 'Mark as Complete'}
                        </button>
                    </div>
                </div>
            `).join('');

            updateStats();
        }

        function toggleQuestion(id) {
            const details = document.getElementById(`details-${id}`);
            details.classList.toggle('show');
        }

        function toggleComplete(id) {
            const index = completedQuestions.indexOf(id);
            if (index > -1) {
                completedQuestions.splice(index, 1);
            } else {
                completedQuestions.push(id);
            }
            localStorage.setItem('completedQuestions', JSON.stringify(completedQuestions));
            renderQuestions();
        }

        function filterQuestions(priority) {
            currentFilter = priority;
            showCompletedOnly = false;
            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            event.target.classList.add('active');
            renderQuestions();
        }

        function toggleCompleted() {
            showCompletedOnly = !showCompletedOnly;
            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            event.target.classList.add('active');
            renderQuestions();
        }

        function updateStats() {
            const total = questions.length;
            const completed = completedQuestions.length;
            const remaining = total - completed;
            const progress = (completed / total) * 100;

            document.getElementById('totalQuestions').textContent = total;
            document.getElementById('completedCount').textContent = completed;
            document.getElementById('remainingCount').textContent = remaining;
            document.getElementById('progressFill').style.width = progress + '%';
        }

        // Initialize
        renderQuestions();