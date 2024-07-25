const puppeteer = require("puppeteer");
const fs = require("fs");
const Job = require("../models/Job");
const cron = require("node-cron");
const linkedInScrapper = require("./linkedin-scrapper");

// Function to save data to MongoDB
const saveToDatabase = async (jobData) => {
  try {
    // Check if a job with the same applyLink already exists
    const existingJob = await Job.findOne({ applyLink: jobData.applyLink });
    if (!existingJob) {
      const job = new Job(jobData);
      await job.save();
      console.log("Job data saved to database");
    } else {
      console.log("Job with the same applyLink already exists. Skipping save.");
    }
  } catch (error) {
    console.error("Error saving to database:", error);
  }
};

// Function to save data to a file
const saveToFile = (data, filename) => {
  fs.writeFileSync(filename, JSON.stringify(data, null, 2), "utf-8");
  console.log(`Data has been saved to ${filename}`);
};

// Function to add delay
const delay = (time) => new Promise((resolve) => setTimeout(resolve, time));

// Function to navigate to the jobs page
const navigateToJobsPage = async (page, jobQuery) => {
  const jobsURL = `https://in.indeed.com/jobs?q=${jobQuery.role}&l=${jobQuery.city}`;
  await page.goto(jobsURL, { waitUntil: "networkidle2" });
};

// Function to extract job links from the entire document
const extractJobLinks = async (page) => {
  return await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll("a")).map(
      (link) => link.href
    );
    return links.filter((href) =>
      href.startsWith("https://in.indeed.com/rc/clk")
    );
  });
};

// Function to extract job details from the job page
const extractJobDetails = async (page) => {
  try {
    await page.waitForSelector(".jobsearch-JobInfoHeader-title");
    await page.waitForSelector(".css-1saizt3");
    await page.waitForSelector(".css-waniwe");
    await page.waitForSelector("#jobDescriptionText");

    return await page.evaluate(() => {
      const jobTitle =
        document
          .querySelector(".jobsearch-JobInfoHeader-title span")
          ?.textContent.trim() || "";

      const companyName =
        document.querySelector(".css-1saizt3 a")?.textContent.trim() || "";

      const location =
        document.querySelector(".css-waniwe div")?.textContent.trim() || "";

      const salary =
        document
          .querySelector("#salaryInfoAndJobType span")
          ?.textContent.trim() || "Not Disclosed";

      const description =
        document.querySelector("#jobDescriptionText")?.innerHTML || "";

      function cleanJobUrl(url) {
        const urlObj = new URL(url);
        const jobKey = urlObj.searchParams.get("jk");
        return jobKey ? `${urlObj.origin}${urlObj.pathname}?jk=${jobKey}` : url;
      }
      return {
        source: "Indeed",
        applyLink: cleanJobUrl(document.URL),
        title: jobTitle,
        company: companyName,
        location: location,
        description: description,
        salary: salary,
      };
    });
  } catch (error) {
    console.error("Error extracting job details:", error);
    return null;
  }
};

// Main function to scrape jobs from Indeed
const indeedScraper = async (jobQuery) => {
  const browser = await puppeteer.launch({
    headless: false, // Set to false to see the browser window
    defaultViewport: null, // Setting to null disables the default viewport setting
    args: ["--start-maximized"], // Opens the browser in full screen
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  try {
    console.log("Navigating to page..." + JSON.stringify(jobQuery));
    await navigateToJobsPage(page, jobQuery);
    console.log("Wait 5s");
    await delay(5000);

    const jobLinks = await extractJobLinks(page);
    // saveToFile(jobLinks, `links-${Date.now()}.json`);
    console.log(`Found ${jobLinks.length} job links.`);

    const allJobData = [];

    console.log("Traversing all job links...");
    for (const jobLink of jobLinks) {
      await page.goto(jobLink, { waitUntil: "networkidle2" });
      await delay(5000); // Adding delay between page visits

      const jobData = await extractJobDetails(page);
      if (jobData) {
        console.log("Extracted job data:", jobData);
        await saveToDatabase(jobData);
        allJobData.push(jobData);
      }
    }

    // saveToFile(allJobData, `jobsData-${Date.now()}.json`);
    console.log("All job data extracted successfully.");
    return allJobData;
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await browser.close();
  }
};

// Schedule the scraper to run every 10 minute
cron.schedule("*/10 * * * *", async () => {
  console.log("Running scraper...");
  const jobQuery = require("./params");
  console.log(jobQuery);
  await indeedScraper(jobQuery).catch((error) =>
    console.error("Unhandled Error from Indeed:", error)
  );
  delay(5000);
  await linkedInScrapper(jobQuery).catch((error) =>
    console.error("Unhandled Error from linkedIn:", error)
  );
  console.log("Successfully Executed");
});

console.log("Scheduled scraper to run every 10 minute.");

module.exports = indeedScraper;
