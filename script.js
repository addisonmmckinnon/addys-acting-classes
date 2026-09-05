const enrollForm = document.getElementById("enroll-form");

if (enrollForm) {
  enrollForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const allergies = document.getElementById("allergies").value || "none";
    const parent = document.getElementById("parent").value;
    const email = document.getElementById("email").value;
    const classPicked = document.getElementById("class").selectedOptions[0].text;
    const message = document.getElementById("message").value || "(none)";

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
  });
}
