/* =========================================================
   EDUMANAGE - STUDENT MANAGEMENT SYSTEM
   COMPLETE SCRIPT.JS
   ========================================================= */


/* =========================================================
   DEFAULT DATA
   ========================================================= */

const DEFAULT_STUDENTS = [
    {
        id: "STU001",
        password: "student123",
        name: "Mohammed Kalifa",
        department: "CSE",
        year: "3rd Year",
        status: "active"
    },
    {
        id: "STU002",
        password: "student456",
        name: "Arun Kumar",
        department: "CSE",
        year: "3rd Year",
        status: "active"
    },
    {
        id: "STU003",
        password: "student789",
        name: "Rahul",
        department: "IT",
        year: "2nd Year",
        status: "active"
    }
];

const DEFAULT_FACULTY = [
    {
        id: "FAC001",
        password: "faculty123",
        name: "Dr. Kumar",
        department: "CSE",
        status: "active"
    }
];

const DEFAULT_ADMIN = {
    id: "ADMIN001",
    password: "admin123",
    name: "System Administrator"
};


/* =========================================================
   LOCAL STORAGE INITIALIZATION
   ========================================================= */

function initializeSystem() {

    if (!localStorage.getItem("students")) {

        localStorage.setItem(
            "students",
            JSON.stringify(DEFAULT_STUDENTS)
        );
    }

    if (!localStorage.getItem("faculty")) {

        localStorage.setItem(
            "faculty",
            JSON.stringify(DEFAULT_FACULTY)
        );
    }

    if (!localStorage.getItem("odRequests")) {

        localStorage.setItem(
            "odRequests",
            JSON.stringify([])
        );
    }

    if (!localStorage.getItem("permissionRequests")) {

        localStorage.setItem(
            "permissionRequests",
            JSON.stringify([])
        );
    }

    if (!localStorage.getItem("attendance")) {

        localStorage.setItem(
            "attendance",
            JSON.stringify([])
        );
    }

    if (!localStorage.getItem("studentResults")) {

        localStorage.setItem(
            "studentResults",
            JSON.stringify([])
        );
    }

    if (!localStorage.getItem("activeUsers")) {

        localStorage.setItem(
            "activeUsers",
            JSON.stringify([])
        );
    }
}


/* =========================================================
   HELPER FUNCTIONS
   ========================================================= */

function getStudents() {

    return JSON.parse(
        localStorage.getItem("students") || "[]"
    );
}


function saveStudents(students) {

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );
}


function getFaculty() {

    return JSON.parse(
        localStorage.getItem("faculty") || "[]"
    );
}


function saveFaculty(faculty) {

    localStorage.setItem(
        "faculty",
        JSON.stringify(faculty)
    );
}


function getODRequests() {

    return JSON.parse(
        localStorage.getItem("odRequests") || "[]"
    );
}


function saveODRequests(requests) {

    localStorage.setItem(
        "odRequests",
        JSON.stringify(requests)
    );
}


function getPermissionRequests() {

    return JSON.parse(
        localStorage.getItem("permissionRequests") || "[]"
    );
}


function savePermissionRequests(requests) {

    localStorage.setItem(
        "permissionRequests",
        JSON.stringify(requests)
    );
}


function getAttendanceData() {

    return JSON.parse(
        localStorage.getItem("attendance") || "[]"
    );
}


function saveAttendanceData(data) {

    localStorage.setItem(
        "attendance",
        JSON.stringify(data)
    );
}


function getCurrentUser() {

    return JSON.parse(
        localStorage.getItem("currentUser") || "null"
    );
}


function setCurrentUser(user) {

    localStorage.setItem(
        "currentUser",
        JSON.stringify(user)
    );
}


function removeCurrentUser() {

    localStorage.removeItem("currentUser");
}


/* =========================================================
   STUDENT LOGIN
   ========================================================= */

