package com.osahub.gcdc.comm;


import java.util.*; 
import com.twilio.sdk.*; 
import com.twilio.sdk.resource.factory.*; 
import com.twilio.sdk.resource.instance.*; 
import com.twilio.sdk.resource.list.*;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.http.NameValuePair;
import org.apache.http.message.BasicNameValuePair;

public class Example  extends HttpServlet{

	// Find your Account Sid and Token at twilio.com/user/account
	public static final String ACCOUNT_SID = "AC188a984ca1696f1c5cc1dbbbd3a6dd2a";
	public static final String AUTH_TOKEN = "7874ed92d904df95a79f30917679acff";

	public void doPost(HttpServletRequest req, HttpServletResponse res)
	{
		TwilioRestClient client = new TwilioRestClient(ACCOUNT_SID, AUTH_TOKEN);
		 // Build the parameters
		
		String To = req.getParameter("recipient");
		String Msg = req.getParameter("msg");
		 List<NameValuePair> params = new ArrayList<NameValuePair>();  
		 params.add(new BasicNameValuePair("From", "+13025046342"));    
		 params.add(new BasicNameValuePair("To", "+91"+To)); 
		 params.add(new BasicNameValuePair("Body", Msg));   
	 
		 MessageFactory messageFactory = client.getAccount().getMessageFactory(); 
		 Message message;
		try {
			message = messageFactory.create(params);
			 System.out.println(message.getSid()); 

		} catch (TwilioRestException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 
	}
}


