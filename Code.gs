const targetSheetId = "ENTER HERE"
const targetSheetName = "ENTER HERE"

function doPost(e) {
  try{    
    const event = JSON.parse(e.postData.contents)
    console.log(event.data)

    if( event.type != "payment_intent.succeeded" ) return

    writePaymentToSheet( event.data.object )

  } catch(err) {
    console.error(err)

  } finally {
    return ContentService.createTextOutput("OK").setMimeType(ContentService.MimeType.TEXT)
  }
  
}


function writePaymentToSheet( payment ){
  
  const targetSheet = SpreadsheetApp.openById(targetSheetId).getSheetByName(targetSheetName)

  const row = [
    new Date().toISOString().substr(0,10),
    payment.id,
    payment.amount / 100
  ]

  targetSheet.appendRow( row )
}
