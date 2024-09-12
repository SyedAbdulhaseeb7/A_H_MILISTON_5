import { jsPDF } from 'jspdf'; 

// Define types for work experience, education, and the form data
type WorkExperience = {
  jobTitle: string;
  company: string;
  years: string;
};

type Education = {
  degree: string;
  school: string;
  yearGraduated: string;
};

type FormData = {
  name: string;
  email: string;
  address: string;
  image: File | null; // Add image as a File or null if not uploaded
  workExperiences: WorkExperience[];
  educations: Education[];
  resumeTitle: string; 
  uniqueName: string; // New field for unique name// Add a title for the resume
};

// Initialize form data and steps
let currentStep = 1;
const formData: FormData = {
  name: '',
  email: '',
  address: '',
  image: null,
  workExperiences: [],
  educations: [],
  resumeTitle: '' ,
  uniqueName: '', // New field for unique name// Initialize the resume title
};

// Function to update form data
const updateFormData = (key: keyof FormData, value: any) => {
  formData[key] = value;
};
// Function to append @gmail.com if missing
const formatEmail = (email: string) => {
  if (!email.includes('@gmail.com')) {
    return email + '@gmail.com';
  }
  return email;
};
// Step 1: Personal Information
const handleStep1 = () => {
  document.getElementById('app')!.innerHTML = `
    <div class="step">
      <h2>Step 1: Personal Information</h2>
      <div class="form-group">
        <label class="form-label">Full Name</label>
        <input type="text" class="form-input" id="name" placeholder="Full Name" />
      </div>
      <div class="form-group">
        <label class="form-label">Email</label>
        <input type="email" class="form-input" id="email" placeholder="Email Must end with @gmail.com" />
      </div>
      <div class="form-group">
        <label class="form-label">Address</label>
        <input type="text" class="form-input" id="address" placeholder="Address" />
      </div>
      <div class="form-group">
        <label class="form-label">Profile Picture</label>
        <input type="file" class="form-input" id="image" accept="image/*" />
      </div>
      <div class="form-buttons">
        <button class="button" onclick="nextStep()">Next</button>
      </div>
    </div>
  `;
  // Add event listeners for inputs
  document.getElementById('name')!.addEventListener('input', (e) => updateFormData('name', (e.target as HTMLInputElement).value));
  document.getElementById('email')!.addEventListener('input', (e) => updateFormData('email', (e.target as HTMLInputElement).value));

  // Add blur event listener to check and format email on leaving the field
  document.getElementById('email')!.addEventListener('blur', (e) => {
    const emailInput = e.target as HTMLInputElement;
    const formattedEmail = formatEmail(emailInput.value);
    emailInput.value = formattedEmail;
    updateFormData('email', formattedEmail);
  });

  document.getElementById('address')!.addEventListener('input', (e) => updateFormData('address', (e.target as HTMLInputElement).value));
  document.getElementById('image')!.addEventListener('change', (e) => {
    const file = (e.target as HTMLInputElement).files?.[0] || null;
    updateFormData('image', file);

  });
};

// Step 2: Work Experience
const handleStep2 = () => {
  document.getElementById('app')!.innerHTML = `
    <div class="step">
      <h2>Step 2: Work Experience</h2>
      <div id="work-experience-form">
        <div class="form-group">
          <label class="form-label">Job Title</label>
          <input type="text" class="form-input" id="jobTitle" placeholder="Job Title" />
        </div>
        <div class="form-group">
          <label class="form-label">Company</label>
          <input type="text" class="form-input" id="company" placeholder="Company" />
        </div>
        <div class="form-group">
          <label class="form-label">Years of Experience</label>
          <input type="text" class="form-input" id="years" placeholder="Years" />
        </div>
        <div class="form-buttons">
          <button class="button" onclick="addWorkExperience()">Add Work Experience</button>
        </div>
        <ul id="work-experience-list" class="list"></ul>
      </div>
      <div class="form-buttons">
        <button class="button button-secondary" onclick="prevStep()">Previous</button>
        <button class="button" onclick="nextStep()">Next</button>
      </div>
    </div>
  `;
};