function studentLogin() {

    const idElement =
        document.getElementById("studentId");

    const passwordElement =
        document.getElementById("studentPassword");

    const messageElement =
        document.getElementById("studentLoginMessage");


    if (!idElement || !passwordElement) {

        return;
    }


    const studentId =
        idElement.value.trim().toUpperCase();

    const password =
        passwordElement.value.trim();


    if (
        studentId === "" ||
        password === ""
    ) {

        showMessage(
            messageElement,
            "Please enter Student ID and Password.",
            "red"
        );

        return;
    }


    const students = getStudents();

    const student =
        students.find(function (item) {

            return (
                item.id === studentId &&
                item.password === password
            );

        });


    if (!student) {

        showMessage(
            messageElement,
            "Invalid Student ID or Password.",
            "red"
        );

        return;
    }


    if (student.status === "blocked") {

        showMessage(
            messageElement,
            "Your student account has been blocked by the administrator.",
            "red"
        );

        return;
    }


    const user = {
        id: student.id,
        name: student.name,
        role: "student",
        loginTime: new Date().toISOString()
    };


    setCurrentUser(user);

    addActiveUser(user);


    showMessage(
        messageElement,
        "Login successful! Opening your dashboard...",
        "green"
    );


    setTimeout(function () {

        window.location.href =
            "student-dashboard.html";

    }, 800);
}


/* =========================================================
   FACULTY LOGIN
   ========================================================= */

function facultyLogin() {

    const idElement =
        document.getElementById("facultyId");

    const passwordElement =
        document.getElementById("facultyPassword");

    const messageElement =
        document.getElementById("facultyLoginMessage");


    if (!idElement || !passwordElement) {

        return;
    }


    const facultyId =
        idElement.value.trim().toUpperCase();

    const password =
        passwordElement.value.trim();


    if (
        facultyId === "" ||
        password === ""
    ) {

        showMessage(
            messageElement,
            "Please enter Faculty ID and Password.",
            "red"
        );

        return;
    }


    const faculty = getFaculty();

    const facultyMember =
        faculty.find(function (item) {

            return (
                item.id === facultyId &&
                item.password === password
            );

        });


    if (!facultyMember) {

        showMessage(
            messageElement,
            "Invalid Faculty ID or Password.",
            "red"
        );

        return;
    }


    if (facultyMember.status === "blocked") {

        showMessage(
            messageElement,
            "Your faculty account has been blocked.",
            "red"
        );

        return;
    }


    const user = {
        id: facultyMember.id,
        name: facultyMember.name,
        role: "faculty",
        loginTime: new Date().toISOString()
    };


    setCurrentUser(user);

    addActiveUser(user);


    showMessage(
        messageElement,
        "Login successful!",
        "green"
    );


    setTimeout(function () {

        window.location.href =
            "faculty-dashboard.html";

    }, 800);
}


/* =========================================================
   ADMIN LOGIN
   ========================================================= */

function adminLogin() {

    const idElement =
        document.getElementById("adminId");

    const passwordElement =
        document.getElementById("adminPassword");

    const messageElement =
        document.getElementById("adminLoginMessage");


    if (!idElement || !passwordElement) {

        return;
    }


    const adminId =
        idElement.value.trim().toUpperCase();

    const password =
        passwordElement.value.trim();


    if (
        adminId === "" ||
        password === ""
    ) {

        showMessage(
            messageElement,
            "Please enter Admin ID and Password.",
            "red"
        );

        return;
    }


    if (
        adminId !== DEFAULT_ADMIN.id ||
        password !== DEFAULT_ADMIN.password
    ) {

        showMessage(
            messageElement,
            "Invalid Admin ID or Password.",
            "red"
        );

        return;
    }


    const user = {
        id: DEFAULT_ADMIN.id,
        name: DEFAULT_ADMIN.name,
        role: "admin",
        loginTime: new Date().toISOString()
    };


    setCurrentUser(user);

    addActiveUser(user);


    showMessage(
        messageElement,
        "Login successful!",
        "green"
    );


    setTimeout(function () {

        window.location.href =
            "admin-dashboard.html";

    }, 800);
}


