function dailydata(){ // gets the user
  
  var ss1 = SpreadsheetApp.openById("1W8ECF6uqytFJJ927CH3Z5-Ki5sYR0mgv69UWHRt-wSk").getSheetByName("Sheet2"); // 1301
  var l1 = ss1.getLastRow(); // the whole length of 1301
  var dt1 = ss1.getRange(2,1,l1,1).getValues(); // this is the data history
  var ss = SpreadsheetApp.openById("1A1WLVO9UoSe_s-88crThMEeWf702Rf_i5czHCJqPrAQ").getSheetByName("Sheet1"); // 923 Timestamp Data
  var dts = ss.getRange("a3:cd3").getValues(); // hack to check if the date has been processed
  var l2 = ss.getLastRow();
  var data = ss.getRange(11,1,l2,52).getValues(); // all the users beside each account 923 so this needs to be checked against 500
  var data1 = ss.getRange(11,1,l2,3).getValues();
  var obj = SpreadsheetApp.openById("1PDSr53kxFwWGDk9CdEu3KGu8mysSMxtExj7VRXV13nY").getSheetByName("Account Objects"); // 500 iDatabase to get the current list of live accounts
  var l3 = obj.getLastRow();
  var data2 = obj.getRange(2,1,l3,3).getValues(); // takes all the current live Accounts,Contacts and Users
  var newlife = 0;
  
  
  var newdeal = new Array(); // makes a new array for the any Accounts, Contacts and Users that aren't already in the 911 list. Note a job change for a user will create a new entry.
  for(var m = 0; m < l3-2; m++){
   var crow = data2[m];
   var duplicate = false;
    for (var n = 0; n< l2-12; n++){
    var drow = data1[n];
      if(crow.join() == drow.join()){
      duplicate = true;
      }
          }
    if(!duplicate){
    newdeal.push(crow);
      var newlife = newlife + 1;
    }
  }
  
  if(newlife!=0){
 // ss.getRange(l2+1, 1, newdeal.length, newdeal[0].length).setValues(newdeal); // newdeal is an array of all the new accounts/contacts/users that have been added since
    
  }
  
  var l4 = ss.getLastRow(); // gets the final row of the new list of Users, Accounts and Contacts
  var l5 = l4-11;
  var data4 = ss.getRange(11,1,l5+1,3).getValues(); // new list of Users, Accounts and Contacts
  
  for(var x =0; x<70; x++) // limits to 60 consecutive weeks
  { var trig = dts[0][x];
  // Logger.log(trig)
   if(trig == "no"){
    var d = x;
     var x = 69;
   
  
  var endac = ss.getRange(1,d).getValue(); // start date from sheet
  var tDate = ss.getRange(2,d).getValue(); // end date from sheet
 Logger.log(endac)
 Logger.log(tDate)
  
  var edt = tDate.valueOf(); // turns to milliseconds I think
  var sdt = endac.valueOf();
  
  var userdetail = SpreadsheetApp.openById("1PDSr53kxFwWGDk9CdEu3KGu8mysSMxtExj7VRXV13nY").getSheetByName("UserList"); // 500 iDatabase
  var userlist = userdetail.getRange(2,2,40,1).getValues();
  for(var i = 5; i < 6; i++){ // 0 to 40 not sure how seems only 38 *** var i = 0; i < 40; i++
    
    var use = userlist[i][0]; // now runs the whole cycle below for each user. 
   
   Logger.log(use)
    if(use !="") // for each of the up to 30 (?) users in the live file in UserList
    {
      
      for(var t = 0; t<l2; t++)
      { var u = data[t][0];
       //Logger.log(u)
       if(u == use){var uline = t; // gives the first line when the user appears in the 911 timestamp sheet
        var t = l2-1;
        } 
      }
      subcreator1(dt1,use,edt,sdt,uline,l2,l1,data,d,data4,l5) 
      //subcreator2(dt1,use,edt,sdt,uline,l2,l1,data,d,data4,l5) 
      //subcreator3(dt1,use,edt,sdt,uline,l2,l1,data,d,data4,l5) 
      //subcreator4(dt1,use,edt,sdt,uline,l2,l1,data,d,data4,l5) 
      }
     }
    }   
  }
  //ss.getRange(3,d+1).setValue(""); 
}

