import { db, auth } from "./firebase-config.js";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  deleteDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

const loginGate = document.getElementById("login-gate");
const adminContent = document.getElementById("admin-content");
const loginForm = document.getElementById("login-form");
const loginError = document.getElementById("login-error");
const logoutButton = document.getElementById("logout-button");
const enrollmentList = document.getElementById("enrollment-list");
const emptyState = document.getElementById("empty-state");

let unsubscribeEnrollments = null;

loginForm.addEventListener("submit", async function (event) {
  event.preventDefault();
  loginError.classList.add("hidden");

  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    loginError.classList.remove("hidden");
  }
});

logoutButton.addEventListener("click", function () {
  signOut(auth);
});

function renderEnrollments(snapshot) {
  enrollmentList.innerHTML = "";

  if (snapshot.empty) {
    emptyState.classList.remove("hidden");
    return;
  }
  emptyState.classList.add("hidden");

  snapshot.forEach((docSnap) => {
    const student = docSnap.data();
    const li = document.createElement("li");
    li.className = "job-card";

    const info = document.createElement("div");
    info.className = "job-info";

    const title = document.createElement("h3");
    title.textContent = student.name + " (age " + student.age + ")";
    info.appendChild(title);

    const meta = document.createElement("div");
    meta.className = "job-meta";
    meta.textContent = student.className + " · Allergies: " + (student.allergies || "none");
    info.appendChild(meta);

    if (student.parent || student.email) {
      const parentMeta = document.createElement("div");
      parentMeta.className = "job-meta";
      parentMeta.textContent = [student.parent, student.email].filter(Boolean).join(" · ");
      info.appendChild(parentMeta);
    }

    if (student.message && student.message !== "(none)") {
      const notes = document.createElement("div");
      notes.className = "job-meta";
      notes.textContent = student.message;
      info.appendChild(notes);
    }

    const actions = document.createElement("div");
    actions.className = "job-actions";

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn btn-small btn-secondary";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => deleteDoc(doc(db, "enrollments", docSnap.id)));
    actions.appendChild(deleteBtn);

    li.appendChild(info);
    li.appendChild(actions);
    enrollmentList.appendChild(li);
  });
}

onAuthStateChanged(auth, function (user) {
  if (user) {
    loginGate.classList.add("hidden");
    adminContent.classList.remove("hidden");

    const enrollmentsQuery = query(collection(db, "enrollments"), orderBy("createdAt", "desc"));
    unsubscribeEnrollments = onSnapshot(enrollmentsQuery, renderEnrollments);
  } else {
    loginGate.classList.remove("hidden");
    adminContent.classList.add("hidden");
    if (unsubscribeEnrollments) {
      unsubscribeEnrollments();
      unsubscribeEnrollments = null;
    }
  }
});