/* =========================================================
   ACTIVE USERS
   ========================================================= */

function addActiveUser(user) {

    let activeUsers = JSON.parse(
        localStorage.getItem("activeUsers") || "[]"
    );


    activeUsers =
        activeUsers.filter(function (item) {

            return item.id !== user.id;

        });


    activeUsers.push({
        id: user.id,
        name: user.name,
        role: user.role,
        status: "active",
        loginTime: new Date().toISOString()
    });


    localStorage.setItem(
        "activeUsers",
        JSON.stringify(activeUsers)
    );
}


function removeActiveUser(userId) {

    let activeUsers = JSON.parse(
        localStorage.getItem("activeUsers") || "[]"
    );


    activeUsers =
        activeUsers.filter(function (item) {

            return item.id !== userId;

        });


    localStorage.setItem(
        "activeUsers",
        JSON.stringify(activeUsers)
    );
}


function loadUserStatus() {

    const container =
        document.getElementById("userStatusList") ||
        document.getElementById("activeUsersList");

    if (!container) {

        return;
    }


    const activeUsers = JSON.parse(
        localStorage.getItem("activeUsers") || "[]"
    );


    if (activeUsers.length === 0) {

        container.innerHTML =
            "<p>No active users currently.</p>";

        return;
    }


    let html = "";


    activeUsers.forEach(function (user) {

        html += `
            <div class="user-status-card">

                <div>

                    <strong>${user.name}</strong>

                    <p>
                        ${user.id} • ${user.role}
                    </p>

                </div>

                <span class="status-active">
                    🟢 Active
                </span>

            </div>
        `;

    });


    container.innerHTML = html;
}


/* =========================================================
   LOGOUT
   ========================================================= */

function logout() {

    const user = getCurrentUser();


    if (user) {

        removeActiveUser(user.id);
    }


    removeCurrentUser();


    window.location.href =
        "index.html";
}


/* =========================================================
   PAGE ACCESS CONTROL
   ========================================================= */

function checkPageAccess() {

    const currentPage =
        window.location.pathname
            .split("/")
            .pop();


    const user = getCurrentUser();


    if (
        currentPage === "student-dashboard.html"
    ) {

        if (
            !user ||
            user.role !== "student"
        ) {

            window.location.href =
                "student-login.html";

            return;
        }


        const students = getStudents();

        const student =
            students.find(function (item) {

                return item.id === user.id;

            });


        if (
            !student ||
            student.status === "blocked"
        ) {

            alert(
                "Your account has been blocked by the administrator."
            );

            logout();
        }
    }


    if (
        currentPage === "faculty-dashboard.html"
    ) {

        if (
            !user ||
            user.role !== "faculty"
        ) {

            window.location.href =
                "faculty-login.html";
        }
    }


    if (
        currentPage === "admin-dashboard.html"
    ) {

        if (
            !user ||
            user.role !== "admin"
        ) {

            window.location.href =
                "admin-login.html";
        }
    }
}


/* =========================================================
   ADMIN - LOAD STUDENTS
   ========================================================= */

function loadAdminStudents() {

    const tableBody =
        document.getElementById("adminStudentsTable") ||
        document.getElementById("studentsTable");

    if (!tableBody) {

        return;
    }


    const students = getStudents();


    let html = "";


    students.forEach(function (student) {

        const statusText =
            student.status === "blocked"
                ? "🔴 Blocked"
                : "🟢 Active";


        const buttonText =
            student.status === "blocked"
                ? "Unblock"
                : "Block";


        const buttonClass =
            student.status === "blocked"
                ? "primary-btn"
                : "danger-btn";


        html += `
            <tr>

                <td>${student.id}</td>

                <td>${student.name}</td>

                <td>${student.department}</td>

                <td>${student.year}</td>

                <td>
                    ${statusText}
                </td>

                <td>

                    <button
                        class="${buttonClass}"
                        onclick="toggleStudentStatus('${student.id}')">

                        ${buttonText}

                    </button>

                </td>

            </tr>
        `;

    });


    tableBody.innerHTML = html;
}


