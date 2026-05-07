// Google Apps Script for A2S Form Submissions
// This script handles both Contact and JoinUs form submissions
// Data is stored in Google Sheets

// Configuration
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID'; // Replace with your Sheet ID
const CONTACT_SHEET_NAME = 'Contact Submissions';
const JOIN_US_SHEET_NAME = 'JoinUs Submissions';

// Main function - receives POST requests from the website
function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Validate that we have required fields
    if (!data.formulaire) {
      return ContentService.createTextOutput(
        JSON.stringify({ success: false, error: 'Missing formulaire field' })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    // Route to appropriate handler based on form type
    let result;
    if (data.formulaire === 'contact') {
      result = handleContactForm(data);
    } else if (data.formulaire === 'join_us') {
      result = handleJoinUsForm(data);
    } else {
      return ContentService.createTextOutput(
        JSON.stringify({ success: false, error: 'Unknown form type' })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    return ContentService.createTextOutput(
      JSON.stringify(result)
    ).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle Contact Form submissions
function handleContactForm(data) {
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = ss.getSheetByName(CONTACT_SHEET_NAME);
    
    // Create sheet if it doesn't exist
    if (!sheet) {
      sheet = ss.insertSheet(CONTACT_SHEET_NAME);
      // Add headers
      sheet.appendRow(['Timestamp', 'Name', 'Email', 'Phone', 'Message']);
    }

    // Add the submission
    sheet.appendRow([
      new Date(),
      data.name || '',
      data.email || '',
      data.phone || '',
      data.message || ''
    ]);

    return {
      success: true,
      message: 'Contact form submitted successfully',
      timestamp: new Date().toISOString()
    };

  } catch (error) {
    return {
      success: false,
      error: 'Failed to process contact form: ' + error.toString()
    };
  }
}

// Handle JoinUs Form submissions
function handleJoinUsForm(data) {
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = ss.getSheetByName(JOIN_US_SHEET_NAME);
    
    // Create sheet if it doesn't exist
    if (!sheet) {
      sheet = ss.insertSheet(JOIN_US_SHEET_NAME);
      // Add headers
      sheet.appendRow([
        'Timestamp',
        'Nom',
        'Email',
        'Date Naissance',
        'Telephone',
        'Genre',
        'Filiere',
        'Cycle',
        'Competences',
        'Notes'
      ]);
    }

    // Convert competences array to string
    const competences = Array.isArray(data.competences) 
      ? data.competences.join(', ') 
      : '';

    // Add the submission
    sheet.appendRow([
      new Date(),
      data.nom || '',
      data.email || '',
      data.dateNaissance || '',
      data.telephone || '',
      data.genre || '',
      data.filiere || '',
      data.cycle || '',
      competences,
      data.notes || ''
    ]);

    return {
      success: true,
      message: 'JoinUs form submitted successfully',
      timestamp: new Date().toISOString()
    };

  } catch (error) {
    return {
      success: false,
      error: 'Failed to process JoinUs form: ' + error.toString()
    };
  }
}

// Test function - run this in the Apps Script editor to verify setup
function testFormSubmission() {
  const testData = {
    formulaire: 'contact',
    name: 'Test User',
    email: 'test@example.com',
    phone: '+212 6XXXXXXXX',
    message: 'This is a test message'
  };
  
  const result = handleContactForm(testData);
  Logger.log('Test result:', result);
}
