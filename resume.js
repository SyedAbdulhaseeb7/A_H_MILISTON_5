const { jsPDF } = window.jspdf;
// Initialize form data and steps
var currentStep = 1;
var formData = {
    name: '',
    email: '',
    address: '',
    image: null,
    workExperiences: [],
    educations: [],
    resumeTitle: '',
    uniqueName: '', // New field for unique name// Initialize the resume title
};
// Function to update form data
var updateFormData = function (key, value) {
    formData[key] = value;
};
// Function to append @gmail.com if missing
var formatEmail = function (email) {
    if (!email.includes('@gmail.com')) {
        return email + '@gmail.com';
    }
    return email;
};
// Step 1: Personal Information
var handleStep1 = function () {
    document.getElementById('app').innerHTML = "\n    <div class=\"step\">\n      <h2>Step 1: Personal Information</h2>\n      <div class=\"form-group\">\n        <label class=\"form-label\">Full Name</label>\n        <input type=\"text\" class=\"form-input\" id=\"name\" placeholder=\"Full Name\" />\n      </div>\n      <div class=\"form-group\">\n        <label class=\"form-label\">Email</label>\n        <input type=\"email\" class=\"form-input\" id=\"email\" placeholder=\"Email Must end with @gmail.com\" />\n      </div>\n      <div class=\"form-group\">\n        <label class=\"form-label\">Address</label>\n        <input type=\"text\" class=\"form-input\" id=\"address\" placeholder=\"Address\" />\n      </div>\n      <div class=\"form-group\">\n        <label class=\"form-label\">Profile Picture</label>\n        <input type=\"file\" class=\"form-input\" id=\"image\" accept=\"image/*\" />\n      </div>\n      <div class=\"form-buttons\">\n        <button class=\"button\" onclick=\"nextStep()\">Next</button>\n      </div>\n    </div>\n  ";
    // Add event listeners for inputs
    document.getElementById('name').addEventListener('input', function (e) { return updateFormData('name', e.target.value); });
    document.getElementById('email').addEventListener('input', function (e) { return updateFormData('email', e.target.value); });
    // Add blur event listener to check and format email on leaving the field
    document.getElementById('email').addEventListener('blur', function (e) {
        var emailInput = e.target;
        var formattedEmail = formatEmail(emailInput.value);
        emailInput.value = formattedEmail;
        updateFormData('email', formattedEmail);
    });
    document.getElementById('address').addEventListener('input', function (e) { return updateFormData('address', e.target.value); });
    document.getElementById('image').addEventListener('change', function (e) {
        var _a;
        var file = ((_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0]) || null;
        updateFormData('image', file);
    });
};
// Step 2: Work Experience
var handleStep2 = function () {
    document.getElementById('app').innerHTML = "\n    <div class=\"step\">\n      <h2>Step 2: Work Experience</h2>\n      <div id=\"work-experience-form\">\n        <div class=\"form-group\">\n          <label class=\"form-label\">Job Title</label>\n          <input type=\"text\" class=\"form-input\" id=\"jobTitle\" placeholder=\"Job Title\" />\n        </div>\n        <div class=\"form-group\">\n          <label class=\"form-label\">Company</label>\n          <input type=\"text\" class=\"form-input\" id=\"company\" placeholder=\"Company\" />\n        </div>\n        <div class=\"form-group\">\n          <label class=\"form-label\">Years of Experience</label>\n          <input type=\"text\" class=\"form-input\" id=\"years\" placeholder=\"Years\" />\n        </div>\n        <div class=\"form-buttons\">\n          <button class=\"button\" onclick=\"addWorkExperience()\">Add Work Experience</button>\n        </div>\n        <ul id=\"work-experience-list\" class=\"list\"></ul>\n      </div>\n      <div class=\"form-buttons\">\n        <button class=\"button button-secondary\" onclick=\"prevStep()\">Previous</button>\n        <button class=\"button\" onclick=\"nextStep()\">Next</button>\n      </div>\n    </div>\n  ";
};
// Add Work Experience
var addWorkExperience = function () {
    var jobTitle = document.getElementById('jobTitle').value;
    var company = document.getElementById('company').value;
    var years = document.getElementById('years').value;
    if (jobTitle && company && years) {
        formData.workExperiences.push({ jobTitle: jobTitle, company: company, years: years });
        updateWorkExperienceList();
        document.getElementById('jobTitle').value = '';
        document.getElementById('company').value = '';
        document.getElementById('years').value = '';
    }
};
// Update Work Experience List
var updateWorkExperienceList = function () {
    var list = document.getElementById('work-experience-list');
    list.innerHTML = '';
    formData.workExperiences.forEach(function (exp) {
        var li = document.createElement('li');
        li.textContent = "".concat(exp.jobTitle, " at ").concat(exp.company, " (").concat(exp.years, " years)");
        list.appendChild(li);
    });
};
// Step 3: Education
var handleStep3 = function () {
    document.getElementById('app').innerHTML = "\n    <div class=\"step\">\n      <h2>Step 3: Education</h2>\n      <div id=\"education-form\">\n        <div class=\"form-group\">\n          <label class=\"form-label\">Degree</label>\n          <input type=\"text\" class=\"form-input\" id=\"degree\" placeholder=\"Degree\" />\n        </div>\n        <div class=\"form-group\">\n          <label class=\"form-label\">School</label>\n          <input type=\"text\" class=\"form-input\" id=\"school\" placeholder=\"School\" />\n        </div>\n        <div class=\"form-group\">\n          <label class=\"form-label\">Year Graduated</label>\n          <input type=\"text\" class=\"form-input\" id=\"yearGraduated\" placeholder=\"Year Graduated\" />\n        </div>\n        <div class=\"form-buttons\">\n          <button class=\"button\" onclick=\"addEducation()\">Add Education</button>\n        </div>\n        <ul id=\"education-list\" class=\"list\"></ul>\n      </div>\n      <div class=\"form-buttons\">\n        <button class=\"button button-secondary\" onclick=\"prevStep()\">Previous</button>\n        <button class=\"button\" onclick=\"handleStep4()\">Next</button>\n      </div>\n    </div>\n  ";
};
// Add Education
var addEducation = function () {
    var degree = document.getElementById('degree').value;
    var school = document.getElementById('school').value;
    var yearGraduated = document.getElementById('yearGraduated').value;
    if (degree && school && yearGraduated) {
        formData.educations.push({ degree: degree, school: school, yearGraduated: yearGraduated });
        updateEducationList();
        document.getElementById('degree').value = '';
        document.getElementById('school').value = '';
        document.getElementById('yearGraduated').value = '';
    }
};
// Update Education List
var updateEducationList = function () {
    var list = document.getElementById('education-list');
    list.innerHTML = '';
    formData.educations.forEach(function (edu) {
        var li = document.createElement('li');
        li.textContent = "".concat(edu.degree, " from ").concat(edu.school, " (").concat(edu.yearGraduated, ")");
        list.appendChild(li);
    });
};
// Step 4: Review and Submit
var handleStep4 = function () {
    document.getElementById('app').innerHTML = "\n    <div class=\"step\">\n      <h2>Step 4: Review and Submit</h2>\n      <div class=\"form-group\">\n        <label class=\"form-label\">Resume Title</label>\n        <input type=\"text\" class=\"form-input\" id=\"resumeTitle\" placeholder=\"Resume Title\" />\n      </div>\n      <div class=\"form-group\">\n      <label class=\"form-label\">Unique Name for Resume</label>\n      <input type=\"text\" class=\"form-input\" id=\"uniqueName\" placeholder=\"Unique Name\" />\n    </div>\n\n      <div class=\"form-buttons\">\n        <button class=\"button button-secondary\" onclick=\"prevStep()\">Previous</button>\n        <button class=\"button\" onclick=\"submitForm()\">Submit</button>\n      </div>\n    </div>\n  ";
    document.getElementById('uniqueName').addEventListener('input', function (e) { return updateFormData('uniqueName', e.target.value); });
    document.getElementById('resumeTitle').addEventListener('input', function (e) { return updateFormData('resumeTitle', e.target.value); });
};
// Generate PDF
var generatePDF = function () { 
        doc = new jsPDF()
        pageWidth = doc.internal.pageSize.width;
        pageHeight = doc.internal.pageSize.height;
        margin = 10;
        // Set background shading
        doc.setFillColor('white'); // Light gray background
        doc.rect(margin, margin, pageWidth - 2 * margin, pageHeight - 2 * margin, 'F'); // Full page background
        // Title
        doc.setFont('Helvetica', 'bold');
        doc.setFontSize(36);
        doc.setTextColor(50, 50, 50); // Dark gray
        doc.text('Resume', margin, 40);
        // Personal Information
        doc.setFont('Times', 'normal');
        doc.setFontSize(16);
        doc.setTextColor(80, 80, 80); // Medium gray
        doc.text("Name: ".concat(formData.name), margin, 60);
        doc.text("Email: ".concat(formData.email), margin, 70);
        doc.text("Address: ".concat(formData.address), margin, 80);
        // Divider Line
        doc.setLineWidth(1);
        doc.setDrawColor(150, 150, 150); // Light gray line
        doc.line(margin, 90, pageWidth - margin, 90);
        y = 100;
        doc.setFont('Helvetica', 'bold');
        doc.setFontSize(24);
        doc.setTextColor(30, 30, 30); // Darker gray
        doc.text('Work Experience', margin, y);
        doc.setFont('Times', 'normal');
        doc.setFontSize(16);
        formData.workExperiences.forEach(function (exp) {
            y += 20;
            doc.setFont('Helvetica', 'bold');
            doc.text(exp.jobTitle, margin, y);
            doc.setFont('Times', 'normal');
            y += 10;
            doc.text("".concat(exp.company, " | ").concat(exp.years, " years"), margin, y);
        });
        // Divider Line
        y += 20;
        doc.setLineWidth(1);
        doc.setDrawColor(150, 150, 150); // Light gray line
        doc.line(margin, y, pageWidth - margin, y);
        // Education Section
        y += 20;
        doc.setFont('Helvetica', 'bold');
        doc.setFontSize(24);
        doc.setTextColor(30, 30, 30); // Darker gray
        doc.text('Education', margin, y);
        doc.setFont('Times', 'normal');
        doc.setFontSize(16);
        formData.educations.forEach(function (edu) {
            y += 20;
            doc.setFont('Helvetica', 'bold');
            doc.text(edu.degree, margin, y);
            doc.setFont('Times', 'normal');
            y += 10;
            doc.text("".concat(edu.school, " | ").concat(edu.yearGraduated), margin, y);
        });
        // Footer
        doc.setFontSize(12);
        doc.setFont('Times', 'italic');
        doc.setTextColor(100, 100, 100); // Light gray
        doc.text('Generated by ABDUL HASEEB', pageWidth - margin - 60, pageHeight - margin);
        // If the user uploaded an image, add it to the PDF
        if (formData.image) {
            reader = new FileReader();
            reader.onload = function (e) {
                var imgData = e.target.result;
                doc.addImage(imgData, 'JPEG', pageWidth - margin - 50, margin, 40, 40); // Add the image at the top right corner
                var fileName = "".concat(formData.uniqueName, ".pdf");
                doc.save(fileName); // Save the PDF with the unique name
            };
            reader.readAsDataURL(formData.image);
        }
        else {
            fileName = "".concat(formData.uniqueName, ".pdf");
            doc.save(fileName);
        }
        ;
        return [2 /*return*/];
    }