/* =========================================================
   ADMIN - BLOCK / UNBLOCK STUDENT
   ========================================================= */

function toggleStudentStatus(studentId) {

    const students = getStudents();


    const student =
        students.find(function (item) {

            return item.id === studentId;

        });


    if (!student) {

        return;
    }


    if (student.status === "blocked") {

        student.status = "active";

    } else {

        student.status = "blocked";


        const attendance =
            getAttendanceData();


        const updatedAttendance =
            attendance.filter(function (item) {

                return item.studentId !== studentId;

            });


        saveAttendanceData(
            updatedAttendance
        );


        removeActiveUser(studentId);
    }


    saveStudents(students);


    loadAdminStudents();

    loadUserStatus();


    alert(
        "Student portal status updated successfully."
    );
}


/* =========================================================
   STUDENT OD REQUEST
   ========================================================= */

function submitOD() {

    const currentUser =
        getCurrentUser();


    if (
        !currentUser ||
        currentUser.role !== "student"
    ) {

        return;
    }


    const eventElement =
        document.getElementById("odEvent");

    const dateElement =
        document.getElementById("odDate");

    const reasonElement =
        document.getElementById("odReason");

    const messageElement =
        document.getElementById("odMessage");


    if (
        !eventElement ||
        !dateElement ||
        !reasonElement
    ) {

        return;
    }


    const event =
        eventElement.value.trim();

    const date =
        dateElement.value;

    const reason =
        reasonElement.value.trim();


    if (
        event === "" ||
        date === "" ||
        reason === ""
    ) {

        showMessage(
            messageElement,
            "Please fill all OD request details.",
            "red"
        );

        return;
    }


    const requests =
        getODRequests();


    const request = {
        id: Date.now(),
        studentId: currentUser.id,
        studentName: currentUser.name,
        event: event,
        date: date,
        reason: reason,
        facultyStatus: "pending",
        adminStatus: "pending",
        status: "pending",
        createdAt: new Date().toISOString()
    };


    requests.push(request);


    saveODRequests(requests);


    eventElement.value = "";
    dateElement.value = "";
    reasonElement.value = "";


    showMessage(
        messageElement,
        "OD request submitted successfully.",
        "green"
    );


    loadStudentODStatus();
}


/* =========================================================
   STUDENT OD STATUS
   ========================================================= */

function loadStudentODStatus() {

    const container =
        document.getElementById("studentODStatus");

    if (!container) {

        return;
    }


    const currentUser =
        getCurrentUser();


    if (!currentUser) {

        return;
    }


    const requests =
        getODRequests()
            .filter(function (request) {

                return (
                    request.studentId ===
                    currentUser.id
                );

            });


    if (requests.length === 0) {

        container.innerHTML =
            "<p>No OD requests found.</p>";

        return;
    }


    let html = "";


    requests
        .slice()
        .reverse()
        .forEach(function (request) {

            html += `
                <div class="request-card">

                    <h3>
                        ${request.event}
                    </h3>

                    <p>
                        <strong>Date:</strong>
                        ${request.date}
                    </p>

                    <p>
                        <strong>Reason:</strong>
                        ${request.reason}
                    </p>

                    <p>
                        Faculty:
                        <strong>
                            ${request.facultyStatus}
                        </strong>
                    </p>

                    <p>
                        Admin:
                        <strong>
                            ${request.adminStatus}
                        </strong>
                    </p>

                    <p>
                        Final Status:
                        <strong>
                            ${request.status}
                        </strong>
                    </p>

                </div>
            `;

        });


    container.innerHTML = html;
}


/* =========================================================
   FACULTY OD REQUESTS
   ========================================================= */

