// ============================================
// OHANA RSVP — Google Apps Script
// ============================================
// SETUP (2 minutes):
// 1. Create a new Google Sheet
// 2. Add these headers in Row 1:
//    Timestamp | Name | Email | Attending | Guest Count | Guest Names |
//    Dietary Restrictions | Food Preferences | Arrival Date |
//    Flight Details | Need Hotel | Notes
// 3. Go to Extensions > Apps Script
// 4. Delete any existing code, paste this entire file
// 5. Click Deploy > New deployment
// 6. Type: Web app
// 7. Execute as: Me
// 8. Who has access: Anyone
// 9. Click Deploy, authorize when prompted
// 10. Copy the Web app URL and give it to Claude
// ============================================

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      new Date(),
      data.full_name || '',
      data.email || '',
      data.attending ? 'Yes' : 'No',
      data.guest_count || '',
      data.guest_names || '',
      data.dietary_restrictions || '',
      data.food_preferences || '',
      data.arrival_date || '',
      data.flight_details || '',
      data.need_hotel === true ? 'Yes' : (data.need_hotel === false ? 'No' : ''),
      data.notes || ''
    ]);

    return ContentService.createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function — run this to verify the script works
function testPost() {
  var e = {
    postData: {
      contents: JSON.stringify({
        full_name: 'Test Guest',
        email: 'test@example.com',
        attending: true,
        guest_count: 2,
        guest_names: 'Test Guest\nJane Doe',
        dietary_restrictions: 'None',
        food_preferences: '',
        arrival_date: 'june_5_recommended',
        flight_details: 'TK1234',
        need_hotel: true,
        notes: 'Test entry'
      })
    }
  };
  doPost(e);
}
