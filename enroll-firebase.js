import { db } from "./firebase-config.js";
import {
  collection,
  addDoc,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

const enrollForm = document.getElementById("enroll-form");
const submitButton = enrollForm.querySelector("button[type='submit']");

enrollForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const allergies = document.getElementById("allergies").value || "none";
  const parent = document.getElementById("parent").value;
  const email = document.getElementById("email").value;
  const classPicked = document.getElementById("class").selectedOptions[0].text;
  const message = document.getElementById("message").value || "(none)";

  submitButton.disabled = true;
  submitButton.textContent = "Sending...";

  try {
    // Save the enrollment for good, so it shows up on the admin page.
    await addDoc(collection(db, "enrollments"), {
      name,
      age,
      allergies,
      parent,
      email,
      className: classPicked,
      message,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Failed to save enrollment:", error);
  }

  // Also open the visitor's email app, so Addy still gets notified right away.
  const subject = "New Class Enrollment: " + name;
  const body =
    "Student's Name: " + name + "\n" +
    "Student's Age: " + age + "\n" +
    "Allergies: " + allergies + "\n" +
    "Parent/Guardian Name: " + parent + "\n" +
    "Parent/Guardian Email: " + email + "\n" +
    "Class: " + classPicked + "\n" +
    "Anything else: " + message;

  const mailtoLink =
    "mailto:addisonmmckinnon@gmail.com" +
    "?subject=" + encodeURIComponent(subject) +
    "&body=" + encodeURIComponent(body);

  window.location.href = mailtoLink;

  submitButton.disabled = false;
  submitButton.textContent = "Send";
});