function loadFacultyODRequests() {

    const container =
        document.getElementById("facultyODRequests");

    if (!container) {

        return;
    }


    const requests =
        getODRequests()
            .filter(function (request) {

                return (
                    request.facultyStatus ===
                    "pending"
                );

            });


    if (requests.length === 0) {

        container.innerHTML =
            "<p>No pending OD requests.</p>";

        return;
    }


    let html = "";


    requests.forEach(function (request) {

        html += `
            <div class="request-card">

                <h3>
                    ${request.studentName}
                    (${request.studentId})
                </h3>

                <p>
                    <strong>Event:</strong>
                    ${request.event}
                </p>

                <p>
                    <strong>Date:</strong>
                    ${request.date}
                </p>

                <p>
                    ${request.reason}
                </p>

                <button
                    class="primary-btn"
                    onclick="facultyODAction(${request.id}, 'approved')">

                    ✓ Approve

                </button>

                <button
                    class="danger-btn"
                    onclick="facultyODAction(${request.id}, 'rejected')">

                    ✗ Reject

                </button>

            </div>
        `;

    });


    container.innerHTML = html;
}


function facultyODAction(requestId, action) {

    const requests =
        getODRequests();


    const request =
        requests.find(function (item) {

            return item.id === requestId;

        });


    if (!request) {

        return;
    }


    request.facultyStatus = action;


    if (action === "rejected") {

        request.status = "rejected";
        request.adminStatus = "not required";

    } else {

        request.status =
            "waiting for admin approval";
    }


    saveODRequests(requests);


    loadFacultyODRequests();

    loadAdminODRequests();
}


/* =========================================================
   ADMIN OD REQUESTS
   ========================================================= */

function loadAdminODRequests() {

    const container =
        document.getElementById("adminODRequests");

    if (!container) {

        return;
    }


    const requests =
        getODRequests()
            .filter(function (request) {

                return (
                    request.facultyStatus ===
                        "approved" &&
                    request.adminStatus ===
                        "pending"
                );

            });


    if (requests.length === 0) {

        container.innerHTML =
            "<p>No OD requests waiting for approval.</p>";

        return;
    }


    let html = "";


    requests.forEach(function (request) {

        html += `
            <div class="request-card">

                <h3>
                    ${request.studentName}
                    (${request.studentId})
                </h3>

                <p>
                    <strong>Event:</strong>
                    ${request.event}
                </p>

                <p>
                    <strong>OD Date:</strong>
                    ${request.date}
                </p>

                <p>
                    ${request.reason}
                </p>

                <button
                    class="primary-btn"
                    onclick="adminODAction(${request.id}, 'approved')">

                    ✓ Final Approve

                </button>

                <button
                    class="danger-btn"
                    onclick="adminODAction(${request.id}, 'rejected')">

                    ✗ Reject

                </button>

            </div>
        `;

    });


    container.innerHTML = html;
}


function adminODAction(requestId, action) {

    const requests =
        getODRequests();


    const request =
        requests.find(function (item) {

            return item.id === requestId;

        });


    if (!request) {

        return;
    }


    request.adminStatus = action;


    if (action === "approved") {

        request.status = "approved";

    } else {

        request.status = "rejected";
    }


    saveODRequests(requests);


    loadAdminODRequests();

    loadStudentODStatus();

    loadTodayODAlert();
}


/* =========================================================
   TODAY OD ALERT
   ========================================================= */

function loadTodayODAlert() {

    const container =
        document.getElementById("todayODAlert");

    if (!container) {

        return;
    }


    const currentUser =
        getCurrentUser();


    if (!currentUser) {

        return;
    }


    const today =
        new Date()
            .toISOString()
            .split("T")[0];


    const request =
        getODRequests()
            .find(function (item) {

                return (
                    item.studentId ===
                        currentUser.id &&
                    item.date === today &&
                    item.status === "approved"
                );

            });


    if (request) {

        container.innerHTML = `
            <div class="today-od-card">

                <h3>
                    🎉 You Have OD Today!
                </h3>

                <p>
                    Your OD for
                    <strong>${request.event}</strong>
                    has been approved by Faculty and Admin.
                </p>

            </div>
        `;

    } else {

        container.innerHTML = "";
    }
}


