const jobRoles = [
  "Software Engineer",
  "Reactjs Developer",
  "Full Stack Developer",
  "Backend Developer",
  "Frontend Developer",
  "Data Scientist",
  "Machine Learning Engineer",
  "DevOps Engineer",
  "Systems Analyst",
  "Database Administrator",
  "Network Engineer",
  "Cloud Architect",
  "IT Support Specialist",
  "Cybersecurity Specialist",
  "UX/UI Designer",
  "Product Manager",
  "Project Manager",
  "Business Analyst",
  "Quality Assurance Engineer",
  "Mobile App Developer",
  "Game Developer",
  "Embedded Systems Engineer",
  "Data Analyst",
  "Salesforce Developer",
  "Blockchain Developer",
  "IoT Developer",
  "Technical Writer",
  "Technical Support Engineer",
  "AI Research Scientist",
  "Site Reliability Engineer",
  "Security Engineer",
  "Data Engineer",
  "Big Data Engineer",
  "Data Architect",
  "Solutions Architect",
  "Software Architect",
  "Information Security Analyst",
  "Penetration Tester",
  "Cloud Engineer",
  "IT Consultant",
  "Technical Account Manager",
  "Integration Engineer",
  "Release Engineer",
  "Computer Vision Engineer",
  "Natural Language Processing Engineer",
  "IT Project Coordinator",
  "IT Director",
  "Chief Technology Officer (CTO)",
  "Chief Information Officer (CIO)",
  "Business Intelligence Developer",
  "CRM Developer",
  "ERP Consultant",
  "SAP Consultant",
  "IT Auditor",
  "Systems Engineer",
  "Robotics Engineer",
  "AI Engineer",
  "Bioinformatics Scientist",
  "Computer Scientist",
  "Operations Research Analyst",
  "IT Asset Manager",
];
const cities = [
  "San Francisco",
  "New York",
  "London",
  "Berlin",
  "Tokyo",
  "Toronto",
  "Sydney",
  "Singapore",
  "Paris",
  "Amsterdam",
  "Dublin",
  "Los Angeles",
  "Seattle",
  "Boston",
  "Austin",
  "Chicago",
  "Hong Kong",
  "Dubai",
  "Mumbai",
  "Bangalore",
  "Chennai",
  "Delhi",
  "Hyderabad",
  "Noida",
  "Pune",
  "Kolkata",
  "Melbourne",
  "Vancouver",
  "Montreal",
  "Zurich",
  "Madrid",
  "Barcelona",
  "Milan",
  "Rome",
  "Brussels",
  "Vienna",
  "Stockholm",
  "Oslo",
  "Helsinki",
  "Copenhagen",
  "Lisbon",
  "Warsaw",
  "Prague",
  "Budapest",
  "Athens",
  "Istanbul",
  "Moscow",
  "Saint Petersburg",
  "Rio de Janeiro",
  "São Paulo",
  "Buenos Aires",
  "Mexico City",
  "Lima",
  "Santiago",
  "Cape Town",
  "Johannesburg",
  "Nairobi",
  "Lagos",
  "Casablanca",
  "Cairo",
  "Beijing",
  "Shanghai",
  "Seoul",
  "Taipei",
  "Bangkok",
  "Kuala Lumpur",
  "Jakarta",
  "Manila",
  "Ho Chi Minh City",
  "Hanoi",
  "Tel Aviv",
  "Riyadh",
  "Doha",
];

