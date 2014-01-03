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

		
          PdfPTable table = new PdfPTable(3); // 3 columns.

          PdfPCell cell1 = new PdfPCell(new Paragraph("Cell 1"));
          PdfPCell cell2 = new PdfPCell(new Paragraph("Cell 2"));
          PdfPCell cell3 = new PdfPCell(new Paragraph("Cell 3"));

          table.addCell(cell1);
          table.addCell(cell2);
          table.addCell(cell3);

          try {
        	  document.add(new Paragraph("Heelo World Here"));
			document.add(table);
		} catch (DocumentException e) {
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