/* =========================================================
   FACULTY ATTENDANCE
   ========================================================= */

function loadFacultyAttendance() {

    const container =
        document.getElementById("facultyAttendanceList");

    if (!container) {

        return;
    }


    const students =
        getStudents()
            .filter(function (student) {

                return (
                    student.status === "active"
                );

            });


    let html = "";


    students.forEach(function (student) {

        html += `
            <div class="attendance-student">

                <span>
                    ${student.id} -
                    ${student.name}
                </span>

                <select
                    id="attendance_${student.id}">

                    <option value="Present">
                        Present
                    </option>

                    <option value="Absent">
                        Absent
                    </option>

                </select>

            </div>
        `;

    });


    html += `
        <button
            class="primary-btn"
            onclick="saveFacultyAttendance()">

            Save Attendance

        </button>
    `;


    container.innerHTML = html;
}


function saveFacultyAttendance() {

    const currentUser =
        getCurrentUser();


    if (
        !currentUser ||
        currentUser.role !== "faculty"
    ) {

        return;
    }


    const students =
        getStudents()
            .filter(function (student) {

                return (
                    student.status === "active"
                );

            });


    const attendance =
        getAttendanceData();


    const date =
        new Date()
            .toISOString()
            .split("T")[0];


    students.forEach(function (student) {

        const select =
            document.getElementById(
                "attendance_" + student.id
            );


        if (!select) {

            return;
        }


        const alreadyExists =
            attendance.find(function (item) {

                return (
                    item.studentId === student.id &&
                    item.date === date
                );

            });


        if (!alreadyExists) {

            attendance.push({
                studentId: student.id,
                date: date,
                status: select.value
            });
        }

    });


    saveAttendanceData(attendance);


    alert(
        "Attendance saved successfully."
    );
}


/* =========================================================
   STUDENT ATTENDANCE
   ========================================================= */

function loadStudentAttendance() {

    const container =
        document.getElementById("studentAttendance");

    if (!container) {

        return;
    }


    const currentUser =
        getCurrentUser();


    if (!currentUser) {

        return;
    }


    const students =
        getStudents();


    const student =
        students.find(function (item) {

            return item.id === currentUser.id;

        });


    if (
        !student ||
        student.status === "blocked"
    ) {

        container.innerHTML = `
            <p>
                Attendance access is blocked.
                Please contact the administrator.
            </p>
        `;

        return;
    }


    const records =
        getAttendanceData()
            .filter(function (item) {

                return (
                    item.studentId ===
                    currentUser.id
                );

            });


    if (records.length === 0) {

        container.innerHTML =
            "<p>No attendance records available.</p>";

        return;
    }


    const present =
        records.filter(function (item) {

            return item.status === "Present";

        }).length;


    const percentage =
        Math.round(
            (present / records.length) * 100
        );


    let html = `
        <div class="attendance-summary">

            <h3>
                Attendance: ${percentage}%
            </h3>

            <p>
                Present: ${present}
            </p>

            <p>
                Total Classes: ${records.length}
            </p>

        </div>
    `;


    records.forEach(function (record) {

        html += `
            <div class="attendance-record">

                <span>${record.date}</span>

                <strong>
                    ${record.status}
                </strong>

            </div>
        `;

    });


    container.innerHTML = html;
}


/* =========================================================
   STUDENT RESULTS
   ========================================================= */