// Add Work Experience
const addWorkExperience = () => {
  const jobTitle = (document.getElementById('jobTitle') as HTMLInputElement).value;
  const company = (document.getElementById('company') as HTMLInputElement).value;
  const years = (document.getElementById('years') as HTMLInputElement).value;

  if (jobTitle && company && years) {
    formData.workExperiences.push({ jobTitle, company, years });
    updateWorkExperienceList();
    (document.getElementById('jobTitle') as HTMLInputElement).value = '';
    (document.getElementById('company') as HTMLInputElement).value = '';
    (document.getElementById('years') as HTMLInputElement).value = '';
  }
};

// Update Work Experience List
const updateWorkExperienceList = () => {
  const list = document.getElementById('work-experience-list')!;
  list.innerHTML = '';
  formData.workExperiences.forEach((exp) => {
    const li = document.createElement('li');
    li.textContent = `${exp.jobTitle} at ${exp.company} (${exp.years} years)`;
    list.appendChild(li);
  });
};

// Step 3: Education
const handleStep3 = () => {
  document.getElementById('app')!.innerHTML = `
    <div class="step">
      <h2>Step 3: Education</h2>
      <div id="education-form">
        <div class="form-group">
          <label class="form-label">Degree</label>
          <input type="text" class="form-input" id="degree" placeholder="Degree" />
        </div>
        <div class="form-group">
          <label class="form-label">School</label>
          <input type="text" class="form-input" id="school" placeholder="School" />
        </div>
        <div class="form-group">
          <label class="form-label">Year Graduated</label>
          <input type="text" class="form-input" id="yearGraduated" placeholder="Year Graduated" />
        </div>
        <div class="form-buttons">
          <button class="button" onclick="addEducation()">Add Education</button>
        </div>
        <ul id="education-list" class="list"></ul>
      </div>
      <div class="form-buttons">
        <button class="button button-secondary" onclick="prevStep()">Previous</button>
        <button class="button" onclick="handleStep4()">Next</button>
      </div>
    </div>
  `;
};

// Add Education
const addEducation = () => {
  const degree = (document.getElementById('degree') as HTMLInputElement).value;
  const school = (document.getElementById('school') as HTMLInputElement).value;
  const yearGraduated = (document.getElementById('yearGraduated') as HTMLInputElement).value;

  if (degree && school && yearGraduated) {
    formData.educations.push({ degree, school, yearGraduated });
    updateEducationList();
    (document.getElementById('degree') as HTMLInputElement).value = '';
    (document.getElementById('school') as HTMLInputElement).value = '';
    (document.getElementById('yearGraduated') as HTMLInputElement).value = '';
  }
};

// Update Education List
const updateEducationList = () => {
  const list = document.getElementById('education-list')!;
  list.innerHTML = '';
  formData.educations.forEach((edu) => {
    const li = document.createElement('li');
    li.textContent = `${edu.degree} from ${edu.school} (${edu.yearGraduated})`;
    list.appendChild(li);
  });
};

// Step 4: Review and Submit
const handleStep4 = () => {
  document.getElementById('app')!.innerHTML = `
    <div class="step">
      <h2>Step 4: Review and Submit</h2>
      <div class="form-group">
        <label class="form-label">Resume Title</label>
        <input type="text" class="form-input" id="resumeTitle" placeholder="Resume Title" />
      </div>
      <div class="form-group">
      <label class="form-label">Unique Name for Resume</label>
      <input type="text" class="form-input" id="uniqueName" placeholder="Unique Name" />
    </div>

      <div class="form-buttons">
        <button class="button button-secondary" onclick="prevStep()">Previous</button>
        <button class="button" onclick="submitForm()">Submit</button>
      </div>
    </div>
  `;
  document.getElementById('uniqueName')!.addEventListener('input', (e) => updateFormData('uniqueName', (e.target as HTMLInputElement).value));
  document.getElementById('resumeTitle')!.addEventListener('input', (e) => updateFormData('resumeTitle', (e.target as HTMLInputElement).value));
};

