package com.osahub.gcdc.pdf;

import java.io.ByteArrayOutputStream;
import java.io.IOException;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.ws.RespectBinding;

import org.joda.time.LocalDate;

import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;

import com.itextpdf.text.Chunk;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Font;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;


public class SchedulerPdfCreator extends HttpServlet {
	
	
	private	ByteArrayOutputStream bAOS = new ByteArrayOutputStream();
	LocalDate dob = new LocalDate();
	final DateTimeFormatter dtf = DateTimeFormat.forPattern("mm-dd-yyyy");
	
	@Override
	public void doGet(HttpServletRequest req, HttpServletResponse res) throws IOException{

		
		String cName = req.getParameter("cName");
//		System.out.println(req.getParameter("dob"));
		dob = dtf.parseLocalDate(req.getParameter("dob"));
		
		String[] dates = getDates(dob);
		
		res.setContentType("application/pdf");
		 res.addHeader("Content-Disposition", "attachment; filename=\"" +req.getParameter("cName")+".pdf\"");		

//		 System.out.println(req.getParameter("cName"));
		 
		 ByteArrayOutputStream baos = new ByteArrayOutputStream();

		Document document = new Document(PageSize.A4,0.75f, 0.75F, 0.75F, 0.75F);
		try {
			PdfWriter.getInstance(document, baos);
		} catch (DocumentException e) {
			// TODO Auto-generated catch block
			System.out.println("Erroor in PdfWriter");
			e.printStackTrace();
		}
		
		  document.open();

          try {
        	
        	  
        	  Font boldFont = new Font(Font.FontFamily.TIMES_ROMAN, 18, Font.BOLD);
        	  Font headFont = new Font(Font.FontFamily.TIMES_ROMAN, 25, Font.BOLD);
          
          Paragraph head  = new Paragraph("Vaccination Schedule for "+req.getParameter("cName"), headFont);
          head.setAlignment(Chunk.ALIGN_CENTER);
          head.setSpacingBefore(10f);
          head.setSpacingAfter(10f);
          document.add(head);
		
          PdfPTable table = new PdfPTable(4); // 3 columns.
          
          table.setSpacingBefore(10f);
          float colWidths[] = {20f,20f,30f,40f};
          table.setWidths(colWidths);
          
          
          
          
          
          PdfPCell head1 =  new PdfPCell(new Paragraph("Age", boldFont));
          PdfPCell head2 =  new PdfPCell(new Paragraph("Due Date", boldFont));
          PdfPCell head3 =  new PdfPCell(new Paragraph("Vaccinations", boldFont));
          PdfPCell head4 =  new PdfPCell(new Paragraph("Remarks/Comments", boldFont));
          
          String[] age = new  String[]{
        	  "Birth", "6 Weeks", "10 Weeks", "14 Weeks", "6 months", "9 Months", "12 Months", "15 Months", "16-18 Months",
        	  "18 Months", "2 Years", "4.5-5 Years", "10-12 Years"
          };
          
          String[][] vaccines = new String[][]{
        		  {"B.C.G", "Hep-B 1"}, {"DTP 1", "IPV 1", "Hep-B 2", "Hib 1", "Rotavirus 1", "PCV 1"},
        		  {"DTP 2", "IPV 2", "Hib 2", "Rotavirus 2", "PCV 2"},{"DTP 3", "IPV 3", "Hib 3", "Rotavirus 3", "PCV 3"},
        		  {"OPV 1", "Hep-B 3"},{"OPV 2", "Measles"}, {"Hep-A 1"}, {"MMR 1", "Varicella 1", "PCV Booster"},
        		  {"DTP B1", "IPV B1", "Hib B1"}, {"Hep-A 2"}, {"Typhoid 1"}, {"DTP B2", "OPV 3", "MMR2", "Varicella2", "Typhoid2"},
        		  {"Tdap/Td", "HPV"}
        		  
          };
          
          String[] comments = new String[]{
        		  "",
        		 "<b>Polio : </b>Use IPV. But may be replaced with OPV if former is unaffordable/unavailable \n"+
        		  "Rotavirus : 2 doses of RV-1 and 3 doses of RV-5",
        		  "","Rotavirus : Only 2 doses of RV1 are recommended at present.",
        		  "Hepatitis-B : The final (third or fourth) dose in the HepB vaccine series should be administered no earlier than age 24 weeks and at least 16 weeks after the first dose.",
        		  "", "Hepatitis A : For both killed and live hepatitis-A vaccines, 2 doses are recommended",
        		  "Varicella : The risk of breakthrough varicella is lower if given 15 months onwards.",
        		  "The first booster (4thth dose) may be administered as early as age 12 months, provided at least 6 months have elapsed since the third dose.",
        		  "Hepatitis A : For both killed and live hepatitis-A vaccines 2 doses are recommended",
        		  "Typhoid : Typhoid revaccination every 3 years, if Vi-polysaccharide vaccine is used.",
        		  "MMR : the 2nd dose can be given at anytime 4-8 weeks after the 1st dose.\n"+
        		  "Varicella : the 2nd dose can be given at anytime 3 months after the 1st dose.",
        		  "Tdap : is preferred to Td followed by Td every 10 years.\n"+
        		  "HPV : Only for females, 3 doses at 0, 1-2 (depending on brands) and 6 months."       		  
          };
          
          

          
          table.addCell(head1);
          table.addCell(head2);
          table.addCell(head3);
          table.addCell(head4) ;
          

          
          for(int i = 0 ;i <age.length ;i++){
        	  
        	  PdfPCell col1 = new PdfPCell(new Paragraph(age[i]+""));
        	  col1.setPaddingBottom(10f);
        	  PdfPCell col2 = new PdfPCell(new Paragraph(dates[i]+""));
        	  col2.setPaddingBottom(10f);        	  
        	  String vaccineRow = "";
        	  	for(int j = 0 ;j < vaccines[i].length ; j++)
        	  	{
        	  		int count = j+1;
        	  		vaccineRow += count + "." + vaccines[i][j] +"\n";
        	  	}
        	  PdfPCell col3 = new PdfPCell(new Paragraph(vaccineRow));
        	  col3.setPaddingBottom(10f);
        	  
        	  PdfPCell col4 = new PdfPCell(new Paragraph(comments[i]));
        	  col4.setPaddingBottom(10f);
        	  
        	  table.addCell(col1);
        	  table.addCell(col2);
        	  table.addCell(col3);
        	  table.addCell(col4);        	  
        	  
          }
          
                   
          
          //document.add(new Paragraph("Heelo World Here"));
			document.add(table);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			System.out.println("Error in creating table");
			e.printStackTrace();
		}
          
          document.close();
          
          res.setContentType("application/pdf");
          res.setContentLength(baos.size());
          
          ServletOutputStream os = res.getOutputStream();
          baos.writeTo(os);
          os.flush();
          os.close();
          
 
	}

	private String[] getDates(LocalDate dob) {
		
		String[] dates = new String[13];
		int days[] = new int[]{1,42,70,98,6,9,12,15,16,18,24,54,120};
		
		for(int j = 0 ; j <days.length ; j++){
			
			if(j<4){
				dates[j] = dob.plusDays(days[j]).toString();
				continue;
			}
			else
				dates[j] = dob.plusMonths(days[j]).toString();
			
			//System.out.println(dates[j]);
		}
	     
		
		
		
		return dates;
	}
	

}
