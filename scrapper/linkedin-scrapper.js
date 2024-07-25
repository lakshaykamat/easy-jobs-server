const puppeteer = require("puppeteer");
const fs = require("fs");
const Job = require("../models/Job");

// Function to save data to MongoDB
const saveToDatabase = async (jobData) => {
  try {
    const job = new Job(jobData);
    await job.save();
    console.log("Job data saved to database");
  } catch (error) {
    console.error("Error saving to database:", error);
  }
};

const saveToFile = (data, filename) => {
  fs.writeFileSync(filename, JSON.stringify(data, null, 2), "utf-8");
  console.log(`Data has been saved to ${filename}`);
};

const delay = (time) => new Promise((resolve) => setTimeout(resolve, time));

const navigateToJobsPage = async (page, jobQuery) => {
  const jobsURL = `https://www.linkedin.com/jobs/search?keywords=${jobQuery.role}&location=${jobQuery.location}&position=1&pageNum=0`;
  await page.goto(jobsURL, { waitUntil: "networkidle2" });
};

const extractJobLinks = async (page) => {
  // Extract job links from the entire document
  const jobLinks = await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll("a")).map(
      (link) => link.href
    );
    return links.filter(
      (href) =>
        href.startsWith("https://in.linkedin.com/jobs/view") ||
        href.startsWith("https://www.linkedin.com/jobs/view")
    );
  });

  return jobLinks;
};

const extractJobDetails = async (page) => {
  await page.waitForSelector(".top-card-layout__entity-info");
  await page.waitForSelector(".top-card-layout__second-subline");
  await page.waitForSelector(".decorated-job-posting__details");
  await page.waitForSelector(".top-card-layout__title");

  return await page.evaluate(() => {
    // const applyLink =
    //   document.querySelector(".top-card-layout__entity-info a")?.href || "";
    const jobTitle =
      document.querySelector(".top-card-layout__title")?.textContent.trim() ||
      "";

    const element = document.querySelector(
      "h4.top-card-layout__second-subline"
    );
    if (!element) return null;

    const spans = element.querySelectorAll("div > span");
    const companyName = spans[0]?.textContent.trim() || "";
    const location = spans[1]?.textContent.trim() || "";

    const description =
      document
        .querySelector(".decorated-job-posting__details")
        ?.innerHTML.trim() || "";

    return {
      source: "LinkedIn",
      applyLink: document.URL,
      title: jobTitle,
      company: companyName,
      location: location,
      description: description,
    };
  });
};

const linkedInScrapper = async (jobQuery) => {
  // const jobQuery = {
  //   role: "Reactjs Developer",
  //   location: "Noida",
  // };

  const browser = await puppeteer.launch({
    headless: false, // Set to false to see the browser window
    defaultViewport: null, // Setting to null disables the default viewport setting
    args: ["--start-maximized"], // Opens the browser in full screen
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  try {
    await navigateToJobsPage(page, jobQuery);
    await delay(5000);
    const jobLinks = await extractJobLinks(page);
    // saveToFile(jobLinks, `links-${Date.now()}.json`);
    console.log(`Found ${jobLinks.length} job links.`);

    const allJobData = [];

    for (const jobLink of jobLinks) {
      await page.goto(jobLink, { waitUntil: "networkidle2" });
      await delay(5000); // Adding delay between page visits
      const jobData = await extractJobDetails(page);
      console.log(jobData);
      if (jobData) {
        await saveToDatabase(jobData);
        allJobData.push(jobData);
      }
    }

    console.log(allJobData);
    // saveToFile(allJobData, `jobsData-${Date.now()}.json`);
    return allJobData;
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await browser.close();
  }
};

module.exports = linkedInScrapper;