function loadStudentResults() {

    const container =
        document.getElementById("studentResults");

    if (!container) {

        return;
    }


    const currentUser =
        getCurrentUser();


    if (!currentUser) {

        return;
    }


    const results = JSON.parse(
        localStorage.getItem("studentResults") || "[]"
    );


    const studentResults =
        results.filter(function (result) {

            return (
                result.studentId ===
                currentUser.id
            );

        });


    if (studentResults.length === 0) {

        container.innerHTML =
            "<p>No results available yet.</p>";

        return;
    }


    let html = `
        <table>

            <tr>
                <th>Subject</th>
                <th>Marks</th>
                <th>Grade</th>
            </tr>
    `;


    studentResults.forEach(function (result) {

        html += `
            <tr>

                <td>
                    ${result.subject}
                </td>

                <td>
                    ${result.marks}
                </td>

                <td>
                    ${result.grade}
                </td>

            </tr>
        `;

    });


    html += "</table>";


    container.innerHTML = html;
}


/* =========================================================
   STUDENT PERMISSION REQUEST
   ========================================================= */

function submitPermission() {

    const currentUser =
        getCurrentUser();


    if (!currentUser) {

        return;
    }


    const reasonElement =
        document.getElementById("permissionReason");

    const dateElement =
        document.getElementById("permissionDate");

    const messageElement =
        document.getElementById("permissionMessage");


    if (
        !reasonElement ||
        !dateElement
    ) {

        return;
    }


    const reason =
        reasonElement.value.trim();

    const date =
        dateElement.value;


    if (
        reason === "" ||
        date === ""
    ) {

        showMessage(
            messageElement,
            "Please fill all permission details.",
            "red"
        );

        return;
    }


    const requests =
        getPermissionRequests();


    requests.push({
        id: Date.now(),
        studentId: currentUser.id,
        studentName: currentUser.name,
        reason: reason,
        date: date,
        status: "pending"
    });


    savePermissionRequests(requests);


    reasonElement.value = "";
    dateElement.value = "";


    showMessage(
        messageElement,
        "Permission request submitted successfully.",
        "green"
    );


    loadStudentPermissionStatus();
}


/* =========================================================
   STUDENT PERMISSION STATUS
   ========================================================= */

function loadStudentPermissionStatus() {

    const container =
        document.getElementById(
            "studentPermissionStatus"
        );

    if (!container) {

        return;
    }


    const currentUser =
        getCurrentUser();


    if (!currentUser) {

        return;
    }


    const requests =
        getPermissionRequests()
            .filter(function (request) {

                return (
                    request.studentId ===
                    currentUser.id
                );

            });


    if (requests.length === 0) {

        container.innerHTML =
            "<p>No permission requests.</p>";

        return;
    }


    let html = "";


    requests.forEach(function (request) {

        html += `
            <div class="request-card">

                <p>
                    <strong>Date:</strong>
                    ${request.date}
                </p>

                <p>
                    ${request.reason}
                </p>

                <p>
                    Status:
                    <strong>
                        ${request.status}
                    </strong>
                </p>

            </div>
        `;

    });


    container.innerHTML = html;
}


/* =========================================================
   ADMIN PERMISSION REQUESTS
   ========================================================= */

function loadAdminPermissionRequests() {

    const container =
        document.getElementById(
            "adminPermissionRequests"
        );

    if (!container) {

        return;
    }


    const requests =
        getPermissionRequests()
            .filter(function (request) {

                return (
                    request.status === "pending"
                );

            });


    if (requests.length === 0) {

        container.innerHTML =
            "<p>No pending permission requests.</p>";

        return;
    }


    let html = "";


    requests.forEach(function (request) {

        html += `
            <div class="request-card">

                <h3>
                    ${request.studentName}
                </h3>

                <p>
                    ${request.studentId}
                </p>

                <p>
                    ${request.date}
                </p>

                <p>
                    ${request.reason}
                </p>

                <button
                    class="primary-btn"
                    onclick="adminPermissionAction(${request.id}, 'approved')">

                    Approve

                </button>

                <button
                    class="danger-btn"
                    onclick="adminPermissionAction(${request.id}, 'rejected')">

                    Reject

                </button>

            </div>
        `;

    });


    container.innerHTML = html;
}


