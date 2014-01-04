package com.osahub.gcdc.pdf;

import java.io.ByteArrayOutputStream;
import java.io.IOException;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.ws.RespectBinding;

import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import com.itextpdf.text.pdf.codec.Base64;
import com.itextpdf.text.pdf.codec.Base64.OutputStream;
import com.sun.beans.editors.ByteEditor;

public class SchedulerPdfCreator extends HttpServlet {
	
	
	private	ByteArrayOutputStream bAOS = new ByteArrayOutputStream();
	
	@Override
	public void doGet(HttpServletRequest req, HttpServletResponse res) throws IOException{

		res.setContentType("application/pdf");
		 res.addHeader("Content-Disposition", "attachment; filename=\"test1.pdf\"");		

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
		
          PdfPTable table = new PdfPTable(4); // 3 columns.
          
          table.setSpacingBefore(10f);
          float colWidths[] = {20f,20f,30f,40f};
          table.setWidths(colWidths);
          
          PdfPCell head1 =  new PdfPCell(new Paragraph("Age"));
          PdfPCell head2 =  new PdfPCell(new Paragraph("Due Date"));
          PdfPCell head3 =  new PdfPCell(new Paragraph("Vaccinations"));
          PdfPCell head4 =  new PdfPCell(new Paragraph("Remarks/Comments"));
          
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
        		 
          };
          
          
          
          table.addCell(head1);
          table.addCell(head2);
          table.addCell(head3);
          table.addCell(head4) ;         
          
          document.add(new Paragraph("Heelo World Here"));
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
	

}