// Generate PDF
const generatePDF = async () => {
    const doc = new jsPDF();
  
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    const margin = 10;
  
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
    doc.text(`Name: ${formData.name}`, margin, 60);
    doc.text(`Email: ${formData.email}`, margin, 70);
    doc.text(`Address: ${formData.address}`, margin, 80);
  
    // Divider Line
    doc.setLineWidth(1);
    doc.setDrawColor(150, 150, 150); // Light gray line
    doc.line(margin, 90, pageWidth - margin, 90);
  
    // Work Experience Section
    let y = 100;
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(24);
    doc.setTextColor(30, 30, 30); // Darker gray
    doc.text('Work Experience', margin, y);
  
    doc.setFont('Times', 'normal');
    doc.setFontSize(16);
    formData.workExperiences.forEach((exp) => {
      y += 20;
      doc.setFont('Helvetica', 'bold');
      doc.text(exp.jobTitle, margin, y);
      doc.setFont('Times', 'normal');
      y += 10;
      doc.text(`${exp.company} | ${exp.years} years`, margin, y);
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
    formData.educations.forEach((edu) => {
      y += 20;
      doc.setFont('Helvetica', 'bold');
      doc.text(edu.degree, margin, y);
      doc.setFont('Times', 'normal');
      y += 10;
      doc.text(`${edu.school} | ${edu.yearGraduated}`, margin, y);
    });
  
    // Footer
    doc.setFontSize(12);
    doc.setFont('Times', 'italic');
    doc.setTextColor(100, 100, 100); // Light gray
    doc.text('Generated by ABDUL HASEEB', pageWidth - margin - 60, pageHeight - margin);
  
    // If the user uploaded an image, add it to the PDF
    if (formData.image) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const imgData = e.target!.result as string;
        doc.addImage(imgData, 'JPEG', pageWidth - margin - 50, margin, 40, 40); // Add the image at the top right corner
        const fileName = `${formData.uniqueName}.pdf`;
        doc.save(fileName); // Save the PDF with the unique name
      };
      reader.readAsDataURL(formData.image);
    } else {
      const fileName = `${formData.uniqueName}.pdf`;
      doc.save(fileName); 
};}
// Function to generate a unique URL (placeholder, not a real implementation)
const generateUniqueUrl = () => {
  const uniqueName = formData.uniqueName || 'resume';
  // Assume the URL structure is based on the unique name
  return `${window.location.origin}/CV/${uniqueName}`;
};

// Function to copy the unique URL to the clipboard
const copyUrlToClipboard = () => {
  const uniqueUrl = generateUniqueUrl();
  navigator.clipboard.writeText(uniqueUrl).then(() => {
    alert('URL copied to clipboard: ' + uniqueUrl);
  });
};

// Function to dynamically add the Copy URL button after form submission
const addCopyUrlButton = () => {
  const appElement = document.getElementById('app');

  const uniqueUrl = generateUniqueUrl(); // Generate the unique URL

  // Create button for copying URL
  const button = document.createElement('button');
  button.className = 'button';
  button.textContent = 'Copy Resume Link';
  button.onclick = copyUrlToClipboard;

  // Display the unique URL text
  const urlDisplay = document.createElement('p');
  urlDisplay.textContent = `Unique Resume URL: ${uniqueUrl}`;

  // Clear any existing content
  appElement!.innerHTML = ''; 

  // Append URL and button to the app
  appElement!.appendChild(urlDisplay);
  appElement!.appendChild(button);
};

// Submit Form and Generate PDF
const submitForm = () => {
  console.log('Form Data:', formData);
  alert('Form submitted! Generating PDF...');
  generatePDF();
  addCopyUrlButton(); // Add the unique URL and button
};

// Navigation between steps
const nextStep = () => {
  if (currentStep === 1) {
    handleStep2();
  } else if (currentStep === 2) {
    handleStep3();
  } else if (currentStep === 3) {
    handleStep4();
  }
  currentStep++;
};

const prevStep = () => {
  if (currentStep === 2) {
    handleStep1();
  } else if (currentStep === 3) {
    handleStep2();
  } else if (currentStep === 4) {
    handleStep3();
  }
  currentStep--;
};

// Initialize form on load
handleStep1();