function adminPermissionAction(
    requestId,
    action
) {

    const requests =
        getPermissionRequests();


    const request =
        requests.find(function (item) {

            return item.id === requestId;

        });


    if (!request) {

        return;
    }


    request.status = action;


    savePermissionRequests(requests);


    loadAdminPermissionRequests();

    loadStudentPermissionStatus();
}


/* =========================================================
   SECTION NAVIGATION
   ========================================================= */

function showStudentSection(sectionId, button) {

    document
        .querySelectorAll(".student-section")
        .forEach(function (section) {

            section.classList.remove("active");

        });


    const selected =
        document.getElementById(sectionId);


    if (selected) {

        selected.classList.add("active");
    }


    updateActiveButton(
        ".student-sidebar button",
        button
    );
}


function showFacultySection(sectionId, button) {

    document
        .querySelectorAll(".faculty-section")
        .forEach(function (section) {

            section.classList.remove("active");

        });


    const selected =
        document.getElementById(sectionId);


    if (selected) {

        selected.classList.add("active");
    }


    updateActiveButton(
        ".faculty-sidebar button",
        button
    );
}


function showAdminSection(sectionId, button) {

    document
        .querySelectorAll(".admin-section")
        .forEach(function (section) {

            section.classList.remove("active");

        });


    const selected =
        document.getElementById(sectionId);


    if (selected) {

        selected.classList.add("active");
    }


    updateActiveButton(
        ".admin-sidebar button",
        button
    );
}


function updateActiveButton(
    selector,
    button
) {

    document
        .querySelectorAll(selector)
        .forEach(function (item) {

            item.classList.remove("active");

        });


    if (button) {

        button.classList.add("active");
    }
}


/* =========================================================
   PASSWORD SHOW / HIDE
   ========================================================= */

function toggleStudentPassword() {

    togglePassword("studentPassword");
}


function toggleFacultyPassword() {

    togglePassword("facultyPassword");
}


function toggleAdminPassword() {

    togglePassword("adminPassword");
}


function togglePassword(inputId) {

    const input =
        document.getElementById(inputId);


    if (!input) {

        return;
    }


    if (input.type === "password") {

        input.type = "text";

    } else {

        input.type = "password";
    }
}


/* =========================================================
   FORGOT PASSWORD
   ========================================================= */

function forgotStudentPassword() {

    alert(
        "Demo account password: student123"
    );
}


function forgotFacultyPassword() {

    alert(
        "Demo account password: faculty123"
    );
}


function forgotAdminPassword() {

    alert(
        "Demo account password: admin123"
    );
}


/* =========================================================
   MESSAGE FUNCTION
   ========================================================= */

function showMessage(
    element,
    message,
    color
) {

    if (!element) {

        alert(message);

        return;
    }


    element.textContent = message;

    element.style.color = color;
}


/* =========================================================
   OPTIONAL FUNCTIONS
   These prevent errors if your dashboard calls them.
   ========================================================= */

function loadAdminEventRequests() {

    const container =
        document.getElementById(
            "adminEventRequests"
        );

    if (container) {

        container.innerHTML =
            "<p>No event requests available.</p>";
    }
}


function loadAdminDisciplineReports() {

    const container =
        document.getElementById(
            "adminDisciplineReports"
        );

    if (container) {

        container.innerHTML =
            "<p>No discipline reports available.</p>";
    }
}


/* =========================================================
   PAGE LOAD
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        initializeSystem();

        checkPageAccess();

        loadAdminStudents();

        loadStudentODStatus();

        loadFacultyODRequests();

        loadAdminODRequests();

        loadUserStatus();

        loadFacultyAttendance();

        loadStudentAttendance();

        loadStudentResults();

        loadStudentPermissionStatus();

        loadAdminPermissionRequests();

        loadAdminEventRequests();

        loadAdminDisciplineReports();

        loadTodayODAlert();

    }
);