function subcreator1(dt1,use,edt,sdt,uline,l2,l1,data,d,data4,l5){ // needs to create 4 sub arrays for Event, Labelling, Passing, Mailing

  var col = 3;
  var count = 0;
  var count2 = 0;
  
  var ss2 = SpreadsheetApp.openById("1A1WLVO9UoSe_s-88crThMEeWf702Rf_i5czHCJqPrAQ").getSheetByName("Sheet2"); // 923 Timestamp Data // ***for trial
  var ss3 = SpreadsheetApp.openById("1A1WLVO9UoSe_s-88crThMEeWf702Rf_i5czHCJqPrAQ").getSheetByName("Sheet3"); // 923 Timestamp Data // ***for trial
 
  var sub = new Array(); // creates a new array that is just featuring the user
  var sub2 = new Array(); // creates a new array that is just featuring the user AND label494
  
  for (var h = 1; h<l1; h++){ // l1 is all the events in 1301
  var row = dt1[h]; // all 1301 data
  var lame = row.toString();
   if(lame.indexOf(use)>=0){  // does the user appear in the event
     sub.push(row);
     var count = count + 1;
    }
   if(lame.indexOf(use)>=0 && lame.indexOf("label494")>=0){  // does the user appear in the event
    sub2.push(row);
    var count2 = count2 + 1;
    }
  }
  
  Logger.log(count2)
  Logger.log(count)

 // ss2.getRange(1,1,count,1).setValues(sub);
//  ss3.getRange(1,1,count2,1).setValues(sub2);

  //var count = 50;
  //var count2 = 50;
  
  var startpoint = 1000000;
  var endpoint = 1000000;
  var startpoint2 = 1000000;
  var endpoint2 = 1000000;
  
  for (var g = 0; g<count; g++){ 
  var row1 = sub[g]; // sub is the sub array from 1301 which includes the user, this reduces the sub array to be limited to the start and finish dates. 
 
  var rts = row1.toString();  // now each input is a searchable string
  var pos = rts.indexOf("GMT-0"); // will search for the first date in the string
  var time = rts.substring(pos-25,pos+14); // scrapes out the date
  //Logger.log(time)
  var dt6 = new Date(time); // puts the date into a structured form
  var dtform1 = dt6.valueOf(); // turns the date into milliseconds
   
    
   
  if((dtform1 - edt)<0 ){if(g < startpoint){var startpoint = g;}}
  if((sdt - dtform1)>0 ){if(g < endpoint){var endpoint = g;}}
    
  }
  
  if(startpoint == 1000000){var startpoint = 1;}
  if(endpoint == 1000000){var endpoint = count;}
  
  Logger.log(startpoint)
  Logger.log(endpoint)
 
  
  // *****next clause starts here
  
  for (var h = 0; h<count2; h++){ 
  var row2 = sub2[h]; // sub is the sub array from 1301 which includes the user, this reduces the sub array to be limited to the start and finish dates. 
 
  var rts2 = row2.toString();  // now each input is a searchable string
  var pos2 = rts2.indexOf("label494"); // will search for the first date in the string
  var time2 = rts2.substring(pos2+9,pos2+48); // scrapes out the date
  //Logger.log(time2)
  var dt7 = new Date(time2); // puts the date into a structured form
  var dtform2 = dt7.valueOf(); // turns the date into milliseconds
  //Logger.log(dtform2)
    
   
  if((dtform2 - edt)<0 ){if(h < startpoint2){var startpoint2 = h;}}
  if((sdt - dtform2)>0 ){if(h < endpoint2){var endpoint2 = h;}}
  }
  
  if(startpoint2 == 1000000){var startpoint2 = 1;}
  if(endpoint2 == 1000000){var endpoint2 = count2;}
  
  Logger.log(startpoint2)
  Logger.log(endpoint2)
  var sub3 = new Array();
  
  for (var l = startpoint2; l<endpoint2; l++){
    var row2 = sub2[l];
    sub3.push(row2);
  }
  
  var howmuchio = sub3.length
  
  ss3.getRange(1,1,howmuchio,1).setValues(sub3)
  
  //***end of clause
  
  
 //dataproc(sub,startpoint,endpoint,l2,edt,sdt,use,uline,data,d,data4,l5) // sub is the subset of events relating to the user, startpoint & endpoint define a further date related subset
//dataproc1(sub,startpoint,endpoint,l2,edt,sdt,use,uline,data,d,data4,l5)
 //dataproc22(sub,startpoint,endpoint,l2,edt,sdt,use,uline,data,d,data4,l5)
 //dataproc33(sub,startpoint,endpoint,l2,edt,sdt,use,uline,data,d,data4,l5)
  
}




