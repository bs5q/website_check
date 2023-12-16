const axios = require('axios');

async function getWebsiteInfo(url) {
  try {

    const hostInfo = await axios.get(`https://api.hackertarget.com/hostsearch/?q=${url}`);
    console.log('Host Information:');
    console.log(hostInfo.data);


    const ipInfo = await axios.get(`https://ipinfo.io/${hostInfo.data[0].ip}`);
    console.log('\nIP Information:');
    console.log(ipInfo.data);


    const whoisInfo = await axios.get(`https://www.whoisxmlapi.com/whoisserver/WhoisService?apiKey=YOUR_API_KEY&domainName=${url}`);
    console.log('\nDomain Registration Information:');
    console.log(whoisInfo.data);


    const cloudflareCheck = await axios.get(`https://www.cloudflare.com/cdn-cgi/trace`);
    const isUsingCloudflare = cloudflareCheck.data.includes('cloudflare');
    console.log(`\nIs the website using Cloudflare? ${isUsingCloudflare ? 'Yes' : 'No'}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

// Example usage: node websiteInfo.js example.com
const url = process.argv[2];
if (!url) {
  console.error('Please provide a website URL.');
} else {
  getWebsiteInfo(url);
}