// Function to generate a unique URL (placeholder, not a real implementation)
var generateUniqueUrl = function () {
    var uniqueName = formData.uniqueName || 'resume';
    // Assume the URL structure is based on the unique name
    return "".concat(window.location.origin, "/CV/").concat(uniqueName);
};
// Function to copy the unique URL to the clipboard
var copyUrlToClipboard = function () {
    var uniqueUrl = generateUniqueUrl();
    navigator.clipboard.writeText(uniqueUrl).then(function () {
        alert('URL copied to clipboard: ' + uniqueUrl);
    });
};
// Function to dynamically add the Copy URL button after form submission
var addCopyUrlButton = function () {
    var appElement = document.getElementById('app');
    var uniqueUrl = generateUniqueUrl(); // Generate the unique URL
    // Create button for copying URL
    var button = document.createElement('button');
    button.className = 'button';
    button.textContent = 'Copy Resume Link';
    button.onclick = copyUrlToClipboard;
    // Display the unique URL text
    var urlDisplay = document.createElement('p');
    urlDisplay.textContent = "Unique Resume URL: ".concat(uniqueUrl);
    // Clear any existing content
    appElement.innerHTML = '';
    // Append URL and button to the app
    appElement.appendChild(urlDisplay);
    appElement.appendChild(button);
};
// Submit Form and Generate PDF
var submitForm = function () {
    console.log('Form Data:', formData);
    alert('Form submitted! Generating PDF...');
    generatePDF();
    addCopyUrlButton(); // Add the unique URL and button
};
// Navigation between steps
var nextStep = function () {
    if (currentStep === 1) {
        handleStep2();
    }
    else if (currentStep === 2) {
        handleStep3();
    }
    else if (currentStep === 3) {
        handleStep4();
    }
    currentStep++;
};
var prevStep = function () {
    if (currentStep === 2) {
        handleStep1();
    }
    else if (currentStep === 3) {
        handleStep2();
    }
    else if (currentStep === 4) {
        handleStep3();
    }
    currentStep--;
};
// Initialize form on load
handleStep1();