const topIndianCities = [
  "Mumbai",
  "Delhi",
  "Delhi NCR",
  "Bengaluru",
  "Hyderabad",
  "Ahmedabad",
  "Chennai",
  "Kolkata",
  "Pune",
  "Jaipur",
  "Surat",
  "Lucknow",
  "Kanpur",
  "Nagpur",
  "Indore",
  "Thane",
  "Bhopal",
  "Visakhapatnam",
  "Patna",
  "Vadodara",
  "Ghaziabad",
  "Ludhiana",
  "Agra",
  "Nashik",
  "Faridabad",
  "Meerut",
  "Rajkot",
  "Kalyan-Dombivli",
  "Vasai-Virar",
  "Varanasi",
  "Srinagar",
  "Aurangabad",
  "Dhanbad",
  "Amritsar",
  "Navi Mumbai",
  "Allahabad",
  "Ranchi",
  "Howrah",
  "Coimbatore",
  "Jabalpur",
  "Gwalior",
  "Vijayawada",
  "Jodhpur",
  "Madurai",
  "Raipur",
  "Kota",
  "Guwahati",
  "Chandigarh",
  "Solapur",
  "Hubli-Dharwad",
  "Bareilly",
  "Moradabad",
  "Mysore",
  "Gurgaon",
  "Aligarh",
  "Jalandhar",
  "Tiruchirappalli",
  "Bhubaneswar",
  "Salem",
  "Mira-Bhayandar",
  "Warangal",
  "Guntur",
  "Bhiwandi",
  "Saharanpur",
  "Gorakhpur",
  "Bikaner",
  "Amravati",
  "Noida",
  "Jamshedpur",
  "Bhilai",
  "Cuttack",
  "Firozabad",
  "Kochi",
  "Nellore",
  "Bhavnagar",
  "Dehradun",
  "Durgapur",
  "Asansol",
  "Rourkela",
  "Nanded",
  "Kolhapur",
  "Ajmer",
  "Akola",
  "Gulbarga",
  "Jamnagar",
  "Ujjain",
  "Loni",
  "Siliguri",
  "Jhansi",
  "Ulhasnagar",
  "Jammu",
  "Sangli-Miraj & Kupwad",
  "Mangalore",
  "Erode",
  "Belgaum",
  "Kurnool",
  "Malegaon",
  "Gaya",
  "Udaipur",
  "Maheshtala",
  "Davanagere",
  "Kozhikode",
  "Kollam",
  "Bokaro",
  "South Dumdum",
  "Rajahmundry",
  "Ballari",
  "Agartala",
  "Bhagalpur",
  "Latur",
  "Dhule",
  "Korba",
  "Bhilwara",
  "Brahmapur",
  "Muzaffarnagar",
  "Ahmednagar",
  "Mathura",
  "Kakinada",
  "Patiala",
  "Kurnool",
  "Ramagundam",
  "Haridwar",
  "Nagaon",
  "Bulandshahr",
  "Akola",
  "Gandhinagar",
  "Bidar",
  "Satna",
  "Sagar",
  "Tumkur",
  "Hapur",
  "Navi Mumbai",
  "Panihati",
  "Gaya",
  "Gandhidham",
  "Nadiad",
  "Rewa",
  "Maheshtala",
  "Mira-Bhayandar",
  "Udupi",
  "Katihar",
  "Sambalpur",
  "Purnia",
  "Adoni",
  "Tirupati",
  "Sikar",
  "Vizianagaram",
  "Tiruvottiyur",
  "Ambattur",
  "Tirunelveli",
  "Avadi",
  "Tiruvannamalai",
  "Rajnandgaon",
  "Guntakal",
  "Karaikudi",
  "Sirsa",
  "Thanjavur",
  "Karimnagar",
  "Secunderabad",
  "Parbhani",
  "Vellore",
  "Moga",
  "Dindigul",
  "Shimoga",
  "Kumbakonam",
  "Hassan",
  "Alappuzha",
  "Palakkad",
  "Nalgonda",
  "Karaikal",
  "Raichur",
  "Eluru",
  "Anantapur",
  "Kollam",
  "Kottayam",
  "Kannur",
  "Nagercoil",
  "Kumbakonam",
  "Namakkal",
  "Ongole",
  "Pudukkottai",
  "Kanchipuram",
  "Nagapattinam",
  "Dharmavaram",
  "Proddatur",
  "Nagaur",
  "Thoothukudi",
  "Kurnool",
  "Salem",
  "Tiruvallur",
  "Tiruchirappalli",
  "Tiruppur",
  "Ujjain",
  "Valsad",
  "Vapi",
  "Vikarabad",
  "Villupuram",
  "Virudhunagar",
  "Wani",
  "Warangal",
  "Wayanad",
  "Yavatmal",
  "Yemmiganur",
  "Yenangyaung",
];

const developerRoles = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Mobile Developer",
  "DevOps Engineer",
  "Data Scientist",
  "Machine Learning Engineer",
  "Software Engineer",
  "Cloud Developer",
  "Security Engineer",
];

const a = [
  "Mumbai",
  "Delhi",
  "Delhi NCR",
  "Bengaluru",
  "Hyderabad",
  "Ahmedabad",
  "Chennai",
  "Kolkata",
  "Pune",
  "Jaipur",
];
const role = developerRoles[Math.floor(Math.random() * developerRoles.length)];
const city = a[Math.floor(Math.random() * a.length)];

const query = { role, city };
module.exports = query;
